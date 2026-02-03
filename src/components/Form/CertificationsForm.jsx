import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const CertificationsForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const [cert, setCert] = useState({
    title: "",
    issuer: "",
    year: "",
  });

  const addCertification = () => {
    if (!cert.title.trim()) return;

    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, cert],
    });

    setCert({ title: "", issuer: "", year: "" });
  };

  const removeCertification = (index) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div className="form-section">
      <h3>Certifications</h3>

      <input
        placeholder="Certification Title"
        value={cert.title}
        onChange={(e) => setCert({ ...cert, title: e.target.value })}
      />

      <input
        placeholder="Issuing Organization"
        value={cert.issuer}
        onChange={(e) => setCert({ ...cert, issuer: e.target.value })}
      />

      <input
        placeholder="Year (optional)"
        value={cert.year}
        onChange={(e) => setCert({ ...cert, year: e.target.value })}
      />

      <button onClick={addCertification}>Add Certification</button>

      {resumeData.certifications.map((c, i) => (
        <div key={i} className="list-item">
          <span>
            {c.title} {c.issuer && `– ${c.issuer}`} {c.year && `(${c.year})`}
          </span>
          <button onClick={() => removeCertification(i)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;
