import html2pdf from "html2pdf.js";

const DownloadButton = () => {
  const downloadPDF = () => {
    const element = document.getElementById("resume");

    html2pdf()
      .set({
        margin: 0,
        filename: "resume.pdf",
        pagebreak: {
          mode: ["css", "legacy"], // 🔥 IMPORTANT
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save("resume.pdf");
  };

  return (
    <button className="download-btn" onClick={downloadPDF}>
      ⬇ Download PDF
    </button>
  );
};

export default DownloadButton;
