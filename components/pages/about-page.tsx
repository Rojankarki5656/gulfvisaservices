"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Shield, Target, Heart } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-pageBlue-600" />,
      title: "Trust & Security",
      description:
        "Your documents and personal information are handled with the highest level of security and confidentiality.",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Speed & Efficiency",
      description:
        "We understand the urgency of travel plans and process visas as quickly as possible without compromising quality.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Customer First",
      description:
        "Every decision we make is centered around providing the best possible experience for our customers.",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Excellence",
      description: "We strive for perfection in every visa application we process, maintaining our 99.8% success rate.",
    },
  ]

  const team = [
    {
      name: "Ahmed Al-Mansouri",
      role: "CEO & Founder",
      experience: "15+ years in visa services",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      experience: "12+ years in immigration",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Mohammed Hassan",
      role: "Senior Visa Consultant",
      experience: "10+ years in Gulf visas",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Fatima Al-Zahra",
      role: "Customer Relations Manager",
      experience: "8+ years in customer service",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const milestones = [
    { year: "2015", event: "Company Founded", description: "Started with a vision to simplify visa processing" },
    { year: "2017", event: "10,000 Visas Processed", description: "Reached our first major milestone" },
    { year: "2019", event: "Digital Platform Launch", description: "Launched our online application system" },
    { year: "2021", event: "25,000 Happy Customers", description: "Expanded our services across all Gulf countries" },
    { year: "2023", event: "50,000 Visas Milestone", description: "Achieved 99.8% success rate" },
    { year: "2024", event: "AI-Powered Processing", description: "Introduced AI to speed up application review" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with pageBlue colors and animations */}
      <section className="py-20 px-4 bg-gradient-to-r from-pageBlue-600 to-pageBlue-800 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 animate-bounce">Established 2015</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">About Gulf Visa Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-pageBlue-100 max-w-4xl mx-auto animate-fade-in-up delay-300">
              Your trusted partner for visa processing in the Gulf region. We've been helping travelers achieve their
              dreams since 2015.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with animations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Visas Processed", delay: "0ms" },
              { number: "99.8%", label: "Success Rate", delay: "100ms" },
              { number: "6", label: "Gulf Countries", delay: "200ms" },
              { number: "9", label: "Years Experience", delay: "300ms" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2 animate-fade-in-up" style={{ animationDelay: stat.delay }}>
                <div className="text-4xl font-bold text-pageBlue-600 animate-counter">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with animations */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p className="animate-fade-in-up delay-200">
                  Gulf Visa Services was founded in 2015 with a simple mission: to make visa processing for Gulf
                  countries as smooth and stress-free as possible. What started as a small team of visa experts has
                  grown into the region's most trusted visa processing service.
                </p>
                <p className="animate-fade-in-up delay-400">
                  Our founder, Ahmed Al-Mansouri, experienced firsthand the complexities and frustrations of visa
                  applications while working in international business. He envisioned a service that would eliminate the
                  confusion, reduce processing times, and provide transparent, reliable support throughout the entire
                  process.
                </p>
                <p className="animate-fade-in-up delay-600">
                  Today, we've processed over 50,000 visas with a 99.8% success rate, helping individuals, families, and
                  businesses achieve their travel goals across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Licensed & Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Government Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Gulf Visa Services Office"
                width={600}
                height={500}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -left-6 bg-pageBlue-600 text-white p-6 rounded-lg animate-slide-in-up delay-500">
                <div className="text-2xl font-bold">9+ Years</div>
                <div className="text-pageBlue-100">of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with animations */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve our customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section with animations */}
      <section className="py-20 px-4 bg-pageBlue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our growth and development</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start animate-slide-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-pageBlue-600 text-white rounded-full flex items-center justify-center font-bold transform hover:scale-110 transition-transform duration-300">
                    {milestone.year}
                  </div>
                </div>
                <Card className="flex-1 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl">{milestone.event}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{milestone.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with animations */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your visa success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-pageBlue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with animations */}
      <section className="py-20 px-4 bg-gradient-to-r from-pageBlue-600 to-pageBlue-800 text-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Service?</h2>
          <p className="text-xl mb-8 text-pageBlue-100">
            Join thousands of satisfied customers who trust us with their visa needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Start Your Application
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-pageBlue-600 transform hover:scale-105 transition-all duration-300"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes counter {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }

        .animate-counter {
          animation: counter 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-600 {
          animation-delay: 600ms;
        }

        .delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  )
}
