import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Questions.css";
import { jsPDF } from "jspdf";

const Questions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const exampleQuestions = [
    {
      question: "What is Artificial Intelligence?",
      answer:
        "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems.",
    },
    {
      question: "Explain supervised learning.",
      answer:
        "Supervised learning involves training a model on labeled data, where the algorithm learns to map inputs to correct outputs.",
    },
    {
      question: "What is an Artificial Neural Network?",
      answer:
        "An Artificial Neural Network is a computational model inspired by the human brain, consisting of interconnected nodes (neurons).",
    },
    {
      question: "Differentiate between AI and Machine Learning.",
      answer:
        "AI is the broader concept of creating smart machines, while ML is a subset that focuses on systems that learn from data.",
    },
  ];

  const questions = location.state?.questions || exampleQuestions;
  const topic = location.state?.topic || "Artificial Intelligence";

  // ---------- PDF Export Logic ----------
  const exportPDF = (type) => {
    const doc = new jsPDF({ unit: "pt" });
    doc.setFontSize(18);
    doc.text(`Generated ${type} on: ${topic}`, 40, 50);
    doc.setFontSize(13);
    let y = 80;

    questions.forEach((q, i) => {
      if (type === "Questions") {
        doc.text(`${i + 1}. ${q.question}`, 40, y);
        y += 30;
      } else if (type === "Answers") {
        doc.text(`${i + 1}. ${q.answer}`, 40, y);
        y += 30;
      } else {
        doc.text(`${i + 1}. ${q.question}`, 40, y);
        y += 20;
        doc.text(`Answer: ${q.answer}`, 60, y);
        y += 30;
      }

      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    });

    const filename =
      type === "Questions"
        ? `${topic}_questions_only.pdf`
        : type === "Answers"
        ? `${topic}_answers_only.pdf`
        : `${topic}_full_set.pdf`;

    doc.save(filename);
  };

  const handleNewSet = () => {
    window.location.reload();
  };

  return (
    <div className="questions-container">
      {/* 🌸 Floating Animated Background */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`floating floating-${i + 1}`}></div>
      ))}

      {/* Header Section */}
      <div className="questions-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ←
        </button>
        <h1 className="topic-title">AI Questions on "{topic}"</h1>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {questions.map((q, index) => (
          <div className="question-card" key={index}>
            <h2 className="question-text">
              {index + 1}. {q.question}
            </h2>
            <p className="answer-text">{q.answer}</p>
          </div>
        ))}
      </div>

      {/* Button Controls */}
      <div className="buttons-row">
        <button className="pdf-btn" onClick={() => exportPDF("Full Set")}>
          📄 Extract Full (Q + A)
        </button>
        <button className="pdf-btn" onClick={() => exportPDF("Questions")}>
          ❓ Extract Only Questions
        </button>
        <button className="pdf-btn" onClick={() => exportPDF("Answers")}>
          💡 Extract Only Answers
        </button>
        <button className="regen-btn" onClick={handleNewSet}>
          🔁 Generate New Set
        </button>
      </div>
    </div>
  );
};

export default Questions;
