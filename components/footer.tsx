"use client";

import Link from 'next/link';
import { Brain, Twitter, Github, Linkedin } from 'lucide-react';
import { useSidebar } from "@/contexts/SidebarContext";

export function Footer() {
  const { isOpen } = useSidebar();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { href: '#features', label: 'Features' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#showcase', label: 'Showcase' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/careers', label: 'Careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/contact', label: 'Contact' },
      ],
    },
  ];

  return (
    <footer className={`
      bg-gray-50 border-t
      transition-all duration-200 ease-in-out
      ${isOpen ? "md:ml-64" : "ml-0"}
    `}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">rivsy.ai</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              The most powerful AI blog generator. Create SEO-optimized content instantly.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link href="https://twitter.com" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} rivsy.ai. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;