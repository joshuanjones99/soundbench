import { Link } from 'react-router-dom'
import type { NavItem } from '../lib/nav'
import './placeholder.css'

export default function PlaceholderScreen({ item }: { item: NavItem }) {
  const planned = item.planned
  return (
    <article className="placeholder">
      <div className="placeholder-frame">
        <item.icon size={56} className="placeholder-icon" />
        <h1>{item.label}</h1>
        {planned && (
          <>
            <p className="placeholder-desc">{planned.description}</p>
            <p className="placeholder-stamp data">
              Planned · Phase {planned.phase}
            </p>
          </>
        )}
        <p className="placeholder-note">
          This bench station isn’t wired up yet. The{' '}
          <Link to="/journal">Repair Journal</Link> is open — log what’s on
          your bench today.
        </p>
      </div>
    </article>
  )
}
