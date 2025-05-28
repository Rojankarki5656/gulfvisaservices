"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Menu, Phone, Mail, CheckCircle, Send } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface Job {
  id: string
  title: string
  country: string
}

interface FormData {
  name: string
  email: string
  phone: string
  interested_jobs: string[]
  message: string
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    interested_jobs: [],
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Available Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("jobs_job")
          .select("id, title, country")

        if (error) {
          throw new Error(error.message)
        }
        setJobs(data || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching jobs:", err instanceof Error ? err.message : err)
        setError("Failed to load jobs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleJobSelection = (jobId: string) => {
    setFormData((prev) => ({
      ...prev,
      interested_jobs: prev.interested_jobs.includes(jobId)
        ? prev.interested_jobs.filter((id) => id !== jobId)
        : [...prev.interested_jobs, jobId],
    }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear error for this field on change
    setFormErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const validateForm = () => {
    const errors: Partial<FormData> = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    if (formData.interested_jobs.length === 0) {
      errors.interested_jobs = ["Please select at least one job"]
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from("jobs_applications").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interested_jobs: formData.interested_jobs,
        message: formData.message,
        inquiry_type: "job_inquiry",
      })

      if (error) {
        throw new Error(error.message)
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        interested_jobs: [],
        message: "",
      })
      setFormErrors({})
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormErrors({
        ...formErrors,
        message: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewApplication = () => {
    setIsSubmitted(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      interested_jobs: [],
      message: "",
    })
    setFormErrors({})
  }

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Bar */}
      <div className="bg-pageBlue-600 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+977 9764367481</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@gulfvisaservices.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logoWeb.jpg"
              alt="Icon"
              className="w-10 h-10 bg-pageBlue-600 rounded-lg overflow-hidden"
            />
            <div>
              <div className="text-xl font-bold text-gray-900">Gulf Visa Services</div>
              <div className="text-sm text-gray-500">Your Trusted Visa Partner</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pageBlue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              className="hidden sm:inline-flex bg-pageBlue-600 hover:bg-pageBlue-700 transform hover:scale-105 transition-all duration-300"
              onClick={() => setIsFormOpen(true)}
            >
              Apply Now
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-pageBlue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    className="mt-4 bg-pageBlue-600 hover:bg-pageBlue-700 transform hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      setIsOpen(false)
                      setIsFormOpen(true)
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

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
                        Fill out the form below to apply for available jobs.
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
                      <div className="space-y-2">
                        <Label className="text-gray-900 dark:text-gray-200">
                          Interested Jobs
                        </Label>
                        {error ? (
                          <div className="text-red-600 dark:text-red-400">{error}</div>
                        ) : loading ? (
                          <div className="text-gray-600 dark:text-gray-300">
                            Loading jobs...
                          </div>
                        ) : jobs.length === 0 ? (
                          <div className="text-gray-600 dark:text-gray-300">
                            No jobs available
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-3 border-gray-300 dark:border-gray-600">
                            {jobs.map((job) => (
                              <label
                                key={job.id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={formData.interested_jobs.includes(job.id)}
                                  onChange={() => handleJobSelection(job.id)}
                                  className="rounded text-blue-600 dark:text-blue-400"
                                />
                                <span className="text-sm text-gray-900 dark:text-gray-200">{`${job.title} - ${job.country}`}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        {formErrors.interested_jobs && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                            {formErrors.interested_jobs[0]}
                          </p>
                        )}
                        {formData.interested_jobs.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {formData.interested_jobs.map((jobId) => {
                              const job = jobs.find((j) => j.id === jobId)
                              return (
                                <Badge
                                  key={jobId}
                                  variant="secondary"
                                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                                >
                                  {job ? `${job.title} - ${job.country}` : jobId}
                                </Badge>
                              )
                            })}
                          </div>
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
    </header>
  )
}