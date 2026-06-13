import { NAV_ITEMS } from '../lib/nav'
import { PlaceholderShell } from './PlaceholderScreen'

const item = NAV_ITEMS.find((i) => i.path === '/schematics')!

export default function SchematicsScreen() {
  return (
    <PlaceholderShell
      item={item}
      annotation="Will connect to: Repair Guides · Equipment"
    >
      <div
        className="sch-viewer"
        role="img"
        aria-label="Schematic preview: Marantz 2270 input stage fragment"
      >
        <p className="sch-viewer-caption data">
          Marantz 2270 · Input stage · Sheet 3 of 12
        </p>

        <svg
          viewBox="0 0 520 252"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sch-svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="sch-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgb(46 46 46 / 0.07)"
                strokeWidth="0.5"
              />
            </pattern>
            <marker
              id="emitter-arrow"
              markerWidth="6"
              markerHeight="7"
              refX="3"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L6 3.5 L0 7 L1.5 3.5 Z" fill="#2e2e2e" />
            </marker>
          </defs>

          {/* Ruled paper background */}
          <rect width="520" height="252" fill="url(#sch-grid)" />

          {/* ── Input label ── */}
          <text
            x="8"
            y="125"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="10"
            fill="#55534b"
          >
            IN
          </text>
          <line
            x1="28"
            y1="120"
            x2="55"
            y2="120"
            stroke="#2e2e2e"
            strokeWidth="1.5"
          />

          {/* ── C401: coupling capacitor ── */}
          <line x1="55" y1="120" x2="82" y2="120" stroke="#2e2e2e" strokeWidth="1.5" />
          <line x1="82" y1="104" x2="82" y2="136" stroke="#2e2e2e" strokeWidth="2" />
          <line x1="90" y1="104" x2="90" y2="136" stroke="#2e2e2e" strokeWidth="2" />
          <line x1="90" y1="120" x2="130" y2="120" stroke="#2e2e2e" strokeWidth="1.5" />
          <text x="60" y="96" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#55534b">C401</text>
          <text x="57" y="149" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b">47µF/50V</text>

          {/* ── R401: base resistor ── */}
          <line x1="130" y1="120" x2="150" y2="120" stroke="#2e2e2e" strokeWidth="1.5" />
          <rect x="150" y="109" width="40" height="22" stroke="#2e2e2e" strokeWidth="1.5" />
          <line x1="190" y1="120" x2="228" y2="120" stroke="#2e2e2e" strokeWidth="1.5" />
          <text x="152" y="99" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#55534b">R401</text>
          <text x="152" y="149" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b">47kΩ</text>

          {/* ── Q501: NPN transistor ── */}
          {/* Base horizontal */}
          <line x1="228" y1="120" x2="244" y2="120" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* Base vertical */}
          <line x1="244" y1="94" x2="244" y2="146" stroke="#2e2e2e" strokeWidth="2" />
          {/* Transistor circle */}
          <circle cx="262" cy="120" r="27" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* Collector: upper angled line from ~1/3 of base vertical */}
          <line x1="244" y1="103" x2="275" y2="83" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* Emitter: lower angled line with arrowhead at ~2/3 of base vertical */}
          <line
            x1="244"
            y1="137"
            x2="275"
            y2="157"
            stroke="#2e2e2e"
            strokeWidth="1.5"
            markerEnd="url(#emitter-arrow)"
          />
          {/* Collector lead up */}
          <line x1="275" y1="83" x2="275" y2="40" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* Emitter lead down */}
          <line x1="275" y1="157" x2="275" y2="212" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* Q501 labels */}
          <text x="296" y="118" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600" fill="#2e2e2e">Q501</text>
          <text x="296" y="130" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#55534b">2SC945</text>

          {/* ── R402: collector load (vertical) ── */}
          {/* +45V supply */}
          <line x1="275" y1="13" x2="275" y2="22" stroke="#2e2e2e" strokeWidth="1.5" />
          <text x="283" y="12" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#2e2e2e">+45V</text>
          {/* R402 body */}
          <rect x="260" y="22" width="30" height="18" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* Lead from R402 to collector */}
          <line x1="275" y1="40" x2="275" y2="83" stroke="#2e2e2e" strokeWidth="1.5" />
          {/* R402 labels */}
          <text x="296" y="35" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#55534b">R402</text>
          <text x="296" y="45" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b">4.7kΩ</text>

          {/* ── Ground at emitter ── */}
          <line x1="261" y1="212" x2="289" y2="212" stroke="#2e2e2e" strokeWidth="1.5" />
          <line x1="265" y1="219" x2="285" y2="219" stroke="#2e2e2e" strokeWidth="1.5" />
          <line x1="269" y1="226" x2="281" y2="226" stroke="#2e2e2e" strokeWidth="1.5" />
          <text x="296" y="220" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#55534b">GND</text>

          {/* ── Coral annotation callout ── */}
          <rect
            x="344"
            y="62"
            width="163"
            height="106"
            rx="2"
            stroke="#f76f53"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            fill="rgb(247 111 83 / 0.06)"
          />
          {/* Arrow from callout to transistor */}
          <line
            x1="344"
            y1="115"
            x2="295"
            y2="115"
            stroke="#f76f53"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <circle cx="295" cy="115" r="3" fill="#f76f53" />
          {/* Annotation text */}
          <text x="356" y="85" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="600" fill="#f76f53" letterSpacing="0.3">Suspect: Q501</text>
          <text x="356" y="100" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b">check Vbe —</text>
          <text x="356" y="113" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b">expected: 0.62–0.68V</text>
          <text x="356" y="126" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b">measured: 0.31V ⚠</text>
          <text x="356" y="148" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#55534b" fontStyle="italic">annotated 2026-06-10</text>
        </svg>

        <p className="sch-viewer-hint">
          Schematics viewer — upload a service manual PDF or link a page to begin
        </p>
      </div>
    </PlaceholderShell>
  )
}
