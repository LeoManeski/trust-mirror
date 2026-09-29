import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' 
import Navbar from '../components/Navbar'
import './LandingPage.css'

function LandingPage() {
  const { user } = useAuth()
  const isLoggedIn = !!user   

  return (
    <div className="landing-page">
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <nav className="landing-nav">
          <div className="nav-container">
            <div className="logo">
              <img 
                src="https://i.postimg.cc/d1pccNyN/Logo.png" 
                alt="AI Deception Educator" 
                className="logo-img"
              />
            </div>
            <div className="nav-links">
              <Link to="/login" className="link-login">Login</Link>
              <Link to="/register" className="btn-signup">Get Started</Link>
            </div>
          </div>
        </nav>
      )}

      <main className="hero-main">
        <div className="hero-content">
          <h1 className="hero-title">
            Seeing is no longer <span className="accent">believing.</span>
          </h1>
          <p className="hero-subtitle">
            We train students and professors to recognize AI-generated deception. 
            Build critical thinking skills through realistic simulations and 
            personalized vulnerability insights.
          </p>
          <div className="hero-actions">
            <Link to={isLoggedIn ? "/student/dashboard" : "/register"} className="btn-hero-primary">
              {isLoggedIn ? "View Scenarios" : "Go to Scenarios"}
            </Link>
            <Link to={isLoggedIn ? "/student/trust-mirror" : "/register"} className="btn-hero-secondary">
              {isLoggedIn ? "See Trust Mirror" : "Start Learning"}
            </Link>
          </div>
        </div>
        
        <img className="landingImg" src='https://i.postimg.cc/437S9w5j/landingimg.png' alt="Hero Visual" />
      </main>
    </div>
  )
}

export default LandingPage