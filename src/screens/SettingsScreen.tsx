import { NAV_ITEMS } from '../lib/nav'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/settings')!

export default function SettingsScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Controls safety gating and instruction depth across all screens"
    >
      <div className="sett-form" aria-label="Settings preview (not yet active)">
        {/* Skill level */}
        <section className="sett-section">
          <h2 className="sett-section-heading">Skill level</h2>
          <p className="sett-section-desc">
            Adjusts instruction depth, which repairs are guided vs. flagged, and
            how safety steps are presented.
          </p>
          <fieldset className="sett-fieldset sett-skill" disabled>
            <legend className="visually-hidden">Skill level</legend>
            <label className="sett-skill-option sett-skill-active">
              <input type="radio" name="skill" value="beginner" defaultChecked readOnly />
              <div className="sett-skill-label">
                <span className="sett-skill-name">Beginner</span>
                <span className="sett-skill-desc">
                  Full safety gates, step-by-step instructions, warnings on all
                  mains-side work
                </span>
              </div>
            </label>
            <label className="sett-skill-option">
              <input type="radio" name="skill" value="technician" readOnly />
              <div className="sett-skill-label">
                <span className="sett-skill-name">Technician</span>
                <span className="sett-skill-desc">
                  Safety reminders condensed, standard repair procedure depth
                </span>
              </div>
            </label>
            <label className="sett-skill-option">
              <input type="radio" name="skill" value="expert" readOnly />
              <div className="sett-skill-label">
                <span className="sett-skill-name">Expert</span>
                <span className="sett-skill-desc">
                  Streamlined safety, terse procedures, advanced diagnostic
                  options unlocked
                </span>
              </div>
            </label>
          </fieldset>
        </section>

        {/* Measurement units */}
        <section className="sett-section">
          <h2 className="sett-section-heading">Measurement units</h2>
          <fieldset className="sett-fieldset sett-inline" disabled>
            <legend className="visually-hidden">Measurement units</legend>
            <label className="sett-radio">
              <input type="radio" name="units" value="standard" defaultChecked readOnly />
              Standard (V, Ω, µF, mH)
            </label>
            <label className="sett-radio">
              <input type="radio" name="units" value="metric" readOnly />
              Show all metric prefixes explicitly
            </label>
          </fieldset>
        </section>

        {/* Schematic notation */}
        <section className="sett-section">
          <h2 className="sett-section-heading">Schematic notation</h2>
          <fieldset className="sett-fieldset sett-inline" disabled>
            <legend className="visually-hidden">Schematic notation</legend>
            <label className="sett-radio">
              <input type="radio" name="notation" value="ansi" defaultChecked readOnly />
              ANSI / IEEE (North America)
            </label>
            <label className="sett-radio">
              <input type="radio" name="notation" value="iec" readOnly />
              IEC (Europe / ISO)
            </label>
          </fieldset>
        </section>

        {/* Data export */}
        <section className="sett-section">
          <h2 className="sett-section-heading">Data</h2>
          <div className="sett-actions">
            <button type="button" className="sett-btn" disabled>
              Export repair journal as CSV
            </button>
            <p className="sett-actions-note">
              Exports all journal entries including symptoms, notes, and outcomes.
            </p>
          </div>
        </section>
      </div>
    </PlaceholderShell>
  )
}
