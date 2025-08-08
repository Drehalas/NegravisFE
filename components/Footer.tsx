'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, ExternalLink, MessageCircle } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Oracle Assistant', href: '/oracles' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Explorer', href: '/explorer' },
        { name: 'Consensus', href: '/consensus' }
      ]
    },
    {
      title: 'Developers',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api-docs' },
        { name: 'SDKs & Libraries', href: '/sdks' },
        { name: 'Code Examples', href: '/examples' },
        { name: 'Status Page', href: '/status' }
      ]
    },

    {
      title: 'Resources',
      links: [
        { name: 'Use Cases', href: '/use-cases' },
        { name: 'Getting Started', href: '/getting-started' },
        { name: 'Best Practices', href: '/best-practices' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Blog', href: '/blog' }
      ]
    }

  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Drehalas/NegravisFE', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/negravis', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://discord.gg/negravis', label: 'Discord' },
    { icon: Mail, href: 'mailto:hello@negravis.com', label: 'Email' }
  ];

  return (
    <footer className="bg-black text-white border-t border-purple-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-300"></div>
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-300 opacity-50 blur-sm"></div>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                Negravis
              </span>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Next-generation Oracle platform built on Hedera Hashgraph. 
              Providing reliable, real-time data to blockchain applications worldwide.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400 mb-4 lg:mb-0">
                Get the latest updates on new features, partnerships, and blockchain innovations.
              </p>
            </div>
            
            <div className="lg:flex-shrink-0 lg:ml-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 flex-1"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 Negravis. All rights reserved. Built on Hedera Hashgraph.</p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/security" className="text-gray-400 hover:text-purple-300 transition-colors">
                Security
              </Link>
              <a
                href="https://hedera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                Powered by Hedera
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}