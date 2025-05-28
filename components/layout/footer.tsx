import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const countries = [
    "UAE Visa Services",
    "Saudi Arabia Visa",
    "Qatar Visa Services",
    "Kuwait Visa Services",
    "Bahrain Visa Services",
    "Oman Visa Services",
  ]

  const visaTypes = ["Tourist Visa", "Business Visa", "Work Visa", "Transit Visa", "Family Visa", "Student Visa"]

  const quickLinks = [
    "About Us",
    "Contact Us",
    "Track Application",
    "FAQ",
    "Blog",
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Visa News</h3>
          <p className="text-blue-100 mb-6">Get the latest updates on visa requirements and travel advisories</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900" />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">Gulf Visa Services</div>
                  <div className="text-sm text-gray-400">Your Trusted Partner</div>
                </div>
              </div>
              <p className="text-gray-400">
                Professional visa processing services for all Gulf countries. Fast, secure, and reliable visa assistance
                since 2015.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+971 4 123 4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>info@gulfvisaservices.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>

            {/* Countries */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Countries We Serve</h4>
              <ul className="space-y-2">
                {countries.map((country, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {country}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visa Types */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Visa Types</h4>
              <ul className="space-y-2">
                {visaTypes.map((type, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {type}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">© 2024 Gulf Visa Services. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
