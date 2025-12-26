import React from 'react';

const AcademicResumeTemplate = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white p-8"
      style={{ fontFamily: 'Times New Roman, serif', fontSize: '11pt', lineHeight: '1.3' }}
    >
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-4 pb-3 border-b border-black">
        
        {/* Fixed Logo (no user input allowed) */}
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src="https://www.mnnit.ac.in/iiicell/images/mnnit_logo.png"
            alt="MNNIT Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Personal Info */}
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'Times New Roman, serif' }}>
            {data.personal_info?.full_name || "Your Full Name"}
          </h1>
          <div className="text-xs leading-relaxed">
            <p>Roll No: {data.personal_info?.roll_number || "Your Roll Number"}</p>
            <p>✉ {data.personal_info?.college_email || "your.college.email@college.edu"}</p>
            <p className="mb-0">
              {data.personal_info?.college || "Your College/University Name"}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-xs text-right leading-relaxed">
          <p><strong>Contact :</strong> ☎ | +91-{data.personal_info?.phone || "1234567890"}</p>
          <p>✉ {data.personal_info?.email || "your.email@example.com"}</p>
          <p>⊕ {data.personal_info?.github || "your-github"}</p>
          <p>⊕ {data.personal_info?.linkedin || "your-linkedin"}</p>
        </div>
      </div>

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-2 text-xs">
              <div className="flex justify-between items-baseline">
                <p className="font-bold">•{edu.institution || "Institution Name"}</p>
                <p className="italic">
                  {edu.duration ||
                    `${formatDate(edu.start_date)} - ${
                      edu.is_current ? "Present" : formatDate(edu.end_date)
                    }`}
                </p>
              </div>
              <div className="flex justify-between items-baseline ml-2">
                <p className="italic">{edu.degree || "Degree Name"}</p>
                <p>{edu.grade || edu.gpa || "Grade/CGPA"}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Work Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Work Experience
          </h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-2 text-xs">
              <div className="flex justify-between items-baseline">
                <p className="font-bold">•{exp.company || "Company Name"}</p>
                <p className="italic">
                  {exp.duration ||
                    `${formatDate(exp.start_date)} - ${
                      exp.is_current ? "Present" : formatDate(exp.end_date)
                    }`}
                </p>
              </div>
              <div className="ml-2">
                <p className="italic">{exp.position || "Position"}</p>
                <p className="mb-1">{exp.location || "Location"}</p>
                {exp.description &&
                  exp.description.split("\n").map((point, pidx) => (
                    <p key={pidx} className="mb-1 text-justify leading-tight ml-2">
                      {point}
                    </p>
                  ))}
                {exp.points &&
                  exp.points.map((point, pidx) => (
                    <p key={pidx} className="mb-1 ml-2 text-justify leading-tight">
                      {point}
                    </p>
                  ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {data.project && data.project.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Projects
          </h2>
          {data.project.map((project, idx) => (
            <div key={idx} className="mb-3 text-xs">
              <p className="font-bold">•{project.name || "Project Name"}</p>
              <div className="ml-2">
                <p className="italic mb-1">
                  {project.type ||
                    project.description?.split("\n")[0] ||
                    "Project Description"}
                </p>
                {project.tools && <p className="mb-1">Tools used: {project.tools}</p>}
                {project.description &&
                  project.description.split("\n").map((point, pidx) => (
                    point && (
                      <p key={pidx} className="mb-1 text-justify leading-tight">
                        {point}
                      </p>
                    )
                  ))}
                {project.points &&
                  project.points.map((point, pidx) => (
                    <p key={pidx} className="mb-1 text-justify leading-tight">
                      {point}
                    </p>
                  ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills Section */}
      {data.skills && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Technical Skills and Interests
          </h2>
          <div className="text-xs ml-2 leading-relaxed">
            {data.skills.languages && (
              <p>
                <strong>Languages</strong> :{" "}
                {Array.isArray(data.skills.languages)
                  ? data.skills.languages.join(", ")
                  : data.skills.languages}
              </p>
            )}
            {data.skills.tools && (
              <p>
                <strong>Developer Tools</strong> :{" "}
                {Array.isArray(data.skills.tools)
                  ? data.skills.tools.join(", ")
                  : data.skills.tools}
              </p>
            )}
            {data.skills.libraries && (
              <p>
                <strong>Libraries/Database</strong> :{" "}
                {Array.isArray(data.skills.libraries)
                  ? data.skills.libraries.join(", ")
                  : data.skills.libraries}
              </p>
            )}
            {data.skills.interests && (
              <p>
                <strong>Areas of Interest</strong> :{" "}
                {Array.isArray(data.skills.interests)
                  ? data.skills.interests.join(", ")
                  : data.skills.interests}
              </p>
            )}
            {Array.isArray(data.skills) && data.skills.length > 0 && (
              <p>
                <strong>Skills</strong> : {data.skills.join(", ")}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Coding Profiles Section */}
      {data.coding_profiles && data.coding_profiles.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Coding Profiles
          </h2>
          {data.coding_profiles.map((profile, idx) => (
            <div key={idx} className="text-xs ml-2">
              <p>
                <strong>•{profile.platform || "Platform Name"}</strong> :{" "}
                {profile.details || profile.rating || "Rating/Details"},{" "}
                <span className="underline ml-1">
                  {profile.username || "username"}
                </span>
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements Section */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Achievements
          </h2>
          {data.achievements.map((achievement, idx) => (
            <div key={idx} className="text-xs mb-1 flex justify-between">
              <p className="flex-1">
                <strong>•{achievement.title || "Achievement Title"}</strong>
                {achievement.description && (
                  <span>, {achievement.description}</span>
                )}
              </p>
              <p className="italic ml-4">
                {achievement.date ||
                  formatDate(achievement.achievement_date)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Positions of Responsibility Section */}
      {data.responsibilities && data.responsibilities.length > 0 && (
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">
            Positions of Responsibility
          </h2>
          <div className="text-xs">
            {data.responsibilities.map((resp, idx) => (
              <p key={idx} className="mb-2 leading-tight">
                • <strong>{resp.role || "Role/Position"}:</strong>{" "}
                {resp.description || "Description of responsibilities"}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AcademicResumeTemplate;
