import type { ComponentType, SVGProps } from 'react'
import { NAV_ITEMS } from '../lib/nav'
import { IconReceiver, IconCassette, IconTurntable } from '../components/icons'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/community')!

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

const FINDINGS: {
  icon: Icon
  device: string
  fix: string
  count: number
  total: number
  pct: number
}[] = [
  {
    icon: IconReceiver,
    device: 'Marantz 2270',
    fix: 'Relay cleaning',
    count: 14,
    total: 16,
    pct: 87,
  },
  {
    icon: IconCassette,
    device: 'Nakamichi BX-300',
    fix: 'Belt replacement',
    count: 22,
    total: 24,
    pct: 92,
  },
  {
    icon: IconTurntable,
    device: 'Pioneer PL-12D',
    fix: 'Speed pot cleaning',
    count: 18,
    total: 21,
    pct: 86,
  },
]

export default function CommunityScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will draw from: Repair Journal · Equipment · Repair Guides"
    >
      {/* Featured fix-rate callout */}
      <blockquote className="comm-callout">
        <p className="comm-callout-quote">
          Relay cleaning worked for{' '}
          <strong className="data">14 of 16</strong> fixers on the Marantz 2270.
        </p>
        <cite className="comm-callout-cite data">
          Community outcome data · 87% success rate
        </cite>
      </blockquote>

      {/* Community stats */}
      <div className="comm-stats" aria-label="Community overview stats">
        <div className="comm-stat">
          <p className="comm-stat-value">847</p>
          <p className="comm-stat-label">Models tracked</p>
        </div>
        <div className="comm-stat">
          <p className="comm-stat-value">12,403</p>
          <p className="comm-stat-label">Outcomes logged</p>
        </div>
        <div className="comm-stat">
          <p className="comm-stat-value">78%</p>
          <p className="comm-stat-label">Avg. fix rate</p>
        </div>
      </div>

      {/* Recent findings */}
      <section>
        <h2 className="ph-section-heading">
          Recent findings for your devices
        </h2>
        <ul className="comm-findings" aria-label="Community fix-rate findings">
          {FINDINGS.map(({ icon: Icon, device, fix, count, total, pct }) => (
            <li key={device} className="comm-finding">
              <span className="comm-finding-icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <div className="comm-finding-body">
                <p className="comm-finding-device">{device}</p>
                <p className="comm-finding-fix">
                  {fix} —{' '}
                  <span className="data">
                    {count} of {total}
                  </span>{' '}
                  repaired
                </p>
              </div>
              <div
                className="comm-finding-rate"
                aria-label={`${pct}% success rate`}
              >
                <div className="comm-rate-bar" aria-hidden="true">
                  <div
                    className="comm-rate-fill"
                    style={{ '--pct': `${pct}%` } as React.CSSProperties}
                  />
                </div>
                <span className="data comm-rate-value">{pct}%</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PlaceholderShell>
  )
}
