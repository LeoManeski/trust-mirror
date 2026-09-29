import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { api } from '../services/api'
import { FaCheck, FaTimes, FaArrowLeft, FaClock } from 'react-icons/fa'
import marsVideo from '../assets/mars.mp4'
import './ScenarioView.css'

function ScenarioView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [scenario, setScenario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userAnswer, setUserAnswer] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [attemptResult, setAttemptResult] = useState(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [userReasoning, setUserReasoning] = useState('')
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    loadScenario()
  }, [id])

  useEffect(() => {
    if (!submitted) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [submitted, startTime])

  const loadScenario = async () => {
    try {
      const response = await api.getScenario(id)
      setScenario(response.data)
    } catch (error) {
      console.error('Error loading scenario:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (userAnswer === null) return

    try {
      const response = await api.submitAttempt({
        scenarioId: parseInt(id),
        userAnswer: userAnswer,
        timeSpentSeconds: timeSpent,
        userReasoning: userReasoning
      })

      setAttemptResult(response.data)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting attempt:', error)
    }
  }

  const parseContent = (content) => {
    try {
      return JSON.parse(content)
    } catch {
      return { message: content }
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">Loading scenario...</div>
      </>
    )
  }

  if (!scenario) {
    return (
      <>
        <Navbar />
        <div className="error-container">Scenario not found</div>
      </>
    )
  }

  const content = parseContent(scenario.content)
  const isCorrect = attemptResult?.isCorrect

  return (
    <div className="scenario-view">
      <Navbar />
      <div className="scenario-container">
        <button onClick={() => navigate('/student/dashboard')} className="back-button">
          <FaArrowLeft /> Back to Dashboard
        </button>

        {!submitted ? (
          <>
            <div className="scenario-header-view">
              <div className="scenario-meta">
                <span className="scenario-type-badge">{scenario.type.replace('_', ' ')}</span>
                <span className="scenario-category-badge">{scenario.category.replace('_', ' ')}</span>
                <span className="difficulty-badge-view">Difficulty: {scenario.difficultyLevel}/5</span>
              </div>
              <h1>{scenario.title}</h1>
              <p className="scenario-description-view">{scenario.description}</p>
            </div>

            <div className="scenario-content-card">
              <div className="content-header">
                <h2>Examine This Content</h2>
                <div className="timer">
                  <FaClock /> {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="content-display">
                {scenario.type === 'TEXT_MESSAGE' && (
                  <div className="message-bubble">
                    <div className="message-sender">{content.sender || 'Unknown'}</div>
                    <div className="message-text">{content.message}</div>
                  </div>
                )}

                {scenario.type === 'SOCIAL_MEDIA_POST' && (
                  <div className="social-post">
                    <div className="post-header">
                      <div className="post-avatar">👤</div>
                      <div className="post-info">
                        <div className="post-author">{content.platform || 'Social Media'}</div>
                        <div className="post-time">Just now</div>
                      </div>
                    </div>
                    <div className="post-content">{content.post}</div>
                    {content.image && (
                      <div className="post-image-placeholder">
                        📷 Image: {content.image}
                      </div>
                    )}
                  </div>
                )}

                {scenario.type === 'EMAIL' && (
                  <div className="email-display">
                    <div className="email-header">
                      <div><strong>From:</strong> {content.sender || 'Unknown'}</div>
                      <div><strong>Subject:</strong> {content.subject || 'No Subject'}</div>
                    </div>
                    <div className="email-body">{content.body}</div>
                  </div>
                )}

                {scenario.type === 'NEWS_ARTICLE' && (
                  <div className="news-article">
                    <div className="news-source">{content.source || 'News Source'}</div>
                    <h3>{content.title}</h3>
                    <div className="news-meta">
                      <span>By {content.author || 'Author'}</span>
                      <span>{content.date || 'Date'}</span>
                    </div>
                    <div className="news-url">{content.url || 'Source URL'}</div>
                  </div>
                )}

                {scenario.type === 'VIDEO' && scenario.videoUrl && (
                  <div className="video-embed-container">
                    <div className="video-wrapper">
                      <video
                        controls
                        src={marsVideo}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '12px'
                        }}
                        title="Video content"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    {(content.claim || content.source) && (
                      <div className="video-info">
                        {content.claim && <div><strong>Claim:</strong> {content.claim}</div>}
                        {content.source && <div><strong>Source:</strong> {content.source}</div>}
                      </div>
                    )}
                  </div>
                )}
                {(scenario.type === 'AUDIO' || scenario.type === 'SCREENSHOT') && (
                  <div className="media-placeholder">
                    <div className="media-icon">
                      {scenario.type === 'AUDIO' && '🎵'}
                      {scenario.type === 'SCREENSHOT' && '📸'}
                    </div>
                    <div className="media-info">
                      <div><strong>Type:</strong> {scenario.type.replace('_', ' ')}</div>
                      {content.claim && <div><strong>Claim:</strong> {content.claim}</div>}
                      {content.source && <div><strong>Source:</strong> {content.source}</div>}
                    </div>
                  </div>
                )}
                {scenario.type === 'VIDEO' && !scenario.videoUrl && (
                  <div className="media-placeholder">
                    <div className="media-icon">🎥</div>
                    <div className="media-info">
                      <div><strong>Type:</strong> {scenario.type.replace('_', ' ')}</div>
                      {content.claim && <div><strong>Claim:</strong> {content.claim}</div>}
                      {content.source && <div><strong>Source:</strong> {content.source}</div>}
                    </div>
                  </div>
                )}
              </div>

              <div className="reasoning-section">
                <label htmlFor="reasoning">Your Reasoning (Optional)</label>
                <textarea
                  id="reasoning"
                  value={userReasoning}
                  onChange={(e) => setUserReasoning(e.target.value)}
                  placeholder="What makes you think this is authentic or deceptive?"
                  rows="4"
                />
              </div>

              <div className="decision-section">
                <h3>Your Decision</h3>
                <div className="decision-buttons">
                  <button
                    className={`decision-btn authentic ${userAnswer === false ? 'selected' : ''}`}
                    onClick={() => setUserAnswer(false)}
                  >
                    <FaCheck /> Authentic
                  </button>
                  <button
                    className={`decision-btn deceptive ${userAnswer === true ? 'selected' : ''}`}
                    onClick={() => setUserAnswer(true)}
                  >
                    <FaTimes /> Deceptive
                  </button>
                </div>
              </div>

              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={userAnswer === null}
              >
                Submit Answer
              </button>
            </div>
          </>
        ) : (
          <div className="result-view">
            <div className={`result-header ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <FaCheck className="result-icon" />
                  <h2>Correct!</h2>
                  <p>You identified this content correctly.</p>
                </>
              ) : (
                <>
                  <FaTimes className="result-icon" />
                  <h2>Incorrect</h2>
                  <p>This content was {scenario.isDeceptive ? 'deceptive' : 'authentic'}.</p>
                </>
              )}
            </div>

            <div className="explanation-card">
              <h3>Explanation</h3>
              <p className="explanation-text">{scenario.explanation}</p>

              <div className="techniques-section">
                <h4>Manipulation Techniques Used:</h4>
                <div className="techniques-list">
                  {scenario.manipulationTechniques?.split(',').map((tech, idx) => (
                    <span key={idx} className="technique-tag">{tech.trim()}</span>
                  ))}
                </div>
              </div>

              <div className="triggers-section">
                <h4>Psychological Triggers:</h4>
                <div className="triggers-list">
                  {scenario.psychologicalTriggers?.split(',').map((trigger, idx) => (
                    <span key={idx} className="trigger-tag">{trigger.trim()}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="result-actions">
              <button
                className="btn-primary-action"
                onClick={() => {
                  setSubmitted(false)
                  setUserAnswer(null)
                  setAttemptResult(null)
                  setUserReasoning('')
                  setTimeSpent(0)
                  setStartTime(Date.now())
                }}
              >
                Try Again
              </button>
              <button
                className="btn-secondary-action"
                onClick={() => navigate('/student/dashboard')}
              >
                Back to Dashboard
              </button>
              <button
                className="btn-secondary-action"
                onClick={() => navigate('/student/trust-mirror')}
              >
                View Trust Mirror
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScenarioView
