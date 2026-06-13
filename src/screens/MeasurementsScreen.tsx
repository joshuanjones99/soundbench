import { NAV_ITEMS } from '../lib/nav'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/measurements')!

const TEST_POINTS = [
  { ref: 'TP201', circuit: 'Power supply +', expected: '+51.0', measured: '—' },
  { ref: 'TP202', circuit: 'Power supply −', expected: '−51.0', measured: '—' },
  { ref: 'TP301', circuit: 'Regulated supply +', expected: '+17.5', measured: '—' },
  { ref: 'TP302', circuit: 'Regulated supply −', expected: '−17.5', measured: '—' },
  { ref: 'TP401', circuit: 'DC offset — left ch.', expected: '0 ± 30mV', measured: '—' },
  { ref: 'TP402', circuit: 'DC offset — right ch.', expected: '0 ± 30mV', measured: '—' },
]

export default function MeasurementsScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will connect to: Schematics · Repair Guides"
    >
      <div className="ph-device-row">
        <span className="ph-device-label">Device</span>
        <span className="ph-device-value">
          Marantz 2270 · <span className="data">2270</span>
        </span>
        <span className="ph-device-section data">Power supply / Output section</span>
      </div>

      <div className="ph-table-wrap" role="region" aria-label="Test-point measurement table">
        <table className="ph-table">
          <thead>
            <tr>
              <th scope="col">Test point</th>
              <th scope="col">Circuit</th>
              <th scope="col">Expected (V)</th>
              <th scope="col">Measured (V)</th>
            </tr>
          </thead>
          <tbody>
            {TEST_POINTS.map((tp) => (
              <tr key={tp.ref}>
                <td className="data">{tp.ref}</td>
                <td>{tp.circuit}</td>
                <td className="data">{tp.expected}</td>
                <td className="data meas-empty">{tp.measured}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlaceholderShell>
  )
}
