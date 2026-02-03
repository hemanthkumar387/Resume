import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const ProjectsForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [project, setProject] = useState({
    title: "",
    tech: "",
    description: "",
    link: ""
  });

  const addProject = () => {
    if (!project.title) return;

    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, project],
    });

    setProject({ title: "", tech: "", description: "", link: "" });
  };

  const removeProject = (i) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="form-section">
      <h3>Projects</h3>

      <input
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />

      <input
        placeholder="Technologies Used"
        value={project.tech}
        onChange={(e) => setProject({ ...project, tech: e.target.value })}
      />

      <textarea
        placeholder="Project Description"
        value={project.description}
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      />

      <input
        type="url"
        placeholder="Project Link (GitHub / Live)"
        value={project.link}
        onChange={(e) => setProject({ ...project, link: e.target.value })}
      />

      <button onClick={addProject}>Add Project</button>

      {resumeData.projects.map((_, i) => (
        <button key={i} onClick={() => removeProject(i)}>
          ❌ Remove {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ProjectsForm;
