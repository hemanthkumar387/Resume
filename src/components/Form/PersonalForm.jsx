import { useContext, useRef } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const PersonalForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeData({ ...resumeData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setResumeData({ ...resumeData, photo: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="form-section">
      <h3>Personal Details</h3>

      <input
        type="text"
        placeholder="Full Name"
        required
        value={resumeData.name}
        onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={resumeData.email}
        onChange={(e) =>
          setResumeData({ ...resumeData, email: e.target.value })
        }
      />

      <input
        type="tel"
        placeholder="Phone"
        required
        value={resumeData.phone}
        onChange={(e) =>
          setResumeData({ ...resumeData, phone: e.target.value })
        }
      />

      <input
        type="url"
        placeholder="LinkedIn Profile URL"
        value={resumeData.linkedin}
        onChange={(e) =>
          setResumeData({ ...resumeData, linkedin: e.target.value })
        }
      />

      <input
        type="url"
        placeholder="GitHub Profile URL"
        value={resumeData.github}
        onChange={(e) =>
          setResumeData({ ...resumeData, github: e.target.value })
        }
      />

      <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} />

      {resumeData.photo && (
        <button type="button" className="danger-btn" onClick={removePhoto}>
          Remove Photo
        </button>
      )}
    </div>
  );
};

export default PersonalForm;
