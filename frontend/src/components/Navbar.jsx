import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
  }

  return (
    <nav className="app-nav">
      <div className="nav-container">
        <div className="logo">
          <Link to={user?.role === 'STUDENT' ? '/student' : '/teacher'}>
            <img 
              src="https://i.postimg.cc/d1pccNyN/Logo.png" 
              alt="Logo" 
              className="logo-img"
            />
          </Link>
        </div>

        <div className="nav-menu">
          <Link to={user?.role === 'STUDENT' ? '/student/dashboard' : '/teacher/dashboard'}>
            Dashboard
          </Link>
          <Link to={user?.role === 'STUDENT' ? '/student/trust-mirror' : '/teacher/trust-mirror-info'}>
            Trust Mirror
          </Link>
          <Link to="/student/deception-playbook">Deception Playbook</Link>
        </div>

        <div className="nav-user-section" ref={dropdownRef}>
          <button 
            className="nav-user-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img 
              src="https://i.postimg.cc/xTSTkqXM/user.png" 
              alt="User" 
              className="user-avatar"
            />
            <FaChevronDown className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-username">{user?.username || 'User'}</span>
                <span className="dropdown-role">{user?.role?.toLowerCase()}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout">
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar