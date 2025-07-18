"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, DollarSign, Users, Building, Search, Filter, Eye, Briefcase, GraduationCap, Calendar, CheckCircle, Send, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { supabase } from "@/lib/supabase"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import Link from "next/link"


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

export default function AvailableJobsPage() {
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
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 7
  const jobsSectionRef = useRef<HTMLDivElement>(null)

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('jobs_job')
          .select('*')
          .order('posteddate', { ascending: false });;

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

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  )

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

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>
          {searchTerm
            ? `${searchTerm} Jobs in Gulf Countries | Gulf Jobs for Nepali 2025`
            : "Gulf Jobs for Nepali 2025 | UAE, Qatar, Saudi Arabia, Oman, Kuwait, Bahrain - Latest Vacancies"}
        </title>
        <meta
          name="description"
          content={
            searchTerm
              ? `Find the latest ${searchTerm} jobs and other Gulf job vacancies for Nepali workers in 2025. Search and apply for verified job vacancies in UAE, Qatar, Saudi Arabia, Oman, Kuwait, and Bahrain.`
              : "Find the latest Gulf jobs for Nepali workers in 2025. Search and apply for verified job vacancies in UAE, Qatar, Saudi Arabia, Oman, Kuwait, and Bahrain. 100% trusted visa support and top companies hiring now!"
          }
        />
        <meta
          name="keywords"
          content={
            searchTerm
              ? `${searchTerm} jobs Gulf, ${searchTerm} jobs UAE, ${searchTerm} jobs Qatar, ${searchTerm} jobs Saudi Arabia, ${searchTerm} jobs Oman, ${searchTerm} jobs Kuwait, ${searchTerm} jobs Bahrain, Gulf jobs for Nepali, Nepali jobs in Gulf, Gulf job vacancies 2025, Nepali manpower`
              : "Gulf jobs for Nepali, Nepali jobs in UAE, Qatar jobs for Nepali, Saudi jobs for Nepali, Oman jobs for Nepali, Kuwait jobs for Nepali, Bahrain jobs for Nepali, Gulf job vacancies 2025, Nepali manpower, Gulf visa service, Nepali overseas jobs, Nepali abroad jobs, Nepali gulf jobs, Nepali job search, Nepali foreign employment"
          }
        />
        <meta name="author" content="Gulf Visa Service" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="AE;SA;QA;OM;KW;BH" />
        <meta name="geo.placename" content="Gulf Countries" />
        <meta property="og:title" content="Search Gulf Jobs 2025 | Latest Vacancies in UAE, Saudi Arabia, Qatar, Oman" />
        <meta property="og:description" content="Explore 1000+ verified Gulf job opportunities for Nepali and international workers. Search jobs in construction, hospitality, oil & gas, and more with visa sponsorship in UAE, Qatar, and other Gulf countries." />
        <meta property="og:image" content="https://gulfvisaservice.com/images/gulf-jobs-banner.jpg" />
        <meta property="og:image:secure_url" content="https://gulfvisaservice.com/images/gulf-jobs-banner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gulf job vacancies 2025 banner" />
        <meta property="og:url" content="https://gulfvisaservice.com/jobs" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Gulf Visa Service" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search Gulf Country Job Vacancies 2025 – UAE, Qatar, Saudi Arabia, Oman" />
        <meta name="twitter:description" content="Find and apply for real job openings in UAE, Qatar, Oman, Bahrain, Kuwait, and Saudi Arabia. Top companies, visa support, and competitive salaries." />
        <meta name="twitter:image" content="https://gulfvisaservice.com/images/gulf-jobs-twitter-card.jpg" />
        <meta name="twitter:site" content="@GulfVisaService" />
        <link rel="canonical" href="https://gulfvisaservice.com/jobs" />
        <link rel="sitemap" href="https://gulfvisaservice.com/sitemap.xml" type="application/xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="https://gulfvisaservice.com/logoWeb.jpg" as="image" />
        <link rel="dns-prefetch" href="https://gulfvisaservice.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Gulf Visa Service",
            "url": "https://gulfvisaservice.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://gulfvisaservice.com/jobs?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "Search for the latest job vacancies in Gulf countries including UAE, Saudi Arabia, Qatar, Oman, Kuwait, and Bahrain for 2025."
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Gulf Visa Service",
            "url": "https://gulfvisaservice.com",
            "logo": "https://gulfvisaservice.com/logoWeb.jpg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+977-9708001462",
              "contactType": "Customer Service",
              "areaServed": ["NP", "AE", "SA", "QA", "OM", "KW", "BH"],
              "availableLanguage": ["English", "Nepali", "Hindi", "Arabic"]
            },
            "sameAs": [
              "https://www.facebook.com/BestDemandVisaService",
              "https://www.twitter.com/GulfVisaService",
              "https://www.linkedin.com/company/gulfvisaservice"
            ]
          })}
        </script>
        {jobs.map(job => (
          <script key={job.id} type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": job.title,
              "description": job.description,
              "hiringOrganization": {
                "@type": "Organization",
                "name": job.company,
                "sameAs": "https://gulfvisaservice.com"
              },
              "industry": job.category,
              "employmentType": job.type,
              "validThrough": job.deadline,
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": job.city,
                  "addressCountry": job.country
                }
              },
              "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": job.currency,
                "value": {
                  "@type": "QuantitativeValue",
                  "value": parseFloat(job.salary.replace(/[^0-9.]/g, '')),
                  "unitText": "MONTH"
                }
              },
              "qualifications": job.requirements.items.join(", "),
              "experienceRequirements": job.experience,
              "applicantLocationRequirements": {
                "@type": "Country",
                "name": "Nepal"
              },
              "jobBenefits": job.benefits.items.join(", "),
              "incentiveCompensation": "Visa support, accommodation, travel allowance",
              "educationRequirements": "See job details",
              "skills": job.requirements.items.join(", "),
              "responsibilities": job.description,
              "workHours": "Full Time"
            })}
          </script>
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can Nepali workers apply for Gulf jobs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply search for your desired job, click 'Apply Now', and fill out the application form. Our team will guide you through the visa process."
                }
              },
              {
                "@type": "Question",
                "name": "Are these Gulf jobs verified and legal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all jobs listed are verified and come with proper visa support for Nepali workers."
                }
              },
              {
                "@type": "Question",
                "name": "Which Gulf countries are hiring Nepali workers in 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UAE, Qatar, Saudi Arabia, Oman, Kuwait, and Bahrain are actively hiring Nepali workers for various sectors."
                }
              }
            ]
          })}
        </script>
      </Head>

      <Header />

      {/* Hero Section with page blue color */}
      <section className="py-20 px-4 bg-gradient-to-r from-pageBlue-500 to-pageBlue-700 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 animate-bounce">
              🔥 Hot Jobs Available Now
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">
              Gulf Jobs for Nepali 2025 – UAE, Qatar, Saudi Arabia, Oman, Kuwait, Bahrain
            </h1>
            <h2 className="text-2xl font-semibold mt-10 mb-4">Latest Gulf Job Vacancies for Nepali Workers</h2>
            <p className="text-xl md:text-2xl mb-8 text-pageBlue-100 max-w-4xl mx-auto animate-fade-in-up delay-300">
              Discover exciting career opportunities with visa sponsorship, competitive salaries, and excellent benefits
            </p>
            <div className="animate-fade-in-up delay-500">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  jobsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Active Jobs", delay: "0ms" },
              { number: "50+", label: "Partner Companies", delay: "100ms" },
              { number: "6", label: "Gulf Countries", delay: "200ms" },
              { number: "95%", label: "Visa Success Rate", delay: "300ms" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2 animate-fade-in-up" style={{ animationDelay: stat.delay }}>
                <div className="text-3xl md:text-4xl font-bold text-pageBlue-600 animate-counter">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
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
      <section
        ref={jobsSectionRef}
        className="py-20 px-4 bg-white"
      >
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
            <>
              <div className="grid gap-8">
                {paginatedJobs.map((job, index) => (
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
                        <Button
                          asChild
                          className="flex-1 bg-pageBlue-600 hover:bg-pageBlue-700 text-white-500 transform hover:scale-105 transition-all duration-300"
                        >
                          <Link href={`/jobs/${job.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="icon"
                      className={currentPage === i + 1 ? "bg-pageBlue-600 text-white" : ""}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </>
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pageBlue-600 to-pageBlue-800 text-white">
        <div className="max-w-4xl mx-auto text-center animate-slide-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 text-pageBlue-100">
            Join thousands of professionals who found their dream jobs through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Upload Your CV
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-pageBlue-600 transform hover:scale-105 transition-all duration-300"
            >
              Get Job Alerts
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

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  )
}