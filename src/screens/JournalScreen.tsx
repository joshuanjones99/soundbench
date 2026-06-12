import { useId, useMemo, useRef, useState } from 'react'
import {
  DEVICE_CLASS_LABELS,
  STATUS_LABELS,
  computeStats,
  createEntry,
  formatDate,
  loadEntries,
  saveEntries,
  type DeviceClass,
  type EntryStatus,
  type JournalEntry,
} from '../lib/journal'
import {
  IconAmplifier,
  IconCassette,
  IconCD,
  IconCheck,
  IconChevron,
  IconJournal,
  IconPlus,
  IconReceiver,
  IconSpeakers,
  IconTurntable,
  IconX,
} from '../components/icons'
import './journal.css'

const CLASS_ICONS = {
  receiver: IconReceiver,
  turntable: IconTurntable,
  cassette: IconCassette,
  cd: IconCD,
  amplifier: IconAmplifier,
  speakers: IconSpeakers,
} as const

type StatusFilter = 'all' | EntryStatus
type SortOrder = 'recent' | 'oldest' | 'device'

/* ── New entry form ─────────────────────────────────────────── */

interface FormErrors {
  device?: string
  model?: string
  deviceClass?: string
  title?: string
}

function EntryForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (entry: JournalEntry) => void
  onCancel: () => void
}) {
  const uid = useId()
  const [device, setDevice] = useState('')
  const [model, setModel] = useState('')
  const [deviceClass, setDeviceClass] = useState<DeviceClass | ''>('')
  const [title, setTitle] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [status, setStatus] = useState<EntryStatus>('in-progress')
  const [errors, setErrors] = useState<FormErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!device.trim()) next.device = 'Enter the device make and model name.'
    if (!model.trim()) next.model = 'Enter the model number from the back panel.'
    if (!deviceClass) next.deviceClass = 'Pick the device class.'
    if (!title.trim()) next.title = 'Name the repair, e.g. “Relay cleaning”.'
    return next
  }

  function validateField(field: keyof FormErrors) {
    setErrors((prev) => ({ ...prev, [field]: validate()[field] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus()
      return
    }
    onSubmit(
      createEntry({
        device: device.trim(),
        model: model.trim(),
        deviceClass: deviceClass as DeviceClass,
        title: title.trim(),
        symptoms: symptoms.trim(),
        status,
      }),
    )
  }

  function field(
    name: keyof FormErrors,
    label: string,
    input: React.ReactNode,
  ) {
    const error = errors[name]
    return (
      <div className="field">
        <label htmlFor={`${uid}-${name}`}>{label}</label>
        {input}
        {error && (
          <p className="field-error" id={`${uid}-${name}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  }

  const inputProps = (name: keyof FormErrors) => ({
    id: `${uid}-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-error` : undefined,
    onBlur: () => validateField(name),
  })

  return (
    <form
      ref={formRef}
      className="entry-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="New repair entry"
    >
      <h2>New repair entry</h2>
      <div className="entry-form-grid">
        {field(
          'device',
          'Device',
          <input
            {...inputProps('device')}
            type="text"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            placeholder="Marantz 2270"
          />,
        )}
        {field(
          'model',
          'Model number',
          <input
            {...inputProps('model')}
            type="text"
            className="data"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="2270"
          />,
        )}
        {field(
          'deviceClass',
          'Device class',
          <select
            {...inputProps('deviceClass')}
            value={deviceClass}
            onChange={(e) => setDeviceClass(e.target.value as DeviceClass)}
          >
            <option value="" disabled>
              Choose…
            </option>
            {Object.entries(DEVICE_CLASS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>,
        )}
        {field(
          'title',
          'Repair',
          <input
            {...inputProps('title')}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Relay cleaning"
          />,
        )}
        <div className="field field-wide">
          <label htmlFor={`${uid}-symptoms`}>
            Symptoms <span className="field-optional">(optional)</span>
          </label>
          <textarea
            id={`${uid}-symptoms`}
            rows={2}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="One channel dead; relay clicks on power-up…"
          />
        </div>
        <fieldset className="field field-wide status-choice">
          <legend>Status</legend>
          {(Object.keys(STATUS_LABELS) as EntryStatus[]).map((s) => (
            <label key={s} className="radio">
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
              />
              {STATUS_LABELS[s]}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="entry-form-actions">
        <button type="submit" className="btn btn-primary">
          <IconCheck size={18} />
          Add to journal
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          <IconX size={18} />
          Cancel
        </button>
      </div>
    </form>
  )
}

/* ── Ledger row ─────────────────────────────────────────────── */

function EntryRow({
  entry,
  expanded,
  onToggle,
  onOutcome,
}: {
  entry: JournalEntry
  expanded: boolean
  onToggle: () => void
  onOutcome: (status: EntryStatus) => void
}) {
  const detailId = `detail-${entry.id}`
  const Icon = CLASS_ICONS[entry.deviceClass]
  return (
    <li className="entry">
      <div className="entry-row">
        <span className="entry-icon" title={DEVICE_CLASS_LABELS[entry.deviceClass]}>
          <Icon size={26} />
        </span>
        <button
          type="button"
          className="entry-main"
          aria-expanded={expanded}
          aria-controls={detailId}
          onClick={onToggle}
        >
          <span className="entry-device">{entry.device}</span>
          <span className="entry-title">{entry.title}</span>
        </button>
        <span className="entry-model data">{entry.model}</span>
        <span className={`stamp stamp-${entry.status}`}>
          {STATUS_LABELS[entry.status]}
        </span>
        <span className="entry-date data">{formatDate(entry.updatedAt)}</span>
        <IconChevron
          size={18}
          className={expanded ? 'entry-chevron is-open' : 'entry-chevron'}
        />
      </div>
      <div id={detailId} className="entry-detail" hidden={!expanded}>
        <div className="entry-detail-inner">
          <dl>
            <div className="detail-line">
              <dt>Class</dt>
              <dd>{DEVICE_CLASS_LABELS[entry.deviceClass]}</dd>
            </div>
            <div className="detail-line">
              <dt>Symptoms</dt>
              <dd>{entry.symptoms || '— none recorded'}</dd>
            </div>
            <div className="detail-line">
              <dt>Work log</dt>
              <dd>{entry.notes || '— nothing logged yet'}</dd>
            </div>
            <div className="detail-line">
              <dt>Opened</dt>
              <dd className="data">{formatDate(entry.createdAt)}</dd>
            </div>
          </dl>
          {entry.status === 'in-progress' && (
            <div className="detail-outcome">
              <p>Done with this one? Log the outcome — it feeds your stats.</p>
              <div className="detail-outcome-actions">
                <button
                  type="button"
                  className="btn btn-stamp btn-stamp-fixed"
                  onClick={() => onOutcome('fixed')}
                >
                  <IconCheck size={16} />
                  Fixed
                </button>
                <button
                  type="button"
                  className="btn btn-stamp btn-stamp-not-fixed"
                  onClick={() => onOutcome('not-fixed')}
                >
                  <IconX size={16} />
                  Not fixed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

/* ── Screen ─────────────────────────────────────────────────── */

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>(loadEntries)
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [sort, setSort] = useState<SortOrder>('recent')
  const [formOpen, setFormOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const newEntryBtnRef = useRef<HTMLButtonElement>(null)

  const stats = useMemo(() => computeStats(entries), [entries])

  const visible = useMemo(() => {
    const filtered =
      filter === 'all' ? entries : entries.filter((e) => e.status === filter)
    return [...filtered].sort((a, b) => {
      if (sort === 'device') return a.device.localeCompare(b.device)
      if (sort === 'oldest') return a.createdAt.localeCompare(b.createdAt)
      return b.updatedAt.localeCompare(a.updatedAt)
    })
  }, [entries, filter, sort])

  function update(next: JournalEntry[], message: string) {
    setEntries(next)
    saveEntries(next)
    setAnnouncement(message)
  }

  function handleAdd(entry: JournalEntry) {
    update([entry, ...entries], `${entry.device} added to the journal.`)
    setFormOpen(false)
    setExpandedId(entry.id)
    newEntryBtnRef.current?.focus()
  }

  function handleOutcome(id: string, status: EntryStatus) {
    const target = entries.find((e) => e.id === id)
    update(
      entries.map((e) =>
        e.id === id
          ? { ...e, status, updatedAt: new Date().toISOString() }
          : e,
      ),
      `${target?.device ?? 'Entry'} marked ${STATUS_LABELS[status]}.`,
    )
  }

  const isEmpty = entries.length === 0

  return (
    <article className="journal">
      <p aria-live="polite" role="status" className="visually-hidden">
        {announcement}
      </p>

      <header className="journal-header">
        <div>
          <h1>Repair Journal</h1>
          <p className="journal-tally data">
            {stats.total} {stats.total === 1 ? 'entry' : 'entries'} ·{' '}
            {stats.fixed} fixed
          </p>
        </div>
        {!isEmpty && (
          <button
            ref={newEntryBtnRef}
            type="button"
            className="btn btn-primary"
            onClick={() => setFormOpen((open) => !open)}
            aria-expanded={formOpen}
          >
            <IconPlus size={18} />
            New repair entry
          </button>
        )}
      </header>

      <div className="journal-body">
        <section className="journal-ledger" aria-label="Journal entries">
          {formOpen && (
            <EntryForm onSubmit={handleAdd} onCancel={() => setFormOpen(false)} />
          )}

          {isEmpty ? (
            <div className="journal-empty">
              <IconJournal size={48} />
              <h2>Your bench log starts here</h2>
              <p>
                Every repair you log — what was broken, what you tried, what
                worked — becomes your own searchable service history. Start
                with whatever is on the bench right now.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setFormOpen(true)}
              >
                <IconPlus size={18} />
                Log your first repair
              </button>
            </div>
          ) : (
            <>
              <div className="journal-toolbar">
                <label className="toolbar-control">
                  <span>Status</span>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as StatusFilter)}
                  >
                    <option value="all">All statuses</option>
                    {(Object.keys(STATUS_LABELS) as EntryStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="toolbar-control">
                  <span>Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOrder)}
                  >
                    <option value="recent">Most recent</option>
                    <option value="oldest">Oldest first</option>
                    <option value="device">Device A–Z</option>
                  </select>
                </label>
              </div>

              {visible.length === 0 ? (
                <div className="journal-no-match">
                  <p>
                    No {filter === 'all' ? '' : `“${STATUS_LABELS[filter as EntryStatus]}” `}
                    entries match.
                  </p>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setFilter('all')}
                  >
                    Show all statuses
                  </button>
                </div>
              ) : (
                <ul className="ledger">
                  {visible.map((entry) => (
                    <EntryRow
                      key={entry.id}
                      entry={entry}
                      expanded={expandedId === entry.id}
                      onToggle={() =>
                        setExpandedId((id) => (id === entry.id ? null : entry.id))
                      }
                      onOutcome={(status) => handleOutcome(entry.id, status)}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </section>

        <aside className="journal-rail" aria-label="Repair statistics">
          <section className="rail-panel">
            <h2>Your repair stats</h2>
            <p className="rail-rate data">
              {stats.fixRate === null ? '—' : `${stats.fixRate}%`}
            </p>
            <p className="rail-rate-label">
              {stats.fixRate === null
                ? 'Log an outcome to start your fix rate'
                : 'fix rate across completed repairs'}
            </p>
            <dl className="rail-figures">
              <div>
                <dt>Logged</dt>
                <dd className="data">{stats.total}</dd>
              </div>
              <div>
                <dt>Fixed</dt>
                <dd className="data">{stats.fixed}</dd>
              </div>
              <div>
                <dt>On the bench</dt>
                <dd className="data">{stats.total - stats.completed}</dd>
              </div>
            </dl>
          </section>

          <section className="rail-panel rail-community">
            <h2>Community note</h2>
            {isEmpty ? (
              <p>
                Once you log repairs, outcome stats from other fixers with
                your models will appear here — “this fix worked for 14 of 16
                people” and the like.
              </p>
            ) : (
              <p>
                Relay cleaning worked for <span className="data">14 of 16</span>{' '}
                people who logged this symptom on a Marantz 2270.
              </p>
            )}
            <p className="rail-preview data">Preview · arrives in Phase 3</p>
          </section>
        </aside>
      </div>
    </article>
  )
}
