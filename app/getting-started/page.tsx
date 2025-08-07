'use client';

import { useState } from 'react';
import { CheckCircle, Copy, Play, ArrowRight, Zap, Shield, Globe, Code } from 'lucide-react';

export default function GettingStartedPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up for free and get instant access to our Oracle platform",
      action: "Sign Up Now",
      time: "2 minutes"
    },
    {
      title: "Get Your API Key",
      description: "Generate your unique API credentials from the dashboard",
      action: "Generate Key",
      time: "30 seconds"
    },
    {
      title: "Make Your First Call",
      description: "Test the API with a simple price query",
      action: "Try Example",
      time: "1 minute"
    },
    {
      title: "Build Something Amazing",
      description: "Integrate real-time data into your application",
      action: "Start Building",
      time: "∞ possibilities"
    }
  ];

  const codeExamples = {
    curl: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.negravis.com/v1/price/BTC`,
    javascript: `const response = await fetch('https://api.negravis.com/v1/price/BTC', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
console.log('BTC Price:', data.price);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.negravis.com/v1/price/BTC', headers=headers)
data = response.json()
print(f"BTC Price: {data['price']}")`,
    go: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    req, _ := http.NewRequest("GET", "https://api.negravis.com/v1/price/BTC", nil)
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var data map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&data)
    fmt.Printf("BTC Price: %v", data["price"])
}`
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with 3D Elements */}
      <div className="relative bg-gradient-to-r from-black via-purple-900 to-black text-white overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg rotate-12 animate-bounce"></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg rotate-45 animate-bounce"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/30 px-4 py-2 rounded-full text-blue-200 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Get started in under 5 minutes
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Start Building with Oracle Data
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Access real-time, verified data from blockchain and IoT sources. 
            Build the next generation of data-driven applications with our simple APIs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Live Demo
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-500/20 p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.99%</div>
              <div className="text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">&lt;100ms</div>
              <div className="text-gray-400">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-400">Data Sources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Get Started in 4 Simple Steps</h2>
          <p className="text-lg text-gray-400">From signup to your first API call in minutes</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-lg border-2 p-6 transition-all cursor-pointer ${
                currentStep === index + 1 ? 'border-purple-500 scale-105' : 'border-purple-500/20 hover:border-purple-400'
              }`} onClick={() => setCurrentStep(index + 1)}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep > index + 1 ? 'bg-green-500 text-white' : 
                    currentStep === index + 1 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {currentStep > index + 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className="text-sm text-gray-400">{step.time}</span>
                </div>
                
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{step.description}</p>
                
                <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  currentStep === index + 1 ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  {step.action}
                </button>
              </div>
              
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300 h-6 w-6" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Try It Right Now</h2>
            <p className="text-lg text-gray-300">Copy and paste these examples to get started immediately</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {Object.entries(codeExamples).map(([lang, code]) => (
              <div key={lang} className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-blue-400" />
                    <span className="font-medium capitalize">{lang}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code, lang)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedCode === lang ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-4">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 px-4 py-2 rounded-lg text-blue-300">
              <Shield className="h-4 w-4" />
              All examples include authentication and error handling
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Negravis?</h2>
          <p className="text-lg text-gray-400">Built for developers who need reliable, fast, and secure data</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-300 leading-relaxed">
              Sub-100ms response times with global CDN distribution. 
              Your applications stay responsive with our optimized infrastructure.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Enterprise Security</h3>
            <p className="text-gray-300 leading-relaxed">
              End-to-end encryption, multi-signature validation, and blockchain verification. 
              Your data integrity is guaranteed.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Global Scale</h3>
            <p className="text-gray-300 leading-relaxed">
              Distributed across 50+ regions worldwide. 
              Get localized data with global reach and redundancy.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers building the future with reliable oracle data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Book a Demo
            </button>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">Free</div>
              <div className="text-blue-200">to get started</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">No</div>
              <div className="text-blue-200">setup fees</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-blue-200">developer support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}