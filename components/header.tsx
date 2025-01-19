"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";
import { SignupDialog } from "@/components/signup-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";

export function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { toggle } = useSidebar();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserId(storedUser);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserId(null);
    logout();
  };

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full border-b bg-white/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              {userId && (
                <Button variant="ghost" onClick={toggle} className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              )}
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  rivsy.ai
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setShowAuth(true)}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    onClick={() => setShowSignup(true)}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4 pb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {isLoggedIn ? (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setShowAuth(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        setShowSignup(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthDialog isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <SignupDialog isOpen={showSignup} onClose={() => setShowSignup(false)} />
    </>
  );
}

export default Header;