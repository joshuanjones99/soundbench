export type DeviceClass =
  | 'receiver'
  | 'turntable'
  | 'cassette'
  | 'cd'
  | 'amplifier'
  | 'speakers'

export const DEVICE_CLASS_LABELS: Record<DeviceClass, string> = {
  receiver: 'Receiver',
  turntable: 'Turntable',
  cassette: 'Cassette Deck',
  cd: 'CD Player',
  amplifier: 'Amplifier',
  speakers: 'Speakers',
}

export type EntryStatus = 'in-progress' | 'fixed' | 'not-fixed'

export const STATUS_LABELS: Record<EntryStatus, string> = {
  'in-progress': 'In progress',
  fixed: 'Fixed',
  'not-fixed': 'Not fixed',
}

export interface JournalEntry {
  id: string
  device: string
  model: string
  deviceClass: DeviceClass
  title: string
  symptoms: string
  notes: string
  status: EntryStatus
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'soundbench.journal.v1'

const SEED_ENTRIES: JournalEntry[] = [
  {
    id: 'seed-marantz-2270',
    device: 'Marantz 2270',
    model: '2270',
    deviceClass: 'receiver',
    title: 'Relay cleaning',
    symptoms: 'Left channel dead. Relay clicks on power-up.',
    notes:
      'Cleaned speaker relay contacts with DeoxIT D5. Verified DC offset at speaker terminals: 4 mV L, 6 mV R. Channel back, stable after 1 h burn-in.',
    status: 'fixed',
    createdAt: '2026-05-10T09:30:00.000Z',
    updatedAt: '2026-05-13T16:10:00.000Z',
  },
  {
    id: 'seed-nakamichi-bx300',
    device: 'Nakamichi BX-300',
    model: 'BX-300',
    deviceClass: 'cassette',
    title: 'Belt replacement',
    symptoms: 'Play engages, then transport stops after two seconds.',
    notes:
      'Replaced main drive belt and idler tire. Speed verified against 3 kHz test tape — within 0.3%.',
    status: 'fixed',
    createdAt: '2026-05-08T13:00:00.000Z',
    updatedAt: '2026-05-11T19:45:00.000Z',
  },
  {
    id: 'seed-pioneer-pl12d',
    device: 'Pioneer PL-12D',
    model: 'PL-12D',
    deviceClass: 'turntable',
    title: 'Speed adjustment',
    symptoms: 'Runs roughly 2% fast at 33⅓. Strobe drifts steadily.',
    notes: '',
    status: 'in-progress',
    createdAt: '2026-06-02T10:15:00.000Z',
    updatedAt: '2026-06-02T10:15:00.000Z',
  },
]

export function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      saveEntries(SEED_ENTRIES)
      return SEED_ENTRIES
    }
    return JSON.parse(raw) as JournalEntry[]
  } catch {
    return SEED_ENTRIES
  }
}

export function saveEntries(entries: JournalEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // Storage unavailable (private mode, quota) — the session keeps working in memory.
  }
}

export function createEntry(
  input: Pick<
    JournalEntry,
    'device' | 'model' | 'deviceClass' | 'title' | 'symptoms' | 'status'
  >,
): JournalEntry {
  const now = new Date().toISOString()
  return {
    ...input,
    id: `entry-${now}-${Math.random().toString(36).slice(2, 8)}`,
    notes: '',
    createdAt: now,
    updatedAt: now,
  }
}

export interface JournalStats {
  total: number
  fixed: number
  completed: number
  /** fixed / completed, or null before any outcome is logged */
  fixRate: number | null
}

export function computeStats(entries: JournalEntry[]): JournalStats {
  const fixed = entries.filter((e) => e.status === 'fixed').length
  const completed = entries.filter((e) => e.status !== 'in-progress').length
  return {
    total: entries.length,
    fixed,
    completed,
    fixRate: completed === 0 ? null : Math.round((fixed / completed) * 100),
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
