import { NAV_ITEMS } from '../lib/nav'
import { IconReceiver, IconTurntable, IconCassette } from '../components/icons'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/dashboard')!

const STATS = [
  { label: 'On the bench', value: '1' },
  { label: 'Fixed this month', value: '2' },
  { label: 'Fix rate', value: '100%' },
]

export default function DashboardScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will draw from: Repair Journal · Equipment · Repair Guides"
    >
      <div className="dash-stats" aria-label="Bench overview stats">
        {STATS.map(({ label, value }) => (
          <div key={label} className="dash-stat">
            <p className="dash-stat-value">{value}</p>
            <p className="dash-stat-label">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="ph-section-heading">On the bench</h2>
        <ul className="dash-activity" aria-label="Active repairs">
          <li className="dash-activity-row">
            <span className="dash-activity-icon" aria-hidden="true">
              <IconTurntable size={22} />
            </span>
            <span className="dash-activity-device">Pioneer PL-12D</span>
            <span className="dash-activity-title">Speed adjustment</span>
            <span className="dash-activity-status">In progress</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="ph-section-heading">Recently completed</h2>
        <ul className="dash-activity" aria-label="Completed repairs">
          <li className="dash-activity-row dash-activity-fixed">
            <span className="dash-activity-icon" aria-hidden="true">
              <IconReceiver size={22} />
            </span>
            <span className="dash-activity-device">Marantz 2270</span>
            <span className="dash-activity-title">Relay cleaning</span>
            <span className="dash-activity-status">Fixed</span>
          </li>
          <li className="dash-activity-row dash-activity-fixed">
            <span className="dash-activity-icon" aria-hidden="true">
              <IconCassette size={22} />
            </span>
            <span className="dash-activity-device">Nakamichi BX-300</span>
            <span className="dash-activity-title">Belt replacement</span>
            <span className="dash-activity-status">Fixed</span>
          </li>
        </ul>
      </section>
    </PlaceholderShell>
  )
}
