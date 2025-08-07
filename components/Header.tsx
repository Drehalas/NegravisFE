'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Get Started', href: '/getting-started' },
    { name: 'Use Cases', href: '/use-cases' },
    {
      name: 'Platform',
      dropdown: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Oracle Assistant', href: '/oracles' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Explorer', href: '/explorer' },
        { name: 'Consensus', href: '/consensus' }
      ]
    },
    {
      name: 'Resources',
      dropdown: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api-docs' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Best Practices', href: '/best-practices' }
      ]
    },
    {
      name: 'Solutions',
      dropdown: [
        { name: 'DeFi & Trading', href: '/solutions/defi' },
        { name: 'Smart Contracts', href: '/solutions/smart-contracts' },
        { name: 'Enterprise', href: '/solutions/enterprise' },
        { name: 'IoT & Sensors', href: '/solutions/iot' },
        { name: 'Real-time Analytics', href: '/solutions/analytics' }
      ]
    }
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-300"></div>
              <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-300 opacity-50 blur-sm"></div>
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Negravis
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (hoverTimeout) clearTimeout(hoverTimeout);
                      const timeout = setTimeout(() => setActiveDropdown(item.name), 200);
                      setHoverTimeout(timeout);
                    }}
                    onMouseLeave={() => {
                      if (hoverTimeout) clearTimeout(hoverTimeout);
                      const timeout = setTimeout(() => setActiveDropdown(null), 200);
                      setHoverTimeout(timeout);
                    }}
                  >
                    <button className="flex items-center space-x-1 text-white hover:text-purple-300 transition-colors duration-200 font-medium">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-lg border border-purple-500/20 rounded-lg shadow-xl py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white hover:text-purple-300 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-white hover:text-purple-300 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/getting-started"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-purple-300 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-500/20">
            <div className="space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full text-white hover:text-purple-300 transition-colors font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-300 hover:text-white transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-white hover:text-purple-300 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-purple-500/20 space-y-3">
                <Link
                  href="/login"
                  className="block text-white hover:text-purple-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/getting-started"
                  className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}