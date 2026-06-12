import { useEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../lib/nav'
import './app-shell.css'

function Wordmark() {
  return (
    <NavLink to="/journal" className="wordmark" aria-label="SoundBench home">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5 16h4l2-5 4 10 4-10 2 5h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25.5" cy="16" r="2.2" fill="var(--signal-coral)" />
      </svg>
      <span className="wordmark-text">
        SoundBench
        <span className="wordmark-sub data">repair with knowledge</span>
      </span>
    </NavLink>
  )
}

export default function AppShell() {
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)

  // In the collapsed top-bar layout the nav scrolls horizontally;
  // keep the active item in view when navigating.
  useEffect(() => {
    navRef.current
      ?.querySelector('.nav-link.is-active')
      ?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [location.pathname])

  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="sidebar">
        <Wordmark />
        <nav aria-label="Primary" ref={navRef}>
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link is-active' : 'nav-link'
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  {item.planned && (
                    <span
                      className="nav-planned data"
                      aria-label={`planned for phase ${item.planned.phase}`}
                    >
                      P{item.planned.phase}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="sidebar-motto data">
          Good gear
          <br />
          deserves good care
        </p>
      </header>
      <main id="main" className="shell-main">
        <Outlet />
      </main>
    </div>
  )
}
