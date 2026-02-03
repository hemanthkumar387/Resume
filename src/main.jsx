import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/form.css";
import "./styles/skills.css";
import "./styles/experience.css";
import "./styles/resume.css";
import "./styles/buttons.css";
import "./styles/sectionreorder.css"
import { ResumeProvider } from "./context/ResumeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>
);
