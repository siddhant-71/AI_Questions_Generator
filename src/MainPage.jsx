import React, { useState } from "react";
import axios from "axios";
import "./MainPage.css";
import { Navigate, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [file, setFile] = useState(null);
  const [questionType, setQuestionType] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async () => {
    if (!topic && !file) {
      alert("Please enter a topic or upload a file!");
      return;
    }
    if (!difficulty || !questionType || !questionCount) {
      alert("Please select all dropdown options.");
      return;
    }

    setLoading(true);
    try {
        navigate('/questions')
      const response = await axios.get("https://example.com/api/questions", {
        params: {
          topic,
          difficulty,
          questionType,
          questionCount,
        },
      });

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      {/* MULTIPLE FLOATING BACKGROUND ELEMENTS */}
      <div className="floating floating-1"></div>
      <div className="floating floating-2"></div>
      <div className="floating floating-3"></div>
      <div className="floating floating-4"></div>
      <div className="floating floating-5"></div>
      <div className="floating floating-6"></div>
      <div className="floating floating-7"></div>

      {/* HEADER */}
      <header className="header">
        <h1 className="company-name">EduQuest AI</h1>
      </header>

      {/* BODY */}
      <main className="body">
        <div className="form-card">
          <input
            type="text"
            className="input-field"
            placeholder="Enter topic or keyword..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <select
            className="dropdown"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Expert">Expert</option>
            <option value="Legendary">Legendary</option>
          </select>

          {/* File upload */}
          <div className="file-upload">
            <label htmlFor="fileInput" className="file-label">
              {file ? file.name : "Upload PDF or Image"}
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf, image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Question type */}
          <select
            className="dropdown"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="">Select Question Type</option>
            <option value="MCQ">Multiple Choice (MCQ)</option>
            <option value="FILL">Fill in the Blanks</option>
            <option value="ONE_LINE">One-Line Questions</option>
          </select>

          {/* Question count */}
          <select
            className="dropdown"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
          >
            <option value="">Number of Questions</option>
            {[5, 10, 15, 20, 25, 30].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <button className="btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating..." : "Get Questions"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
