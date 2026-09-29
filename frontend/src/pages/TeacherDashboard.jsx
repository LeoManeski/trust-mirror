import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { api } from '../services/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { FaUser, FaChartLine, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaEye } from 'react-icons/fa'
import './TeacherDashboard.css'

function TeacherDashboard() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAttempts: 0,
    averageAccuracy: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await api.getStudentProgress()
      setStudents(response.data)
      
      const totalAttempts = response.data.reduce((sum, s) => sum + (s.totalAttempts || 0), 0)
      const totalCorrect = response.data.reduce((sum, s) => sum + (s.correctAttempts || 0), 0)
      const avgAccuracy = response.data.length > 0 
        ? response.data.reduce((sum, s) => sum + (s.accuracy || 0), 0) / response.data.length 
        : 0
      
      setStats({
        totalStudents: response.data.length,
        totalAttempts,
        averageAccuracy: avgAccuracy
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const viewStudentTrustMirror = (studentId) => {
    navigate(`/teacher/student/${studentId}/trust-mirror`)
  }

  const getVulnerabilityData = (profile) => {
    if (!profile) return []
    
    return [
      { name: 'Emotional\nManipulation', value: profile.emotionalManipulationScore || 0, fullName: 'Emotional Manipulation' },
      { name: 'Authority\nBias', value: profile.authorityBiasScore || 0, fullName: 'Authority Bias' },
      { name: 'Urgency\nTactics', value: profile.urgencyTacticsScore || 0, fullName: 'Urgency Tactics' },
      { name: 'Visual\nInconsistency', value: profile.visualInconsistencyScore || 0, fullName: 'Visual Inconsistency' },
      { name: 'Audio\nInconsistency', value: profile.audioInconsistencyScore || 0, fullName: 'Audio Inconsistency' },
      { name: 'Source\nVerification', value: profile.sourceVerificationScore || 0, fullName: 'Source Verification' },
      { name: 'Social\nProof', value: profile.socialProofScore || 0, fullName: 'Social Proof' },
      { name: 'Scarcity', value: profile.scarcityScore || 0, fullName: 'Scarcity' }
    ]
  }

  const getAverageVulnerabilityData = () => {
    if (!students.length) return []
    
    const categories = [
      'emotionalManipulationScore',
      'authorityBiasScore',
      'urgencyTacticsScore',
      'visualInconsistencyScore',
      'audioInconsistencyScore',
      'sourceVerificationScore',
      'socialProofScore',
      'scarcityScore'
    ]
    
    const data = categories.map(category => {
      const scores = students
        .map(s => s.vulnerabilityProfile?.[category] || 0)
        .filter(s => s > 0)
      
      const avg = scores.length > 0 
        ? scores.reduce((sum, s) => sum + s, 0) / scores.length 
        : 0
      
      return {
        name: category.replace('Score', '').replace(/([A-Z])/g, ' $1').trim(),
        value: Math.round(avg),
        fullName: category.replace('Score', '').replace(/([A-Z])/g, ' $1').trim()
      }
    })
    
    const maxValue = Math.max(...data.map(d => d.value), 0)
    const dynamicMax = maxValue === 0 ? 10 : Math.ceil((maxValue + 1) / 10) * 10
    
    return { data, maxValue: dynamicMax }
  }

  const getAccuracyDistribution = () => {
    const ranges = [
      { name: '90-100%', min: 90, max: 100 },
      { name: '80-89%', min: 80, max: 89 },
      { name: '70-79%', min: 70, max: 79 },
      { name: '60-69%', min: 60, max: 69 },
      { name: 'Below 60%', min: 0, max: 59 }
    ]
    
    return ranges.map(range => ({
      name: range.name,
      value: students.filter(s => {
        const acc = s.accuracy || 0
        return acc >= range.min && acc <= range.max
      }).length
    }))
  }

  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6']

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">Loading dashboard...</div>
      </>
    )
  }

  return (
    <div className="teacher-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Teacher Dashboard</h1>
          <p>Monitor your students' progress and track their Trust Mirrors</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students">
              <FaUser />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon attempts">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalAttempts}</div>
              <div className="stat-label">Total Attempts</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon accuracy">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.averageAccuracy.toFixed(1)}%</div>
              <div className="stat-label">Average Accuracy</div>
            </div>
          </div>
        </div>

        {students.length > 0 && (
          <>
            <div className="students-section">
              <h2>Student Trust Mirrors</h2>
              <p className="section-description">Click on any student to view their detailed Trust Mirror profile</p>
              <div className="students-grid">
                {students.map(student => {
                  const profile = student.vulnerabilityProfile
                  const vulnerabilities = getVulnerabilityData(profile)
                  const topVuln = vulnerabilities.length > 0 
                    ? [...vulnerabilities].sort((a, b) => b.value - a.value)[0]
                    : null
                  
                  return (
                    <div 
                      key={student.studentId} 
                      className="student-card glass-card"
                      onClick={() => viewStudentTrustMirror(student.studentId)}
                    >
                      <div className="student-card-header">
                        <div className="student-info">
                          <h3>{student.studentName || 'Unknown'}</h3>
                          <p className="student-email">{student.studentEmail}</p>
                        </div>
                        <button className="view-button">
                          <FaEye />
                        </button>
                      </div>
                      
                      <div className="student-stats">
                        <div className="student-stat">
                          <span className="stat-label-small">Accuracy</span>
                          <span className={`stat-value-small ${(student.accuracy || 0) >= 70 ? 'good' : (student.accuracy || 0) >= 50 ? 'medium' : 'low'}`}>
                            {(student.accuracy || 0).toFixed(1)}%
                          </span>
                        </div>
                        <div className="student-stat">
                          <span className="stat-label-small">Attempts</span>
                          <span className="stat-value-small">{student.totalAttempts || 0}</span>
                        </div>
                        <div className="student-stat">
                          <span className="stat-label-small">Correct</span>
                          <span className="stat-value-small">{student.correctAttempts || 0}</span>
                        </div>
                      </div>
                      
                      {profile && (
                        <div className="vulnerabilities-summary">
                          {topVuln && topVuln.value > 0 ? (
                            <>
                              <div className="top-vulnerability">
                                <span className="vuln-label">Top Vulnerability:</span>
                                <span className="vuln-name">{topVuln.fullName}</span>
                                <div className="vuln-bar-container">
                                  <div 
                                    className="vuln-bar"
                                    style={{ width: `${Math.min(topVuln.value, 100)}%` }}
                                  />
                                </div>
                                <span className="vuln-score">{topVuln.value.toFixed(1)}%</span>
                              </div>
                              {vulnerabilities.filter(v => v.value > 0).length > 1 && (
                                <div className="vuln-count">
                                  <span className="vuln-count-text">
                                    +{vulnerabilities.filter(v => v.value > 0).length - 1} more vulnerability{vulnerabilities.filter(v => v.value > 0).length - 1 !== 1 ? 'ies' : ''}
                                  </span>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="no-vulnerabilities">
                              <span className="vuln-label">No vulnerability data yet</span>
                            </div>
                          )}
                        </div>
                      )}
                      {!profile && (
                        <div className="vulnerabilities-summary">
                          <div className="no-vulnerabilities">
                            <span className="vuln-label">No vulnerability profile yet</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="charts-section">
              <div className="chart-card glass-card">
                <h3>Average Vulnerability by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {(() => {
                    const chartData = getAverageVulnerabilityData()
                    return (
                      <BarChart data={chartData.data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis 
                          domain={[0, chartData.maxValue]}
                          tick={{ fill: 'var(--text-muted)', fontFamily: 'Outfit' }}
                          tickCount={Math.min(6, Math.max(3, Math.floor(chartData.maxValue / 10) + 1))}
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
                    )
                  })()}
                </ResponsiveContainer>
              </div>

              <div className="chart-card glass-card">
                <h3>Most Common Vulnerabilities</h3>
                <ResponsiveContainer width="100%" height={400}>
                  {(() => {
                    const avgData = getAverageVulnerabilityData()
                    const radarData = avgData.data.map(item => ({
                      category: item.name,
                      value: item.value,
                      fullMark: avgData.maxValue
                    }))
                    
                    return (
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(100, 116, 139, 0.2)" />
                        <PolarAngleAxis 
                          dataKey="category" 
                          tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                        />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, avgData.maxValue]}
                          tickCount={Math.min(6, Math.max(3, Math.floor(avgData.maxValue / 10) + 1))}
                          tick={{ fill: 'var(--text-muted)', fontFamily: 'Outfit' }}
                        />
                        <Radar 
                          name="Average Vulnerability" 
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
                    )
                  })()}
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {students.length === 0 && (
          <div className="empty-state">
            <FaUser className="empty-icon" />
            <h3>No Students Yet</h3>
            <p>Students who register with your teacher ID will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherDashboard
