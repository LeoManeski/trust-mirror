import React from 'react'
import Navbar from '../components/Navbar'
import { FaCalendarAlt, FaGlobe, FaExclamationTriangle } from 'react-icons/fa'
import './CaseStudies.css'

function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "The Deepfake CEO Scam",
      date: "2019",
      location: "United Kingdom",
      description: "In 2019, criminals used AI voice cloning to impersonate a CEO and successfully defrauded a UK-based energy firm of $243,000. The scammers used deepfake technology to create a convincing voice that mimicked the CEO's speech patterns, instructing a subordinate to transfer funds urgently.",
      impact: "This case highlighted how AI voice synthesis could be weaponized for financial fraud, demonstrating the need for verification protocols in corporate communications.",
      lessons: "Always verify urgent financial requests through multiple channels, even when the voice sounds authentic."
    },
    {
      id: 2,
      title: "Political Deepfake Videos",
      date: "2018-2020",
      location: "Global",
      description: "Multiple instances of deepfake videos featuring world leaders making false statements have circulated on social media. These manipulated videos have the potential to influence public opinion and create political instability.",
      impact: "These incidents raised concerns about the impact of deepfakes on democratic processes and the spread of misinformation during elections.",
      lessons: "Critical media literacy is essential. Always verify video content through official sources before sharing or believing claims."
    },
    {
      id: 3,
      title: "Celebrity Face Swap Scams",
      date: "2020-2023",
      location: "Worldwide",
      description: "Deepfake technology has been used to create fake endorsements and advertisements featuring celebrities. These manipulated videos have been used to promote fraudulent products and services, misleading consumers.",
      impact: "Victims lost money to scams, and celebrities' reputations were damaged by association with fraudulent content.",
      lessons: "Verify celebrity endorsements through official channels. If something seems too good to be true, it likely is."
    },
    {
      id: 4,
      title: "The Nancy Pelosi Deepfake",
      date: "2019",
      location: "United States",
      description: "A manipulated video of House Speaker Nancy Pelosi was created to make her appear intoxicated by slowing down her speech. The video went viral on social media platforms, spreading misinformation.",
      impact: "This case demonstrated how simple manipulation techniques (not even full deepfakes) can create convincing false narratives that spread rapidly online.",
      lessons: "Simple video manipulation can be just as dangerous as sophisticated deepfakes. Always question content that seems designed to make someone look bad."
    },
    {
      id: 5,
      title: "Romance Scam Deepfakes",
      date: "2021-2024",
      location: "Global",
      description: "Scammers have used AI-generated images and videos to create fake online personas for romance scams. Victims develop emotional connections with entirely fabricated individuals, leading to financial losses.",
      impact: "Thousands of people have been defrauded, losing both money and emotional trust in online relationships.",
      lessons: "Be extremely cautious with online relationships. Video calls don't guarantee authenticity - always meet in person when possible."
    },
    {
      id: 6,
      title: "The Tom Cruise Deepfake",
      date: "2021",
      location: "Social Media",
      description: "A TikTok account gained millions of followers by posting deepfake videos of Tom Cruise performing various activities. While this was entertainment, it demonstrated how convincing deepfakes can be.",
      impact: "This case showed the public how realistic deepfakes have become, raising awareness about the technology's capabilities and potential for misuse.",
      lessons: "Even highly realistic content can be fake. Question everything you see online, especially on platforms where content can be easily manipulated."
    }
  ]

  return (
    <div className="case-studies-page">
      <Navbar />
      <div className="case-studies-container">
        <div className="case-studies-header">
          <h1>Case Studies: Real-World Deepfake Manipulations</h1>
          <p className="header-subtitle">
            Learn from actual incidents where AI-generated deception was used to manipulate, defraud, or mislead people.
            Understanding these cases helps build critical thinking skills to recognize similar tactics.
          </p>
        </div>

        <div className="case-studies-list">
          {caseStudies.map((study) => (
            <div key={study.id} className="case-study-card glass-card">
              <div className="case-study-header">
                <h2>{study.title}</h2>
                <div className="case-study-meta">
                  <span className="meta-item">
                    <FaCalendarAlt /> {study.date}
                  </span>
                  <span className="meta-item">
                    <FaGlobe /> {study.location}
                  </span>
                </div>
              </div>
              
              <div className="case-study-content">
                <div className="case-study-section">
                  <h3>
                    <FaExclamationTriangle className="section-icon" />
                    What Happened
                  </h3>
                  <p>{study.description}</p>
                </div>
                
                <div className="case-study-section">
                  <h3>Impact</h3>
                  <p>{study.impact}</p>
                </div>
                
                <div className="case-study-section lessons">
                  <h3>Key Lessons</h3>
                  <p>{study.lessons}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="case-studies-footer">
          <p>
            <strong>Remember:</strong> These case studies demonstrate the real-world impact of AI deception. 
            By learning from these incidents, you can better protect yourself and others from similar manipulation tactics.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaseStudies
