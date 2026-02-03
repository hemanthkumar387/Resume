import {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ResumeContext } from "../../context/ResumeContext";

const A4_HEIGHT_PX = 1122; // ~297mm at 96dpi

const formatMonthYear = (value) => {
  if (!value || value === "Present") return value;

  const [year, month] = value.split("-");
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[Number(month) - 1]} ${year}`;
};

const OneColumnTemplate = () => {
  const { resumeData } = useContext(ResumeContext);

  const measureRef = useRef(null);
  const [pages, setPages] = useState([]);

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    requestAnimationFrame(() => {
      const blocks = Array.from(measureRef.current.children);

      let currentHeight = 0;
      let currentPage = [];
      const result = [];

      blocks.forEach((block) => {
        const height = block.offsetHeight;
        const html = block.outerHTML;

        if (currentHeight + height > A4_HEIGHT_PX) {
          result.push([...currentPage]);
          currentPage = [];
          currentHeight = 0;
        }

        currentPage.push(html);
        currentHeight += height;
      });

      if (currentPage.length) {
        result.push(currentPage);
      }

      setPages(result);
    });
  }, [
    resumeData.photo,
    resumeData.name,
    resumeData.email,
    resumeData.phone,
    resumeData.location,
    resumeData.linkedin,
    resumeData.github,
    resumeData.summary,
    resumeData.skills,
    resumeData.experience,
    resumeData.education,
    resumeData.projects,
  ]);

  return (
    <div id="resume" className="resume">
      {/* INVISIBLE MEASUREMENT CONTAINER */}
      <div className="resume-measure" ref={measureRef}>
        {resumeData.photo && (
          <img
            src={resumeData.photo}
            alt="Profile"
            className="profile-photo"
          />
        )}

        <h1>{resumeData.name}</h1>

        <p className="contact">
          {resumeData.email} | {resumeData.phone}
        </p>

        {resumeData.location && (
          <p className="contact">{resumeData.location}</p>
        )}

        <p className="contact">
          {resumeData.linkedin && (
            <a href={resumeData.linkedin}>LinkedIn</a>
          )}
          {resumeData.github && (
            <> | <a href={resumeData.github}>GitHub</a></>
          )}
        </p>

        {resumeData.summary && (
          <section>
            <h2>Summary</h2>
            <p>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.skills &&
          Object.values(resumeData.skills).some(
            (arr) => Array.isArray(arr) && arr.length > 0
          ) && (
            <section>
              <h2>Technical Skills</h2>
              {Object.entries(resumeData.skills).map(
                ([cat, items]) =>
                  items.length > 0 && (
                    <p key={cat} className="grouped-skill">
                      <strong>{cat}:</strong> {items.join(", ")}
                    </p>
                  )
              )}
            </section>
          )}

        {resumeData.experience?.length > 0 && (
          <section>
            <h2>Experience</h2>
            {resumeData.experience.map((e, i) => (
              <div key={i} className="resume-experience">
                <strong>{e.role}</strong> – {e.company}
                <p className="duration">
                  {formatMonthYear(e.from)} –{" "}
                  {formatMonthYear(e.to || "Present")}
                </p>
                <p>{e.description}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.education?.length > 0 && (
          <section>
            <h2>Education</h2>
            {resumeData.education.map((e, i) => (
              <div key={i} className="education-item">
                <strong>{e.degree}</strong> – {e.course}
                <p>{e.institution}</p>
                <p className="duration">
                  {formatMonthYear(e.from)} –{" "}
                  {formatMonthYear(e.to)}
                </p>
                {e.score && <p>CGPA: {e.score}</p>}
              </div>
            ))}
          </section>
        )}

        {resumeData.projects?.length > 0 && (
          <section>
            <h2>Projects</h2>
            {resumeData.projects.map((p, i) => (
              <div key={i} className="project-item">
                <div className="project-header">
                  <strong>{p.title}</strong>
                  {p.tech && (
                    <p className="project-tech">{p.tech}</p>
                  )}
                </div>
                <p className="project-desc">{p.description}</p>
                {p.link && <a href={p.link}>{p.link}</a>}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* ACTUAL A4 PAGES */}
      {pages.map((page, i) => (
        <div key={i} className="resume-page">
          {page.map((html, idx) => (
            <div
              key={idx}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OneColumnTemplate;
