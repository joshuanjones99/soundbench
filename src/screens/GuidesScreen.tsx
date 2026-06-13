import { NAV_ITEMS } from '../lib/nav'
import { IconWarning } from '../components/icons'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/guides')!

export default function GuidesScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will draw from: Equipment · Schematics · Repair Journal"
    >
      {/* Device + symptom input */}
      <div className="guides-device-row">
        <span className="guides-device-label">Device</span>
        <span className="guides-device-value">
          Marantz 2270 · <span className="data">2270</span>
        </span>
      </div>

      <div className="guides-symptom-group">
        <label className="guides-symptom-label" htmlFor="guides-symptom-preview">
          Symptoms
        </label>
        <textarea
          id="guides-symptom-preview"
          className="guides-symptom-input"
          disabled
          defaultValue="One channel silent. Relay clicks normally on power-up. Left channel output measured at 0V; right channel produces audio. DC protection does not trigger."
          rows={3}
          aria-label="Symptom description (not yet available)"
        />
      </div>

      {/* Ranked diagnosis */}
      <div className="guides-diagnosis" aria-label="Diagnosis preview">
        <h2 className="guides-section-heading">Ranked diagnosis</h2>
        <ol className="guides-results">
          <li className="guides-result guides-result-top">
            <div className="guides-result-rank data">01</div>
            <div className="guides-result-body">
              <p className="guides-result-name">Main relay contacts oxidized</p>
              <p className="guides-result-detail">
                Confirmed by 14 of 16 community repairs with this symptom on the 2270.
                Clean contacts with DeoxIT D5 — typically a 15-min repair.
              </p>
              <div className="guides-confidence">
                <span
                  className="guides-confidence-bar"
                  style={{ '--pct': '87%' } as React.CSSProperties}
                  aria-hidden="true"
                />
                <span className="guides-confidence-value data">87%</span>
              </div>
            </div>
          </li>
          <li className="guides-result">
            <div className="guides-result-rank data">02</div>
            <div className="guides-result-body">
              <p className="guides-result-name">Output transistor Q501 failed</p>
              <p className="guides-result-detail">
                Less common but possible. Check Vbe with DMM before relay cleaning —
                saves disassembly if confirmed.
              </p>
              <div className="guides-confidence">
                <span
                  className="guides-confidence-bar"
                  style={{ '--pct': '11%' } as React.CSSProperties}
                  aria-hidden="true"
                />
                <span className="guides-confidence-value data">11%</span>
              </div>
            </div>
          </li>
        </ol>
      </div>

      {/* Procedure preview */}
      <div className="guides-procedure" aria-label="Procedure preview">
        <h2 className="guides-section-heading">Procedure: Relay cleaning</h2>
        <ol className="guides-steps">
          <li className="guides-step">
            <span className="guides-step-num data" aria-hidden="true">
              1
            </span>
            <div className="guides-step-body">
              <div className="guides-step-hazard" role="note">
                <IconWarning size={16} aria-hidden="true" />
                <span>
                  Unplug and discharge filter caps — wait 2 minutes after power-off
                  before opening the chassis.
                </span>
              </div>
            </div>
          </li>
          <li className="guides-step">
            <span className="guides-step-num data" aria-hidden="true">
              2
            </span>
            <div className="guides-step-body">
              <p>
                Locate main relay RY401 — front-right of PCB, marked on component
                overlay. Apply 1–2 drops DeoxIT D5 to contact gap via straw nozzle.
              </p>
            </div>
          </li>
          <li className="guides-step">
            <span className="guides-step-num data" aria-hidden="true">
              3
            </span>
            <div className="guides-step-body">
              <p>
                Actuate relay 10–15 times by cycling power (with safe discharge time
                each cycle). Test output with DMM on both channels.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </PlaceholderShell>
  )
}
