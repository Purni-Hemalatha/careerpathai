/**
 * OnboardingFlow.jsx
 * ==================
 * Drop-in orchestrator for the CareerPath AI onboarding feature.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CareerGate from "./CareerGate";
import PersonalityAssessment from "./PersonalityAssessment";
import IQAssessment from "./IQAssessment";
import AssessmentResults from "./AssessmentResults";

const STAGES = {
  GATE: "gate",
  PERSONALITY: "personality",
  IQ: "iq",
  RESULTS: "results",
};

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(STAGES.GATE);
  const [personalityAnswers, setPersonalityAnswers] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState(null);

  const handleYes = () => {
    // User knows their path — skip assessment, go straight to dashboard
    navigate("/explore");
  };

  const handleNo = () => {
    // User is unsure — start personality assessment
    setStage(STAGES.PERSONALITY);
  };

  const handlePersonalityComplete = (answers) => {
    setPersonalityAnswers(answers);
    setStage(STAGES.IQ);
  };

  const handleIQComplete = (results) => {
    const finalResults = { ...results, personalityAnswers };
    // Persist results for use elsewhere in the app
    try {
      const existing = JSON.parse(localStorage.getItem("careerAssessment") || "{}");
      localStorage.setItem("careerAssessment", JSON.stringify({
        ...existing,
        completedAt: new Date().toISOString(),
        ...finalResults,
      }));
    } catch (e) {
      console.warn("Could not save assessment to localStorage:", e);
    }
    setAssessmentResults(finalResults);
    setStage(STAGES.RESULTS);
  };

  const handleGoToDashboard = () => {
    navigate("/explore");
  };

  switch (stage) {
    case STAGES.GATE:
      return <CareerGate onYes={handleYes} onNo={handleNo} />;

    case STAGES.PERSONALITY:
      return <PersonalityAssessment onComplete={handlePersonalityComplete} />;

    case STAGES.IQ:
      return (
        <IQAssessment
          personalityAnswers={personalityAnswers}
          onComplete={handleIQComplete}
        />
      );

    case STAGES.RESULTS:
      return (
        <AssessmentResults
          results={assessmentResults}
          onGoToDashboard={handleGoToDashboard}
        />
      );

    default:
      return null;
  }
}
