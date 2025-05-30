"use client"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Clock, Shield, Star, ArrowRight, Plane, Users } from 'lucide-react'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FaWhatsapp } from "react-icons/fa"; // Install react-icons if needed
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, DollarSign, Building, Search, Filter, Eye, Briefcase, GraduationCap, Calendar, CheckCircle, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"


interface Job {
  id: string
  title: string
  company: string
  country: string
  city: string
  salary: string
  currency: string
  positions: number
  category: string
  experience: string
  type: string
  requirements: { items: string[] }
  benefits: { items: string[] }
  deadline: string
  description: string
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  jobId: string
}
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    jobId: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('jobs_job')
          .select('*')

        if (error) {
          throw new Error(error.message)
        }
        const transformedData = data?.map(job => ({
          ...job,
          requirements: { items: job.requirements?.items || [] },
          benefits: { items: job.benefits?.items || [] }
        })) || [];
        setJobs(transformedData)
      } catch (err: any) {
        console.error("Error fetching jobs:", err.message)
        setError("Failed to load jobs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.city && job.city.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCountry = selectedCountry === "all" || job.country === selectedCountry
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory

    return matchesSearch && matchesCountry && matchesCategory
  })

  // Get unique countries and categories
  const countries = Array.from(new Set(jobs.map((job) => job.country)))
  const categories = Array.from(new Set(jobs.map((job) => job.category)))

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Email is invalid"
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) errors.phone = "Phone number is invalid"
    if (!formData.jobId) errors.message = "Please select a job to apply for"
    return errors
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('applications').insert({
        job_id: formData.jobId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        created_at: new Date().toISOString()
      })

      if (error) throw error
      setIsSubmitted(true)
      setFormErrors({})
      setFormData({ name: "", email: "", phone: "", message: "", jobId: "" })
    } catch (err: any) {
      console.error("Error submitting application:", err.message)
      setError("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle new application
  const handleNewApplication = () => {
    setIsSubmitted(false)
    setFormData({ name: "", email: "", phone: "", message: "", jobId: "" })
    setFormErrors({})
  }

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

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg animate-slide-in-up">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-pageBlue-600 hover:bg-pageBlue-700 transform hover:scale-105 transition-all duration-300">
                <Filter className="mr-2 h-4 w-4" />
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Available Job Opportunities
            </h2>
            <p className="text-xl text-gray-600 animate-slide-in-up delay-200">
              {filteredJobs.length} jobs found matching your criteria
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16 animate-fade-in-up">
              <p className="text-lg text-gray-600">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 animate-fade-in-up">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {filteredJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-pageBlue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-6 w-6 text-pageBlue-600" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-2xl text-pageBlue-600 hover:text-pageBlue-800 transition-colors">
                              {job.title}
                            </CardTitle>
                            <CardDescription className="text-lg text-gray-700 mt-1">
                              <Building className="inline h-4 w-4 mr-1" />
                              {job.company}
                            </CardDescription>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.city ? `${job.city}, ${job.country}` : job.country}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4" />
                                {job.experience}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary" className="text-sm">
                          {job.category}
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{job.salary} {job.currency || ''}</div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-600 mb-4">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-pageBlue-600" />
                          Job Details
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Positions Available:</span>
                            <span className="font-medium">{job.positions || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Experience Required:</span>
                            <span className="font-medium">{job.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Application Deadline:</span>
                            <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Benefits
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {job.benefits.items.slice(0, 3).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {job.benefits.items.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.benefits.items.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 bg-pageBlue-600 hover:bg-pageBlue-700 text-blue-700 transform hover:scale-105 transition-all duration-300">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 hover:bg-pageBlue-50 transform hover:scale-105 transition-all duration-300"
                        onClick={() => {
                          setSelectedJob(job)
                          setFormData(prev => ({ ...prev, jobId: job.id }))
                          setIsFormOpen(true)
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredJobs.length === 0 && !loading && !error && (
            <div className="text-center py-16 animate-slide-in-up">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-semibold text-gray-600 mb-4">No jobs found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-pageBlue-600">
                    Apply for Work
                  </DialogTitle>
                </DialogHeader>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Application Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for your application. Our team will review it and get back to you soon.
                    </p>
                    <Button
                      className="mt-4 bg-pageBlue-600 hover:bg-pageBlue-700 transform hover:scale-105 transition-all duration-300"
                      onClick={handleNewApplication}
                    >
                      Submit Another Application
                    </Button>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setIsFormOpen(false)}
                    >
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="text-center py-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Interested in a Job?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Fill out the form below to apply for {selectedJob?.title} at {selectedJob?.company}.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      {formErrors.message && (
                        <div className="text-red-600 dark:text-red-400 text-sm">
                          {formErrors.message}
                        </div>
                      )}
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {formErrors.name && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {formErrors.email && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                        {formErrors.phone && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your visa needs"
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-pageBlue-600 hover:bg-pageBlue-700 transform hover:scale-105 transition-all duration-300 text-white"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

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
