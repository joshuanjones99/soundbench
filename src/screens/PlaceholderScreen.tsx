import { Link } from 'react-router-dom'
import type { NavItem } from '../lib/nav'
import './placeholder.css'

export function PlaceholderShell({
  item,
  annotation,
  children,
}: {
  item: NavItem
  annotation?: string
  children?: React.ReactNode
}) {
  const Icon = item.icon
  return (
    <article className="ph-screen">
      <header className="ph-header">
        <span className="ph-header-icon" aria-hidden="true">
          <Icon size={28} />
        </span>
        <div className="ph-header-text">
          <h1>{item.label}</h1>
          {item.planned && <p className="ph-desc">{item.planned.description}</p>}
        </div>
        {item.planned && (
          <span className="ph-phase data">Phase {item.planned.phase} · Planned</span>
        )}
      </header>

      {children && <div className="ph-preview">{children}</div>}

      <footer className="ph-footer">
        {annotation && <p className="ph-annotation data">{annotation}</p>}
        <p className="ph-note">
          This screen arrives in Phase {item.planned?.phase}.{' '}
          The <Link to="/journal">Repair Journal</Link> is open now — log what&rsquo;s
          on your bench today.
        </p>
      </footer>
    </article>
  )
}
