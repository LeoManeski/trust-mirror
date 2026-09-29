import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './DeceptionPlaybook.css';

const PlaybookSection = ({ title, children, isOpen, onClick }) => (
  <div className={`playbook-tab ${isOpen ? 'active' : ''} glass-card`}>
    <button className="tab-header" onClick={onClick}>
      <div className="tab-title-group">
        <h3>{title}</h3>
      </div>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {isOpen && <div className="tab-content">{children}</div>}
  </div>
);

function DeceptionPlaybook() {
  const [openTab, setOpenTab] = useState(0);

  const toggleTab = (index) => {
    setOpenTab(openTab === index ? -1 : index);
  };

  return (
    <div className="playbook-page">
      <Navbar />
      <div className="playbook-container">
        <div className="playbook-header">
          <h1>The Deception Playbook</h1>
          <p className="subheading">Your guide to spotting AI scams and staying safe online.</p>
        </div>

        <div className="playbook-grid">
          <PlaybookSection 
            title="Gmail & Email Scams" 
            isOpen={openTab === 0}
            onClick={() => toggleTab(0)}
          >
            <p>Email remains one of the most common ways scammers and AI-generated messages reach students. These messages often pretend to come from trusted institutions such as schools, teachers, social media platforms, or popular services like Google and Instagram. Because emails are familiar and often look official, people tend to trust them without thinking critically.</p>
            
            <p>A common tactic is creating a sense of urgency. Messages may claim that your account will be suspended, that you missed an important school notice, or that unusual activity has been detected. The goal is to push you into acting quickly before you have time to question the message.</p>
            
            <div className="playbook-tip">
              <strong>Watch for these red flags:</strong>
              <ul>
                <li>Extra letters, swapped characters, or unusual domain endings in the sender's email address</li>
                <li>Requests for passwords, verification codes, or personal information</li>
                <li>Links that don't match the official website when you hover over them</li>
              </ul>
            </div>
            
            <p>To protect yourself, slow down and inspect the message closely. Ask yourself whether you were expecting this email and whether the tone matches how the sender normally communicates. Hover over any links (without clicking) to see where they actually lead.</p>
            
            <p>If you are unsure, do not respond to the email directly. Instead, verify the message through another channel, such as logging into the official website manually or asking a teacher or trusted adult. Reporting suspicious emails helps protect others as well.</p>
          </PlaybookSection>

          <PlaybookSection 
            title="Deepfake Voice Calls (Fake Relatives or Authority Figures)" 
            isOpen={openTab === 1}
            onClick={() => toggleTab(1)}
          >
            <p>AI-generated voice technology can now convincingly imitate real people, including parents, relatives, teachers, or even school administrators. These calls are designed to create emotional pressure, often by simulating panic, fear, or urgency.</p>
            
            <p>In many cases, the caller claims there is an emergency and demands immediate action. They may say someone is in danger, needs money urgently, or that the situation must remain secret. This emotional pressure is intentional—it reduces your ability to think clearly.</p>
            
            <div className="playbook-tip">
              <strong>One important red flag:</strong> When the caller avoids verification. They may refuse a video call, become aggressive if questioned, or insist that there is no time to double-check the situation.
            </div>
            
            <p>The safest response is to pause. Ask a personal question that only the real person would know, or tell the caller you will call them back. Then contact the real person directly using a phone number you already trust. Never send money, codes, or personal information during a call that feels rushed or emotional.</p>
            
            <p>If a call like this happens, report it to a trusted adult. Even if no harm occurred, sharing the experience helps others learn and stay safe.</p>
          </PlaybookSection>

          <PlaybookSection 
            title="Fake Screenshots & Edited Messages" 
            isOpen={openTab === 2}
            onClick={() => toggleTab(2)}
          >
            <p>Screenshots are often used as "proof" in online arguments, cyberbullying, or social manipulation. However, screenshots are easy to edit or completely fake using AI tools or simple image editing software.</p>
            
            <p>Fake screenshots often lack context. They may show only a small part of a conversation, hide usernames or timestamps, or use unusual spacing and fonts that don't quite match the original app. These details are easy to overlook, especially when emotions are involved.</p>
            
            <div className="playbook-tip">
              <strong>When presented with a screenshot:</strong>
              <ul>
                <li>Resist the urge to immediately believe or share it</li>
                <li>Ask where it came from and whether it can be verified</li>
                <li>A real conversation should exist on the actual platform and be viewable by both participants</li>
                <li>Asking for a screen recording or checking the platform directly can quickly reveal whether the screenshot is real</li>
              </ul>
            </div>
            
            <p>Never spread screenshots that could harm someone without verification. If a screenshot is being used to intimidate, embarrass, or bully, inform a teacher or school authority.</p>
          </PlaybookSection>

          <PlaybookSection 
            title="Deepfake Videos" 
            isOpen={openTab === 3}
            onClick={() => toggleTab(3)}
          >
            <p>Deepfake videos use AI to create realistic footage of people saying or doing things they never did. These videos often spread quickly because video feels more "real" than text.</p>
            
            <p>While some deepfakes have obvious visual flaws, many are convincing at first glance. Subtle signs can include unnatural facial movements, strange lighting, mismatched audio, or emotional expressions that don't align with what is being said. However, not all deepfakes show clear technical errors.</p>
            
            <div className="playbook-tip">
              <strong>A more reliable way to evaluate a video:</strong> Consider context. Ask where the video originated, who shared it first, and why it is appearing now. Important or shocking videos usually come from reputable sources and are reported by multiple outlets.
            </div>
            
            <p>If you cannot find confirmation from reliable sources, assume the video may be manipulated. Do not share it until its authenticity is confirmed.</p>
          </PlaybookSection>

          <PlaybookSection 
            title="Social Media Manipulation (TikTok, Instagram, DMs)" 
            isOpen={openTab === 4}
            onClick={() => toggleTab(4)}
          >
            <p>Social media platforms are designed to trigger strong emotional reactions, which makes them ideal environments for manipulation. AI-generated posts and messages often target fear, anger, excitement, or curiosity to influence behavior.</p>
            
            <p>Manipulative content may claim that "everyone is talking about this" or that you are missing out if you don't act immediately. Fake accounts often have limited posting history, generic usernames, or inconsistent content.</p>
            
            <div className="playbook-tip">
              <strong>Before trusting or sharing content:</strong>
              <ul>
                <li>Check the account's background—look at previous posts, follower interactions, and whether the information appears elsewhere from reliable sources</li>
                <li>Ask yourself who benefits if you believe or share this content</li>
                <li>Taking a moment to pause before reacting can prevent you from being manipulated emotionally</li>
              </ul>
            </div>
          </PlaybookSection>

          <PlaybookSection 
            title="Psychological Manipulation Tactics" 
            isOpen={openTab === 5}
            onClick={() => toggleTab(5)}
          >
            <p>AI-generated scams and misinformation are powerful not because of technology alone, but because they exploit predictable human behaviors. These include trust in authority, fear of missing out, and emotional reactions under pressure.</p>
            
            <p>Authority bias occurs when messages appear to come from experts, teachers, or institutions. Urgency tactics push people to act quickly. Emotional manipulation uses fear, guilt, or sympathy to bypass logical thinking.</p>
            
            <div className="playbook-tip">
              <strong>Defending against these tactics starts with awareness:</strong>
              <ul>
                <li>When you feel a strong emotional reaction, pause and ask why</li>
                <li>Separate what you feel from what you know</li>
                <li>Look for evidence, verify sources, and seek a second opinion when unsure</li>
              </ul>
            </div>
            
            <p>Critical thinking is not about distrusting everything—it's about knowing when to slow down and ask questions.</p>
          </PlaybookSection>
        </div>
      </div>
    </div>
  );
}

export default DeceptionPlaybook;