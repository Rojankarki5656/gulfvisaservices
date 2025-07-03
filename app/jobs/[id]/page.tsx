"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"


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
export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    jobId: "",
  })
  const [modalMessage, setModalMessage] = useState<string>("")

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("jobs_job")
        .select("*")
        .eq("id", params.id)
        .single()
      if (error) setError("Job not found")
      setJob(data)
      setLoading(false)
    }
    if (params.id) fetchJob()
  }, [params.id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error || !job) return <div className="min-h-screen flex items-center justify-center text-red-600">{error || "Job not found"}</div>
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-pageBlue-600">{job.title}</CardTitle>
            <CardDescription className="text-lg text-gray-700 mt-1">{job.company}</CardDescription>
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
            <Badge className="mt-2">{job.category}</Badge>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="font-semibold">Salary:</span>{" "}
              <span className="text-green-600">{job.salary} {job.currency}</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Positions:</span> {job.positions}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Deadline:</span> {new Date(job.deadline).toLocaleDateString()}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Description:</span>
              <p className="text-gray-700">{job.description}</p>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Requirements:</span>
              <ul className="list-disc ml-6 text-gray-700">
                {(job.requirements?.items || []).map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Benefits:</span>
              <ul className="list-disc ml-6 text-gray-700">
                {(job.benefits?.items || []).map((ben: string, i: number) => (
                  <li key={i}>{ben}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            className="flex-1 bg-pageBlue-600 hover:bg-pageBlue-700 text-white font-semibold transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              setFormData(prev => ({ ...prev, jobId: job.id }))
              setIsFormOpen(true)
            }}
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            ← Back to Jobs
          </Button>
        </div>
        {/* Application Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (!formData.name || !formData.email || !formData.phone) {
                    setModalMessage("Please fill all required fields.")
                    return
                  }
                  const { error } = await supabase.from("applications").insert({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    job_id: job.id,
                    message: formData.message,
                  })
                  if (error) {
                    setModalMessage("Failed to submit application.")
                  } else {
                    setModalMessage("Application submitted!")
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      message: "",
                      jobId: "",
                    })
                  }
                }}
              >
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    className="w-full border rounded px-3 py-2"
                    value={formData.message}
                    onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pageBlue-600 hover:bg-pageBlue-700 text-white font-semibold mt-2"
                >
                  Submit Application
                </Button>
              </form>
              {/* Modal message and OK button */}
              {modalMessage && (
                <div className="mt-6 text-center">
                  <div className="mb-4 text-gray-800">{modalMessage}</div>
                  <Button
                    className="w-full bg-pageBlue-600 hover:bg-pageBlue-700 text-white font-semibold"
                    onClick={() => {
                      setModalMessage("")
                      if (modalMessage === "Application submitted!") setIsFormOpen(false)
                    }}
                  >
                    OK
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}