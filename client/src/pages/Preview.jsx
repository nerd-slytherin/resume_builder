import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, Loader } from 'lucide-react'

const Preview = () => {
  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    )
    setResumeData(resume || null)
    setIsLoading(false)
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          className="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      {isLoading ? (
        <Loader className="animate-spin size-8 text-slate-500" />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume not found
          </p>

          <Link
            to="/"
            className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-1 ring-indigo-400 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Go to Home Page
          </Link>
        </div>
      )}
    </div>
  )
}

export default Preview
