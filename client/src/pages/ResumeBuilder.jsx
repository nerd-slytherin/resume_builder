import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  Eye,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { dummyResumeData } from "../assets/assets";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal_info", title: "Personal Info", icon: User },
    { id: "summary", title: "Summary", icon: FileText },
    { id: "experience", title: "Experience", icon: Briefcase },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "projects", title: "Projects", icon: FolderIcon },
    { id: "skills", title: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  const changeResumeVisibility = () => {
    setResumeData({ ...resumeData, public: !resumeData.public });
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <div>
      {/* Back to Dashboard */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-8 relative">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="relative lg:col-span-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative overflow-hidden">
              {/* Progress Bar */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)
                    }%`,
                }}
              />

              {/* TOP BAR */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(templateId) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template: templateId,
                      }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((i) => Math.max(i - 1, 0))
                      }
                      className="flex items-center gap-1 p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((i) =>
                        Math.min(i + 1, sections.length - 1)
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-3 text-sm rounded-lg hover:bg-gray-50 ${activeSectionIndex === sections.length - 1 &&
                      "opacity-50"
                      }`}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="space-y-6">
                {activeSection.id === "personal_info" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        projects: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>

              <button className="mt-6 px-6 py-2 text-sm rounded-md bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 ring ring-indigo-300 hover:ring-indigo-400">
                Save Changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7 relative">
            <div className="absolute top-[10px] right-0 flex gap-2">
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                >
                  <Share2Icon className="size-4" /> Share
                </button>
              )}

              <button
                onClick={changeResumeVisibility}
                className="flex items-center gap-2 px-4 py-2 text-xs bg-purple-100 text-purple-600 rounded-lg ring ring-purple-300"
              >
                {resumeData.public ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-6 py-2 text-xs bg-indigo-100 text-indigo-600 rounded-lg ring ring-indigo-300"
              >
                <DownloadIcon className="size-4" /> Download
              </button>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
