import { NAV_ITEMS } from '../lib/nav'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/parts')!

const PARTS = [
  {
    ref: 'C201',
    value: '47µF / 63V',
    type: 'Electrolytic',
    original: 'Nippon Chemi-Con',
    substitute: 'Nichicon UHE series',
    notes: 'Direct drop-in',
  },
  {
    ref: 'C401',
    value: '220µF / 35V',
    type: 'Electrolytic',
    original: 'Elna RBP',
    substitute: 'Nichicon FG series',
    notes: 'Direct drop-in',
  },
  {
    ref: 'Q501',
    value: 'NPN BJT',
    type: 'Transistor',
    original: '2SC945',
    substitute: '2N3904',
    notes: 'Verify pinout before fitting',
  },
  {
    ref: 'RY401',
    value: 'DC 12V coil',
    type: 'Relay',
    original: 'JY4-DC12V',
    substitute: 'Omron G5V-2',
    notes: 'Common substitute',
  },
]

export default function PartsScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will connect to: Equipment · Schematics · Repair Guides"
    >
      <div className="ph-device-row">
        <span className="ph-device-label">Device</span>
        <span className="ph-device-value">
          Marantz 2270 · <span className="data">2270</span>
        </span>
      </div>

      <div className="ph-table-wrap" role="region" aria-label="Parts cross-reference table">
        <table className="ph-table">
          <thead>
            <tr>
              <th scope="col">Ref.</th>
              <th scope="col">Value / Rating</th>
              <th scope="col">Type</th>
              <th scope="col">Original</th>
              <th scope="col">Substitute</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {PARTS.map((p) => (
              <tr key={p.ref}>
                <td className="data">{p.ref}</td>
                <td className="data">{p.value}</td>
                <td>{p.type}</td>
                <td className="data">{p.original}</td>
                <td className="data parts-sub">{p.substitute}</td>
                <td className="parts-notes">{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlaceholderShell>
  )
}
