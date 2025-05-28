"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Clock, Shield, Star, ArrowRight, Plane, Users } from 'lucide-react'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FaWhatsapp } from "react-icons/fa"; // Install react-icons if needed

export default function HomePage() {
  const countries = [
    { name: "UAE", flag: "🇦🇪", visaTypes: ["Tourist", "Business", "Work"] },
    { name: "Saudi Arabia", flag: "🇸🇦", visaTypes: ["Tourist", "Business", "Hajj/Umrah"] },
    { name: "Qatar", flag: "🇶🇦", visaTypes: ["Tourist", "Business", "Work"] },
    { name: "Kuwait", flag: "🇰🇼", visaTypes: ["Tourist", "Business", "Work"] },
    { name: "Bahrain", flag: "🇧🇭", visaTypes: ["Tourist", "Business", "Work"] },
    { name: "Oman", flag: "🇴🇲", visaTypes: ["Tourist", "Business", "Work"] },
  ]

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-homeBlue-600" />,
      title: "Fast Processing",
      description: "Get your visa processed in 24-48 hours with our express service",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "100% Secure",
      description: "Your documents and personal information are completely secure",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "All Gulf Countries",
      description: "We process visas for all 6 Gulf Cooperation Council countries",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Expert Support",
      description: "24/7 customer support from visa processing experts",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Visas Processed" },
    { number: "99.8%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "6", label: "Gulf Countries" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-homeBlue-50 to-white">
      <Header />

      {/* Hero Section - Using home blue color */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-homeBlue-500 to-homeBlue-700 text-white">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 animate-fade-in-up">
            Trusted by 50,000+ Travelers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">
            Your Journey to Global
            <span className="block text-yellow-300">Opportunities Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-homeBlue-100 max-w-3xl mx-auto animate-fade-in-up delay-300">
            We provide trusted visa services with a 98% success rate, connecting you to international job opportunities with complete confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-homeBlue-600 font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Our Services
            </Button>
          <Button
            size="lg"
            onClick={() => window.open("https://wa.me/9817341354", "_blank")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
          >
            <FaWhatsapp className="h-5 w-5" />
            <span>WhatsApp</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-homeBlue-600">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Visa Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make visa processing simple, fast, and stress-free with our expert team and proven processes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow animate-slide-in-up transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gulf Countries We Serve</h2>
            <p className="text-xl text-gray-600">Professional visa services for all GCC member countries</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer animate-slide-in-up transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{country.flag}</div>
                  <CardTitle className="text-2xl">{country.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">Available Visa Types:</p>
                    <div className="flex flex-wrap gap-2">
                      {country.visaTypes.map((type, typeIndex) => (
                        <Badge key={typeIndex} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 transform hover:scale-105 transition-all duration-300"
                    variant="outline"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-homeBlue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple 4-Step Process</h2>
            <p className="text-xl text-gray-600">Get your visa in just 4 easy steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Country", desc: "Select your destination country and visa type" },
              { step: "2", title: "Fill Application", desc: "Complete our simple online application form" },
              { step: "3", title: "Upload Documents", desc: "Upload required documents securely" },
              { step: "4", title: "Get Your Visa", desc: "Receive your processed visa via email" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-homeBlue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-lg font-semibold ml-2">4.9/5 Rating</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Al-Rashid",
                country: "UAE",
                text: "Excellent service! Got my UAE visa in just 2 days. Highly recommended for anyone planning to visit Dubai.",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                country: "Qatar",
                text: "Professional and efficient. The team guided me through every step of the Qatar visa process.",
                rating: 5,
              },
              {
                name: "Mohammed Hassan",
                country: "Saudi Arabia",
                text: "Fast and reliable service for Saudi visa. Great customer support and transparent pricing.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow animate-slide-in-up transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-homeBlue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-homeBlue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.country} Visa</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-homeBlue-600 to-homeBlue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-homeBlue-100">
            Join thousands of satisfied customers who trust us with their visa needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Apply Now
              <Plane className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-homeBlue-600 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .animate-slide-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
