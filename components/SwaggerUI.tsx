/**
 * Swagger UI Component for Negravis API Documentation
 * Interactive API testing and documentation
 */

'use client';

import React, { useEffect, useRef } from 'react';

interface SwaggerUIProps {
  url?: string;
  className?: string;
}

export default function SwaggerUI({ 
  url = '/swagger/negravis-api.yaml',
  className = ''
}: SwaggerUIProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import Swagger UI to avoid SSR issues
    const loadSwaggerUI = async () => {
      try {
        // Load Swagger UI Bundle from CDN
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js';
        script.async = true;
        
        script.onload = () => {
          // Initialize Swagger UI after script loads
          if (window.SwaggerUIBundle && containerRef.current) {
            window.SwaggerUIBundle({
              url: url,
              dom_id: `#${containerRef.current.id}`,
              deepLinking: true,
              presets: [
                window.SwaggerUIBundle.presets.apis,
                window.SwaggerUIBundle.presets.standalone
              ],
              plugins: [
                window.SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout",
              theme: 'dark',
              syntaxHighlight: {
                theme: 'tomorrow-night'
              },
              defaultModelsExpandDepth: 2,
              defaultModelRendering: 'model',
              displayRequestDuration: true,
              tryItOutEnabled: true,
              requestInterceptor: (request: any) => {
                // Add custom headers or modify requests
                request.headers['X-Negravis-Client'] = 'Web-App';
                return request;
              },
              responseInterceptor: (response: any) => {
                // Handle responses, add analytics, etc.
                console.log('API Response:', response);
                return response;
              },
              onComplete: () => {
                console.log('Swagger UI loaded successfully');
              },
              onFailure: (error: any) => {
                console.error('Swagger UI failed to load:', error);
              }
            });
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load Swagger UI');
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="flex items-center justify-center h-64 bg-gray-900 rounded-lg border border-red-500/20">
                <div class="text-center">
                  <div class="text-red-400 text-xl mb-2">⚠️ Failed to Load API Documentation</div>
                  <div class="text-gray-400 text-sm">
                    Please check your internet connection and reload the page.
                  </div>
                </div>
              </div>
            `;
          }
        };
        
        document.head.appendChild(script);
        
        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css';
        document.head.appendChild(link);
        
        // Custom CSS for dark theme
        const style = document.createElement('style');
        style.textContent = `
          .swagger-ui {
            filter: invert(1) hue-rotate(180deg);
          }
          .swagger-ui .scheme-container {
            filter: invert(1) hue-rotate(180deg);
          }
          .swagger-ui .topbar {
            filter: invert(1) hue-rotate(180deg);
            background: #1a1a1a;
          }
          .swagger-ui .info {
            filter: invert(1) hue-rotate(180deg);
          }
          .swagger-ui .btn.execute {
            filter: invert(1) hue-rotate(180deg);
            background: #7c3aed;
          }
          .swagger-ui .response-control-media-type__accept-message {
            filter: invert(1) hue-rotate(180deg);
          }
        `;
        document.head.appendChild(style);
        
        return () => {
          document.head.removeChild(script);
          document.head.removeChild(link);
          document.head.removeChild(style);
        };
      } catch (error) {
        console.error('Error loading Swagger UI:', error);
      }
    };

    loadSwaggerUI();
  }, [url]);

  return (
    <div className={`swagger-container ${className}`}>
      {/* Loading State */}
      <div 
        id="swagger-loading" 
        className="flex items-center justify-center h-64 bg-gray-900/50 rounded-lg border border-purple-500/20 mb-4"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-purple-300 text-sm">Loading Interactive API Documentation...</div>
        </div>
      </div>
      
      {/* Swagger UI Container */}
      <div 
        ref={containerRef}
        id="swagger-ui-container"
        className="swagger-ui-container bg-black rounded-lg border border-purple-500/20 p-4"
        style={{ minHeight: '600px' }}
      />
      
      {/* Quick Actions */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20">
          <h3 className="text-white font-semibold mb-2">🚀 Quick Start</h3>
          <p className="text-gray-300 text-sm mb-3">
            Test the API endpoints directly in your browser. No authentication required for demo.
          </p>
          <button 
            onClick={() => {
              const executeButton = document.querySelector('.btn.execute') as HTMLElement;
              if (executeButton) {
                executeButton.scrollIntoView({ behavior: 'smooth' });
                executeButton.focus();
              }
            }}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Try API Calls →
          </button>
        </div>
        
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20">
          <h3 className="text-white font-semibold mb-2">📱 Frontend Integration</h3>
          <p className="text-gray-300 text-sm mb-3">
            Use our TypeScript hooks and services for seamless frontend integration.
          </p>
          <a 
            href="/docs#integration" 
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            View Integration Guide →
          </a>
        </div>
        
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20">
          <h3 className="text-white font-semibold mb-2">🔗 0G Network</h3>
          <p className="text-gray-300 text-sm mb-3">
            Powered by 0G Compute Network for decentralized AI with micropayments.
          </p>
          <a 
            href="https://github.com/oguzhaangumuss/Negravis" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Backend Repository →
          </a>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for Swagger UI
declare global {
  interface Window {
    SwaggerUIBundle: any;
  }
}