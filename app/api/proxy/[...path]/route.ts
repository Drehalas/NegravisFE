/**
 * API Proxy for 0G Compute Network Backend
 * Enables CORS and request forwarding for Swagger UI testing
 */

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.ZEROG_BACKEND_URL || 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    const path = pathSegments.join('/');
    const targetUrl = `${BACKEND_URL}/api/${path}`;
    
    // Get search params
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

    // Prepare headers
    const headers = new Headers();
    
    // Copy relevant headers from original request
    const relevantHeaders = [
      'content-type',
      'authorization',
      'x-api-key',
      'accept',
      'user-agent'
    ];
    
    relevantHeaders.forEach(headerName => {
      const headerValue = request.headers.get(headerName);
      if (headerValue) {
        headers.set(headerName, headerValue);
      }
    });

    // Add custom headers
    headers.set('X-Negravis-Proxy', 'true');
    headers.set('X-Forwarded-For', request.headers.get('x-forwarded-for') || 'unknown');

    // Prepare request body for POST/PUT requests
    let body: string | undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        body = await request.text();
      } catch (error) {
        console.warn('Failed to read request body:', error);
      }
    }

    // Make request to backend
    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
      // Add timeout
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    // Get response data
    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    // Create response with CORS headers
    const nextResponse = new NextResponse(
      typeof responseData === 'string' 
        ? responseData 
        : JSON.stringify(responseData),
      {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': response.headers.get('content-type') || 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
          'X-Negravis-Proxy': 'true',
          'X-Response-Time': new Date().toISOString()
        }
      }
    );

    return nextResponse;

  } catch (error) {
    console.error('Proxy error:', error);
    
    // Handle different error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          error: 'backend_unreachable',
          message: 'Unable to connect to 0G Compute Network backend. Please ensure the backend is running.',
          details: {
            backendUrl: BACKEND_URL,
            timestamp: new Date().toISOString()
          }
        },
        { 
          status: 503,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key'
          }
        }
      );
    }

    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return NextResponse.json(
        {
          error: 'request_timeout',
          message: 'Request to backend timed out. Please try again.',
          details: {
            timeout: '30s',
            timestamp: new Date().toISOString()
          }
        },
        { 
          status: 504,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key'
          }
        }
      );
    }

    return NextResponse.json(
      {
        error: 'proxy_error',
        message: 'An unexpected error occurred while proxying the request.',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key'
        }
      }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Negravis-Client',
      'Access-Control-Max-Age': '86400' // 24 hours
    }
  });
}