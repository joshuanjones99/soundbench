import type { SVGProps } from 'react'

/* Hand-drawn line-art set in the drafting style of schematic symbols.
   All icons: 24-unit grid, 1.5 stroke, currentColor, no fills. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

/* ── Navigation ─────────────────────────────────────────────── */

export function IconDashboard(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 19a8 8 0 0 1 16 0" />
      <path d="M12 19 16 9" />
      <path d="M4 19h16" />
    </Base>
  )
}

export function IconEquipment(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="3" y="8" width="18" height="9" rx="1" />
      <circle cx="16.5" cy="12.5" r="2" />
      <path d="M6 11.5h5M6 14h3" />
      <path d="M5 17v2M19 17v2" />
    </Base>
  )
}

export function IconSchematic(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 7h5l3 10 3-10h7" />
      <circle cx="8" cy="7" r="1.2" />
      <circle cx="17" cy="7" r="1.2" />
      <path d="M3 17h4M17 17h4" />
    </Base>
  )
}

export function IconGuide(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L4 16.3a2 2 0 1 0 2.8 2.8l4.9-4.9a4 4 0 0 0 4.9-5.6l-2.6 2.6-2.1-2.1z" />
    </Base>
  )
}

export function IconMeasure(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="11" r="6" />
      <path d="m10 8.5 2 5 2-5" />
      <path d="M8 19.5 6.5 21M16 19.5l1.5 1.5" />
      <path d="M9.5 16.5 8 19.5M14.5 16.5l1.5 3" />
    </Base>
  )
}

export function IconParts(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M2 12h4l1.5-4 3 8 3-8 1.5 4h7" />
    </Base>
  )
}

export function IconJournal(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z" />
      <path d="M5 17a2 2 0 0 1 2-2h11" />
      <path d="M9 8h5" />
    </Base>
  )
}

export function IconCommunity(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="10" r="2.4" />
      <path d="M16 19.5a5 5 0 0 1 4.5-5" />
    </Base>
  )
}

export function IconSettings(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="1.8" fill="var(--bench-white)" />
      <circle cx="15" cy="12" r="1.8" fill="var(--bench-white)" />
      <circle cx="7" cy="17" r="1.8" fill="var(--bench-white)" />
    </Base>
  )
}

/* ── Device classes ─────────────────────────────────────────── */

export function IconReceiver(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="2.5" y="7" width="19" height="10" rx="1" />
      <circle cx="17" cy="12" r="2.2" />
      <path d="M5.5 10.5h7M5.5 13.5h4" />
    </Base>
  )
}

export function IconTurntable(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="2.5" y="6" width="19" height="12" rx="1" />
      <circle cx="10" cy="12" r="3.5" />
      <circle cx="10" cy="12" r="0.5" />
      <path d="M18 8v5l-1.5 2" />
      <circle cx="18" cy="8" r="0.6" />
    </Base>
  )
}

export function IconCassette(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="2.5" y="6" width="19" height="12" rx="1" />
      <circle cx="8.5" cy="11" r="2" />
      <circle cx="15.5" cy="11" r="2" />
      <path d="M10.5 11h3" />
      <path d="M6.5 18l1.5-3h8l1.5 3" />
    </Base>
  )
}

export function IconCD(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" strokeDasharray="2 3" />
    </Base>
  )
}

export function IconAmplifier(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="2.5" y="7" width="19" height="10" rx="1" />
      <circle cx="7.5" cy="12" r="2.5" />
      <path d="M7.5 10.2v1.8l1.2 1" />
      <path d="M13 10h6M13 12.5h6M13 15h3.5" />
    </Base>
  )
}

export function IconSpeakers(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="6.5" y="3.5" width="11" height="17" rx="1" />
      <circle cx="12" cy="8" r="1.8" />
      <circle cx="12" cy="15" r="3" />
      <circle cx="12" cy="15" r="0.5" />
    </Base>
  )
}

/* ── UI glyphs ──────────────────────────────────────────────── */

export function IconPlus(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  )
}

export function IconChevron(p: IconProps) {
  return (
    <Base {...p}>
      <path d="m7 10 5 5 5-5" />
    </Base>
  )
}

export function IconCheck(p: IconProps) {
  return (
    <Base {...p}>
      <path d="m5 13 4.5 4.5L19 7" />
    </Base>
  )
}

export function IconWarning(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 3.5 22 20H2z" />
      <path d="M12 9.5v5" />
      <circle cx="12" cy="17" r="0.5" />
    </Base>
  )
}

export function IconX(p: IconProps) {
  return (
    <Base {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Base>
  )
}

export function IconWrenchSmall(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M13 7a3.5 3.5 0 0 0-4.6 4.4L4 15.8A1.6 1.6 0 1 0 6.2 18l4.4-4.4A3.5 3.5 0 0 0 15 9l-2.2 2.2L11 9.4z" />
    </Base>
  )
}
