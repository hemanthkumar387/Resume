import PersonalForm from "./components/Form/PersonalForm";
import SummaryForm from "./components/Form/SummaryForm";
import SkillsForm from "./components/Form/SkillsForm";
import OneColumnTemplate from "./components/Resume/OneColumnTemplate";
import DownloadButton from "./components/Download/DownloadButton";
import ExperienceForm from "./components/Form/ExperienceForm";
import EducationForm from "./components/Form/EducationForm";
import ProjectsForm from "./components/Form/ProjectsForm";

const App = () => {
  const clearResume = () => {
    localStorage.removeItem("resumeData");
    window.location.reload();
  };

  return (
    <div className="container">
      {/* LEFT SIDE – FORMS */}
      <div className="form-container">
        <PersonalForm />
        <SummaryForm />
        <SkillsForm />
        <ExperienceForm />
        <EducationForm />
        <ProjectsForm />
        <button className="clear-btn" onClick={clearResume}>
          Clear Resume
        </button>
      </div>

      {/* RIGHT SIDE – RESUME + ACTIONS */}
      <div className="resume-container">
        <div className="resume-actions">
          <DownloadButton />
        </div>

        <OneColumnTemplate />
      </div>
    </div>
  );
};

export default App;
