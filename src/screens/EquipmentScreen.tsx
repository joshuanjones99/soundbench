import type { ComponentType, SVGProps } from 'react'
import { NAV_ITEMS } from '../lib/nav'
import { IconReceiver, IconTurntable, IconCassette } from '../components/icons'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/equipment')!

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

const DEVICES: {
  icon: Icon
  name: string
  model: string
  deviceClass: string
  repairs: number
}[] = [
  {
    icon: IconReceiver,
    name: 'Marantz 2270',
    model: '2270',
    deviceClass: 'Receiver',
    repairs: 2,
  },
  {
    icon: IconTurntable,
    name: 'Pioneer PL-12D',
    model: 'PL-12D',
    deviceClass: 'Turntable',
    repairs: 1,
  },
  {
    icon: IconCassette,
    name: 'Nakamichi BX-300',
    model: 'BX-300',
    deviceClass: 'Cassette Deck',
    repairs: 1,
  },
]

export default function EquipmentScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will draw from: Repair Journal · Schematics"
    >
      <div className="eq-search">
        <input
          type="search"
          placeholder="Search by brand, model, or device type…"
          disabled
          aria-label="Search equipment (not yet available)"
          className="ph-input-preview"
        />
      </div>

      <ul className="eq-grid" aria-label="Device shelf preview">
        {DEVICES.map(({ icon: Icon, name, model, deviceClass, repairs }) => (
          <li key={model} className="eq-card">
            <span className="eq-card-icon" aria-hidden="true">
              <Icon size={36} />
            </span>
            <div className="eq-card-body">
              <p className="eq-card-name">{name}</p>
              <p className="eq-card-model data">{model}</p>
            </div>
            <div className="eq-card-meta">
              <span className="eq-card-class">{deviceClass}</span>
              <span className="eq-card-count data">
                {repairs} {repairs === 1 ? 'repair' : 'repairs'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </PlaceholderShell>
  )
}
