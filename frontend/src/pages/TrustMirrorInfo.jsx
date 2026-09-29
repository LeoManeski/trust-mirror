import React from 'react'
import Navbar from '../components/Navbar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts'
import './TrustMirrorInfo.css'

function TrustMirrorInfo() {
  const sourceAnalysisData = [
    { name: 'Transparent', value: 85 },
    { name: 'Consistent', value: 70 },
    { name: 'Accountable', value: 60 },
    { name: 'Anonymous', value: 20 },
    { name: 'Inconsistent', value: 15 }
  ]

  const contentAnalysisData = [
    { name: 'Emotional Pressure', value: 45 },
    { name: 'Sensational Wording', value: 60 },
    { name: 'Urgency Tactics', value: 55 },
    { name: 'Logical Flow', value: 75 },
    { name: 'Evidence Support', value: 80 },
    { name: 'Clarity', value: 70 }
  ]

  const patternDetectionData = [
    { category: 'Source\nTransparency', value: 75, fullMark: 100 },
    { category: 'Content\nLanguage', value: 65, fullMark: 100 },
    { category: 'Context\nCompleteness', value: 70, fullMark: 100 },
    { category: 'Pattern\nRecognition', value: 60, fullMark: 100 },
    { category: 'Evidence\nSupport', value: 80, fullMark: 100 },
    { category: 'Internal\nConsistency', value: 72, fullMark: 100 }
  ]

  const confidenceLevels = [
    { level: 'High Confidence', value: 30, color: '#10b981' },
    { level: 'Moderate Confidence', value: 45, color: '#f59e0b' },
    { level: 'Low Confidence', value: 15, color: '#ef4444' },
    { level: 'Needs Verification', value: 10, color: '#64748b' }
  ]

  return (
    <div className="trust-mirror-info">
      <Navbar />
      <div className="info-container">
        <div className="info-header">
          <h1>How Trust Mirror Works</h1>
          <p className="info-subtitle">
            Understanding the system that helps users assess the reliability of digital information
          </p>
        </div>

        <div className="info-section glass-card">
          <h2>Overview</h2>
          <p>
            Trust Mirror is an application created to help users better understand the reliability of information they encounter online. The motivation behind the system is simple: in a digital environment where content spreads quickly and often without verification, users need practical support in deciding what deserves their trust and what should be approached with caution.
          </p>
          <p>
            Rather than attempting to determine absolute truth, Trust Mirror focuses on how information is presented, where it comes from, and whether it follows recognizable patterns of credible communication. The application acts as a reflective tool, encouraging users to slow down and examine content more carefully instead of reacting immediately.
          </p>
        </div>

        <div className="info-section glass-card">
          <h2>Source Analysis</h2>
          <p>
            When a user submits a piece of content—such as a link, article, or text—the system begins by looking at the source itself. It considers whether the source is transparent, consistent in its publishing behavior, and accountable for the information it shares. Sources that lack authorship, clear ownership, or a stable publishing history are treated with increased skepticism, as these factors often correlate with lower reliability.
          </p>
          <div className="chart-container">
            <h3>Source Reliability Indicators</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  domain={[0, 100]}
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
            <p className="chart-explanation">
              This chart shows how different source characteristics are evaluated. Higher values indicate more reliable indicators.
            </p>
          </div>
        </div>

        <div className="info-section glass-card">
          <h2>Content and Language Analysis</h2>
          <p>
            The next step focuses on the content and language. Trust Mirror examines how the message is written rather than judging the opinion it expresses. Content that relies heavily on emotional pressure, sensational wording, or urgency—especially when not supported by evidence—is flagged as potentially misleading. Logical flow, clarity of claims, and internal consistency are also taken into account during this stage.
          </p>
          <div className="chart-container">
            <h3>Content Quality Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  domain={[0, 100]}
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
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="chart-explanation">
              Content analysis evaluates writing quality, emotional manipulation, and evidence support. Lower scores on manipulation tactics and higher scores on quality indicators suggest more reliable content.
            </p>
          </div>
        </div>

        <div className="info-section glass-card">
          <h2>Context Evaluation</h2>
          <p>
            Context plays an equally important role. Information can be technically correct while still being misleading if it is presented without proper background or if it is taken out of its original timeframe. For this reason, Trust Mirror evaluates whether claims are accompanied by relevant context, references, or indications of when and under what circumstances the information was produced.
          </p>
        </div>

        <div className="info-section glass-card">
          <h2>Pattern Recognition</h2>
          <p>
            Finally, the system looks for recurring patterns commonly associated with misinformation. These include repeated narratives across unrelated sources, oversimplified explanations for complex issues, and framing techniques designed to guide the reader toward a predetermined conclusion. This step is not about identifying falsehoods directly, but about recognizing structural signals that warrant closer examination.
          </p>
          <div className="chart-container">
            <h3>Multi-Factor Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={patternDetectionData}>
                <PolarGrid stroke="rgba(100, 116, 139, 0.2)" />
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: 'var(--text-muted)', fontFamily: 'Outfit' }}
                />
                <Radar 
                  name="Trust Score" 
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
            <p className="chart-explanation">
              The radar chart shows how Trust Mirror evaluates content across multiple dimensions simultaneously. A balanced, well-rounded shape indicates more reliable content.
            </p>
          </div>
        </div>

        <div className="info-section glass-card">
          <h2>Graduated Assessment</h2>
          <p>
            Instead of producing a simple "true" or "false" result, Trust Mirror provides a graduated assessment of confidence, along with explanations that clarify which factors influenced the evaluation. Users are shown what raised concerns, what appeared credible, and where additional verification might be necessary. This transparency is essential, as it allows users to understand the reasoning process rather than blindly accepting the outcome.
          </p>
          <div className="chart-container">
            <h3>Confidence Level Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={confidenceLevels}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
                <XAxis 
                  dataKey="level" 
                  tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'Outfit' }}
                />
                <YAxis 
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
                  radius={[8, 8, 0, 0]}
                >
                  {confidenceLevels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="chart-explanation">
              Trust Mirror provides graduated confidence levels rather than binary true/false judgments, helping users understand the nuance of information reliability.
            </p>
          </div>
        </div>

        <div className="info-section glass-card">
          <h2>Educational Purpose</h2>
          <p>
            From an educational perspective, Trust Mirror is designed to strengthen critical thinking skills over time. By repeatedly exposing users to the same evaluation logic, the system helps them internalize these criteria and apply them independently in future situations. Importantly, the application does not censor content or attempt to control what users read. Its purpose is to inform, not to restrict.
          </p>
        </div>

        <div className="info-section glass-card">
          <h2>Conclusion</h2>
          <p>
            In conclusion, Trust Mirror functions as a structured guide for assessing digital information. It supports users in making reasoned judgments by highlighting relevant indicators of credibility and risk. The value of the system lies not in declaring truth, but in helping users understand the factors that influence trust in the digital space.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrustMirrorInfo

