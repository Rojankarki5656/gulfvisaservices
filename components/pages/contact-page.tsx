"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Globe, Building } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { supabase } from "@/lib/supabase"

interface Job {
  id: string;
  title: string;
  country: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    interested_jobs: [] as string[],
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs_job')
          .select('id, title, country');
        
        if (error) {
          throw new Error(error.message);
        }
        setJobs(data || []);
      } catch (err) {
        console.error('Error fetching jobs:', err instanceof Error ? err.message : err);
        setError('Failed to load jobs. Please try again later.');
      }
    };
    fetchJobs();
  }, []);

  // Submit form to Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('jobs_applications')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          interested_jobs: formData.interested_jobs,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: 'job_inquiry',
        });

      if (error) {
        throw new Error(error.message);
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        interested_jobs: [],
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJobSelection = (jobId: string) => {
    setFormData((prev) => ({
      ...prev,
      interested_jobs: prev.interested_jobs.includes(jobId)
        ? prev.interested_jobs.filter((j) => j !== jobId)
        : [...prev.interested_jobs, jobId],
    }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: 'Phone',
      details: ['+977 9764367481', '+966 11 234 5678'],
      description: 'Call us anytime for immediate assistance',
    },
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: 'Email',
      details: ['info@gulfvisaservices.com', 'jobs@gulfvisaservices.com'],
      description: 'Send us your queries and job applications',
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: 'Office Locations',
      details: ['Dubai, UAE', 'Riyadh, Saudi Arabia', 'Doha, Qatar'],
      description: 'Visit our offices for in-person consultation',
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      description: "We're here to help during business hours",
    },
  ];

  const offices = [
    {
      country: 'UAE',
      city: 'Dubai',
      address: 'Business Bay, Dubai, UAE',
      phone: '+971 4 123 4567',
      email: 'dubai@gulfvisaservices.com',
    },
    {
      country: 'Saudi Arabia',
      city: 'Riyadh',
      address: 'King Fahd Road, Riyadh, KSA',
      phone: '+966 11 234 5678',
      email: 'riyadh@gulfvisaservices.com',
    },
    {
      country: 'Qatar',
      city: 'Doha',
      address: 'West Bay, Doha, Qatar',
      phone: '+974 4444 5555',
      email: 'doha@gulfvisaservices.com',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white dark:from-blue-700 dark:to-blue-900 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">24/7 Support Available</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-left">Get in Touch</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-blue-200 max-w-4xl mx-auto animate-fade-in-up delay-300">
              Ready to start your career journey? Contact our expert team for visa assistance and job placement services
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-up bg-white dark:bg-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gray-100 dark:bg-gray-600 rounded-full w-fit">{info.icon}</div>
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    {info.details.map((detail, idx) => (
                      <div key={idx} className="font-medium text-gray-900 dark:text-gray-200">
                        {detail}
                      </div>
                    ))}
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{info.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form and Info */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <Card className="shadow-xl bg-white dark:bg-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-gray-900 dark:text-gray-100">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8 animate-fade-in-up">
                      <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Application Sent Successfully!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Thank you for your application. Our team will review it and get back to you soon.
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Submit Another Application
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-900 dark:text-gray-200">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="transition-all duration-300 focus:scale-105 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-900 dark:text-gray-200">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="transition-all duration-300 focus:scale-105 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-900 dark:text-gray-200">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="transition-all duration-300 focus:scale-105 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-gray-900 dark:text-gray-200">
                            Subject *
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => handleInputChange('subject', value)}
                          >
                            <SelectTrigger className="transition-all duration-300 focus:scale-105 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                              <SelectItem value="job_inquiry">Job Application</SelectItem>
                              <SelectItem value="visa_assistance">Visa Assistance</SelectItem>
                              <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="complaint">Complaint</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-gray-900 dark:text-gray-200">
                          Address
                        </Label>
                        <Input
                          id="address"
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="transition-all duration-300 focus:scale-105 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                          placeholder="Your current address"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-900 dark:text-gray-200">Interested Jobs</Label>
                        {error ? (
                          <div className="text-red-600 dark:text-red-400">{error}</div>
                        ) : jobs.length === 0 ? (
                          <div className="text-gray-600 dark:text-gray-300">Loading jobs...</div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-3 border-gray-300 dark:border-gray-600">
                            {jobs.map((job) => (
                              <label key={job.id} className="flex items-center space-x-2 cursor-pointer">
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
                        {formData.interested_jobs.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {formData.interested_jobs.map((jobId, index) => {
                              const job = jobs.find((j) => j.id === jobId);
                              return (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                                >
                                  {job ? `${job.title} - ${job.country}` : jobId}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-900 dark:text-gray-200">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="text-base transition-all duration-300 focus:scale-105 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                          placeholder="Tell us about your requirements, experience, or any questions you have..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 text-white"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Our Offices
                </h2>
                <p className="text-gray-500 dark:text-gray-300 mb-8">
                  Visit our offices across the Gulf region for in-person consultation and assistance.
                </p>
              </div>

              {offices.map((office, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      {office.city}, {office.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Phone className="h-4 w-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Mail className="h-4 w-4" />
                      <span>{office.email}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                <CardHeader>
                  <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Why Choose Us?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-700 dark:text-blue-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Expert assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Job placement support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>99.8% success rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
  );
}