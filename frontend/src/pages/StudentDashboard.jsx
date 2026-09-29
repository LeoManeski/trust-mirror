import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { api } from '../services/api'
import { FaPlay, FaCheckCircle, FaTimesCircle, FaChartLine } from 'react-icons/fa'
import './StudentDashboard.css'

function StudentDashboard() {
  const [scenarios, setScenarios] = useState([])
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAttempts: 0,
    correctAttempts: 0,
    accuracy: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [scenariosRes, attemptsRes] = await Promise.all([
        api.getScenarios(),
        api.getMyAttempts()
      ])
      
      setScenarios(scenariosRes.data)
      setAttempts(attemptsRes.data)
      
      const correct = attemptsRes.data.filter(a => a.isCorrect).length
      const total = attemptsRes.data.length
      setStats({
        totalAttempts: total,
        correctAttempts: correct,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAttemptForScenario = (scenarioId) => {
    return attempts.find(a => a.scenarioId === scenarioId || a.scenarioId === parseInt(scenarioId) || parseInt(a.scenarioId) === scenarioId)
  }


  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">Loading...</div>
      </>
    )
  }

  return (
    <div className="student-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Your Learning Dashboard</h1>
          <p>Practice recognizing AI deception and build your critical thinking skills</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon accuracy">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.accuracy}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon attempts">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalAttempts}</div>
              <div className="stat-label">Total Attempts</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon correct">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.correctAttempts}</div>
              <div className="stat-label">Correct</div>
            </div>
          </div>
        </div>

        <div className="scenarios-section">
          <h2>Available Scenarios</h2>
          <p className="section-subtitle">Challenge yourself with realistic deception scenarios</p>
          
          <div className="scenarios-grid">
            {scenarios.map(scenario => {
              const attempt = getAttemptForScenario(scenario.id)
              const difficultyColors = {
                1: '#10b981',
                2: '#f59e0b',
                3: '#f97316',
                4: '#ef4444',
                5: '#dc2626'
              }
              
              return (
                <div key={scenario.id} className="scenario-card">
                  <div className="scenario-header">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: difficultyColors[scenario.difficultyLevel] || '#64748b' }}
                    >
                      Level {scenario.difficultyLevel}
                    </span>
                  </div>
                  
                  <h3 className="scenario-title">{scenario.title}</h3>
                  <p className="scenario-description">{scenario.description}</p>
                  
                  <div className="scenario-tags">
                    <span className="tag">{scenario.category.replace('_', ' ')}</span>
                    <span className="tag">{scenario.type.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="scenario-actions">
                    {attempt ? (
                      <>
                        <Link 
                          to={`/student/scenario/${scenario.id}`}
                          className="btn-scenario-retry"
                        >
                          {attempt.isCorrect ? (
                            <>
                              <FaCheckCircle /> Retry Challenge
                            </>
                          ) : (
                            <>
                              <FaTimesCircle /> Try Again
                            </>
                          )}
                        </Link>
                        <div className="scenario-result-badge">
                          {attempt.isCorrect ? (
                            <span className="result-success-small">
                              <FaCheckCircle /> Correct
                            </span>
                          ) : (
                            <span className="result-error-small">
                              <FaTimesCircle /> Incorrect
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <Link 
                        to={`/student/scenario/${scenario.id}`}
                        className="btn-scenario-start"
                      >
                        <FaPlay /> Start Challenge
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
