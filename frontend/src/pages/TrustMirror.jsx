import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { api } from '../services/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts'
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import './TrustMirror.css'

function TrustMirror() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    loadProfile()
    loadAttempts()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await api.getMyProfile()
      setProfile(response.data)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAttempts = async () => {
    try {
      const response = await api.getMyAttempts()
      setAttempts(response.data || [])
    } catch (error) {
      console.error('Error loading attempts:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">Loading your Trust Mirror...</div>
      </>
    )
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <div className="error-content">
            <FaExclamationTriangle className="error-icon" />
            <h2>No profile data available</h2>
            <p>Complete some scenarios first to see your Trust Mirror!</p>
          </div>
        </div>
      </>
    )
  }

  const vulnerabilityData = [
    { name: 'Emotional\nManipulation', value: profile.emotionalManipulationScore || 0, fullName: 'Emotional Manipulation' },
    { name: 'Authority\nBias', value: profile.authorityBiasScore || 0, fullName: 'Authority Bias' },
    { name: 'Urgency\nTactics', value: profile.urgencyTacticsScore || 0, fullName: 'Urgency Tactics' },
    { name: 'Visual\nInconsistency', value: profile.visualInconsistencyScore || 0, fullName: 'Visual Inconsistency' },
    { name: 'Audio\nInconsistency', value: profile.audioInconsistencyScore || 0, fullName: 'Audio Inconsistency' },
    { name: 'Source\nVerification', value: profile.sourceVerificationScore || 0, fullName: 'Source Verification' },
    { name: 'Social\nProof', value: profile.socialProofScore || 0, fullName: 'Social Proof' },
    { name: 'Scarcity', value: profile.scarcityScore || 0, fullName: 'Scarcity' }
  ]

  const maxVal = Math.max(...vulnerabilityData.map(d => d.value), 0);
  const dynamicMax = maxVal === 0 ? 10 : Math.ceil((maxVal + 1) / 10) * 10;

  const radarData = vulnerabilityData.map(item => ({
    category: item.fullName,
    value: item.value,
    fullMark: dynamicMax
  }))

  const topVulnerabilities = [...vulnerabilityData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .filter(v => v.value > 0)

  const getVulnerabilityColor = (value) => {
    if (value >= 70) return '#ef4444'
    if (value >= 40) return '#f59e0b'
    return '#10b981'
  }

  const getVulnerabilityLevel = (value) => {
    if (value >= 70) return 'High'
    if (value >= 40) return 'Medium'
    return 'Low'
  }

  const totalAttempts = profile.totalAttempts || 0
  const correctAttempts = profile.correctAttempts || 0
  const incorrectAttempts = totalAttempts - correctAttempts
  const accuracy = profile.overallAccuracy || 0

  const pieData = [
    { name: 'Correct', value: correctAttempts, color: '#10b981' },
    { name: 'Incorrect', value: incorrectAttempts, color: '#ef4444' }
  ]

  return (
    <div className="trust-mirror">
      <Navbar />
      <div className="mirror-container">
        <div className="mirror-header glass-card">
          <div>
            <h1>Your Trust Mirror</h1>
            <p className="mirror-subtitle subheading">
              See how you're most likely to be manipulated by AI deception
            </p>
          </div>
        </div>

        <div className="overview-stats">
          <div className="overview-card glass-card">
            <div className="stat-icon-wrapper">
              <FaCheckCircle className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-label subheading">Total Attempts</div>
              <div className="stat-value-large">{totalAttempts}</div>
            </div>
          </div>
          <div className="overview-card glass-card">
            <div className="stat-icon-wrapper success">
              <FaCheckCircle className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-label subheading">Correct Answers</div>
              <div className="stat-value-large">{correctAttempts}</div>
            </div>
          </div>
          <div className="overview-card glass-card">
            <div className="stat-icon-wrapper accuracy">
              <FaShieldAlt className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-label subheading">Overall Accuracy</div>
              <div className="stat-value-large">{accuracy.toFixed(1)}%</div>
            </div>
          </div>
          <div className="overview-card glass-card">
            <div className="stat-icon-wrapper error">
              <FaTimesCircle className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-label subheading">Incorrect Answers</div>
              <div className="stat-value-large">{incorrectAttempts}</div>
            </div>
          </div>
        </div>

        {totalAttempts > 0 && (
          <div className="quiz-results-section glass-card">
            <h2>Quiz Results Breakdown</h2>
            <div className="quiz-results-content">
              <div className="pie-chart-container">
                <h3 className="subheading">Answer Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(20, 27, 45, 0.95)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '12px',
                        color: 'var(--text)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="quiz-stats-text">
                <div className="quiz-stat-item">
                  <div className="quiz-stat-label subheading">Success Rate</div>
                  <div className="quiz-stat-value" style={{ color: '#10b981' }}>
                    {totalAttempts > 0 ? ((correctAttempts / totalAttempts) * 100).toFixed(1) : 0}%
                  </div>
                </div>
                <div className="quiz-stat-item">
                  <div className="quiz-stat-label subheading">Improvement Needed</div>
                  <div className="quiz-stat-value" style={{ color: '#ef4444' }}>
                    {totalAttempts > 0 ? ((incorrectAttempts / totalAttempts) * 100).toFixed(1) : 0}%
                  </div>
                </div>
                <div className="quiz-stat-item">
                  <div className="quiz-stat-label subheading">Total Scenarios</div>
                  <div className="quiz-stat-value">{totalAttempts}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {topVulnerabilities.length > 0 && (
          <div className="top-vulnerabilities glass-card">
            <h2>Your Top Vulnerabilities</h2>
            <p className="section-description subheading">
              These are the manipulation tactics you're most susceptible to. Focus on these areas to improve your defenses.
            </p>
            <div className="vulnerability-list">
              {topVulnerabilities.map((vuln, idx) => (
                <div key={idx} className="vulnerability-item">
                  <div className="vulnerability-rank" style={{ backgroundColor: getVulnerabilityColor(vuln.value) }}>
                    #{idx + 1}
                  </div>
                  <div className="vulnerability-content">
                    <div className="vulnerability-name">{vuln.fullName}</div>
                    <div className="vulnerability-bar-container">
                      <div 
                        className="vulnerability-bar"
                        style={{
                          width: `${vuln.value}%`,
                          backgroundColor: getVulnerabilityColor(vuln.value)
                        }}
                      />
                    </div>
                    <div className="vulnerability-stats">
                      <span className="vulnerability-score">{vuln.value.toFixed(1)}%</span>
                      <span className={`vulnerability-level ${getVulnerabilityLevel(vuln.value).toLowerCase()}`}>
                        {getVulnerabilityLevel(vuln.value)} Risk
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="charts-section">
          <div className="chart-card glass-card">
            <h3 className="subheading">Vulnerability Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={vulnerabilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  domain={[0, dynamicMax]}
                  tickCount={(dynamicMax / 10) + 1}
                  tick={{ fill: 'var(--text-muted)', fontFamily: 'Outfit' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(20, 27, 45, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    color: 'var(--text)',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'Outfit'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card glass-card">
            <h3 className="subheading">Vulnerability Radar</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(100, 116, 139, 0.2)" />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, dynamicMax]}
                  tickCount={(dynamicMax / 10) + 1}
                  tick={{ fill: 'var(--text-muted)', fontFamily: 'Outfit' }}
                />
                <Radar 
                  name="Vulnerability" 
                  dataKey="value" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(20, 27, 45, 0.95)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    color: 'var(--text)',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'Outfit'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="insights-section">
          <h2>What This Means</h2>
          <div className="insights-grid">
            <div className="insight-card glass-card">
              <FaShieldAlt className="insight-icon" />
              <h4 className="subheading">Understanding Your Profile</h4>
              <p>
                Your vulnerability scores show which types of AI deception you're most susceptible to. 
                Higher scores indicate areas where you need more practice.
              </p>
            </div>
            <div className="insight-card glass-card">
              <FaExclamationTriangle className="insight-icon" />
              <h4 className="subheading">How to Improve</h4>
              <p>
                Focus on scenarios in your high-vulnerability categories. Each correct answer 
                helps reduce your vulnerability score and strengthens your defenses.
              </p>
            </div>
            <div className="insight-card glass-card">
              <FaShieldAlt className="insight-icon" />
              <h4 className="subheading">Building Resilience</h4>
              <p>
                As you complete more scenarios and learn from explanations, your overall 
                accuracy improves and your vulnerability profile becomes more balanced.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrustMirror