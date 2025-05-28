"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plane,
  Briefcase,
  Users,
  GraduationCap,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function VisaTypesPage() {
  const visaTypes = [
    {
      id: "tourist",
      name: "Tourist Visa",
      icon: <Plane className="h-8 w-8 text-blue-600" />,
      description: "Perfect for leisure travel, sightseeing, and visiting friends and family",
      duration: "30-90 days",
      processing: "24-48 hours",
      price: "From $99",
      features: [
        "Single or multiple entry options",
        "Valid for tourism and leisure",
        "Visit friends and family",
        "Attend cultural events",
        "Shopping and sightseeing",
      ],
      requirements: [
        "Valid passport (6+ months)",
        "Passport-sized photographs",
        "Hotel booking confirmation",
        "Return flight tickets",
        "Bank statements (3 months)",
        "Travel insurance",
      ],
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
    },
    {
      id: "business",
      name: "Business Visa",
      icon: <Briefcase className="h-8 w-8 text-green-600" />,
      description: "For business meetings, conferences, and commercial activities",
      duration: "30-90 days",
      processing: "48-72 hours",
      price: "From $149",
      features: [
        "Attend business meetings",
        "Participate in conferences",
        "Explore business opportunities",
        "Meet with clients and partners",
        "Sign business contracts",
      ],
      requirements: [
        "Valid passport (6+ months)",
        "Business invitation letter",
        "Company registration documents",
        "Bank statements (6 months)",
        "Travel insurance",
        "Hotel booking confirmation",
      ],
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
    },
    {
      id: "work",
      name: "Work Visa",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      description: "For employment and long-term work assignments in Gulf countries",
      duration: "1-3 years",
      processing: "5-10 days",
      price: "From $299",
      features: [
        "Long-term employment",
        "Renewable visa options",
        "Family sponsorship available",
        "Multiple entry permissions",
        "Work permit included",
      ],
      requirements: [
        "Valid passport (6+ months)",
        "Employment contract",
        "Educational certificates",
        "Medical fitness certificate",
        "Police clearance certificate",
        "Sponsor company documents",
      ],
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
    },
    {
      id: "family",
      name: "Family Visa",
      icon: <Users className="h-8 w-8 text-red-600" />,
      description: "For family reunification and dependent family members",
      duration: "1-2 years",
      processing: "7-14 days",
      price: "From $199",
      features: [
        "Spouse and children visa",
        "Family reunification",
        "Long-term stay options",
        "Renewable visa",
        "Access to local services",
      ],
      requirements: [
        "Valid passport (6+ months)",
        "Marriage certificate",
        "Birth certificates (children)",
        "Sponsor's employment visa",
        "Medical certificates",
        "Salary certificate",
      ],
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
    },
    {
      id: "student",
      name: "Student Visa",
      icon: <GraduationCap className="h-8 w-8 text-orange-600" />,
      description: "For students pursuing education in Gulf universities and institutions",
      duration: "1-4 years",
      processing: "7-14 days",
      price: "From $249",
      features: [
        "Study at universities",
        "Part-time work allowed",
        "Renewable annually",
        "Access to student services",
        "Multiple entry options",
      ],
      requirements: [
        "Valid passport (6+ months)",
        "University acceptance letter",
        "Educational transcripts",
        "Medical fitness certificate",
        "Financial proof",
        "Sponsor guarantee letter",
      ],
      countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain"],
    },
    {
      id: "transit",
      name: "Transit Visa",
      icon: <Clock className="h-8 w-8 text-gray-600" />,
      description: "For short layovers and transit through Gulf airports",
      duration: "48-96 hours",
      processing: "12-24 hours",
      price: "From $49",
      features: [
        "Airport transit",
        "Short city visits",
        "Quick processing",
        "Single entry only",
        "No extension allowed",
      ],
      requirements: [
        "Valid passport (6+ months)",
        "Onward flight tickets",
        "Visa for final destination",
        "Transit hotel booking",
        "Travel insurance",
      ],
      countries: ["UAE", "Qatar", "Kuwait", "Bahrain"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Visa Types for Gulf Countries</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Choose the right visa type for your travel needs. We process all types of visas for UAE, Saudi Arabia,
            Qatar, Kuwait, Bahrain, and Oman.
          </p>
        </div>
      </section>

      {/* Visa Types Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Visa Type</h2>
            <p className="text-xl text-gray-600">Select the visa category that matches your travel purpose</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visaTypes.map((visa, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 group-hover:scale-110 transition-transform">{visa.icon}</div>
                  <CardTitle className="text-2xl">{visa.name}</CardTitle>
                  <CardDescription className="text-gray-600">{visa.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{visa.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>{visa.processing}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{visa.price}</div>
                    <Button className="w-full group-hover:bg-blue-700">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Detailed Visa Information</h2>
            <p className="text-xl text-gray-600">Everything you need to know about each visa type</p>
          </div>

          <Tabs defaultValue="tourist" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {visaTypes.map((visa) => (
                <TabsTrigger key={visa.id} value={visa.id} className="text-xs lg:text-sm">
                  {visa.name.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {visaTypes.map((visa) => (
              <TabsContent key={visa.id} value={visa.id} className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {visa.icon}
                        {visa.name} Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {visa.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Required Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {visa.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-purple-600" />
                      Available Countries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {visa.countries.map((country, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Apply for {visa.name}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Processing Times */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Processing Times & Fees</h2>
            <p className="text-xl text-gray-600">Transparent pricing and fast processing for all visa types</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Visa Type</th>
                  <th className="px-6 py-4 text-left">Processing Time</th>
                  <th className="px-6 py-4 text-left">Validity</th>
                  <th className="px-6 py-4 text-left">Starting Price</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {visaTypes.map((visa, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {visa.icon}
                        <span className="font-medium">{visa.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{visa.processing}</td>
                    <td className="px-6 py-4 text-gray-600">{visa.duration}</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-blue-600">{visa.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm">Apply Now</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Apply for Your Visa?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Choose your visa type and start your application today. Our experts are here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Start Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Get Expert Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
