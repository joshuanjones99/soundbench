import type { ComponentType, SVGProps } from 'react'
import {
  IconDashboard,
  IconEquipment,
  IconSchematic,
  IconGuide,
  IconMeasure,
  IconParts,
  IconJournal,
  IconCommunity,
  IconSettings,
} from '../components/icons'

export interface NavItem {
  path: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
  /** Present on routes that are planned but not built yet. */
  planned?: {
    phase: 1 | 2 | 3
    description: string
  }
}

export const NAV_ITEMS: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: IconDashboard,
    planned: {
      phase: 2,
      description:
        'Your bench at a glance — active repairs, devices waiting on parts, and what to pick up next.',
    },
  },
  {
    path: '/equipment',
    label: 'Equipment',
    icon: IconEquipment,
    planned: {
      phase: 1,
      description:
        'Your device shelf — search by brand and model, pull device profiles, known weak points, and service history.',
    },
  },
  {
    path: '/schematics',
    label: 'Schematics',
    icon: IconSchematic,
    planned: {
      phase: 1,
      description:
        'Upload and view service manuals and schematics, with the suspect circuit highlighted during guided repairs.',
    },
  },
  {
    path: '/guides',
    label: 'Repair Guides',
    icon: IconGuide,
    planned: {
      phase: 1,
      description:
        'Describe symptoms, get a ranked diagnosis with confirming tests, then follow step-by-step repair procedures.',
    },
  },
  {
    path: '/measurements',
    label: 'Measurements',
    icon: IconMeasure,
    planned: {
      phase: 2,
      description:
        'Log test-point voltages and compare them against the service manual’s expected values.',
    },
  },
  {
    path: '/parts',
    label: 'Parts Library',
    icon: IconParts,
    planned: {
      phase: 3,
      description:
        'Parts lists with modern substitutes — cross-referenced caps, transistors, belts, and lamps.',
    },
  },
  {
    path: '/journal',
    label: 'Repair Journal',
    icon: IconJournal,
  },
  {
    path: '/community',
    label: 'Community',
    icon: IconCommunity,
    planned: {
      phase: 3,
      description:
        'Anonymized outcome statistics — see which fixes actually worked for other people with your model.',
    },
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: IconSettings,
    planned: {
      phase: 1,
      description:
        'Skill level (adjusts instruction depth and safety gating), units, and data export.',
    },
  },
]
