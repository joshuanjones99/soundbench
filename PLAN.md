# SoundBench — Audio Equipment Repair Assistant

**Working title:** SoundBench (alternatives: Crossover, BenchTone, FixFi)

An end-to-end repair companion for audio gear: pick your device, describe the
symptoms, get a ranked diagnosis, view the schematic with the suspect circuit
highlighted, follow guided repair steps, and log the outcome so the app gets
smarter with every fix.

---

## 1. Target users & devices

**Users:** hobbyist restorers, vintage hi-fi collectors, bench techs, and
first-time fixers. The UI must serve both "I own a multimeter and a scope"
users and "I've never opened a receiver" users — a skill-level setting adjusts
instruction depth and which repairs are recommended vs. flagged as
"take it to a tech."

**Device classes (v1):**

| Class | Common failure domains |
|---|---|
| Receivers / integrated amps | Relays, DC offset, output transistors, dirty pots, lamps |
| Power amps / preamps | PSU caps, bias drift, channel imbalance, scratchy pots |
| Turntables | Belts, speed control, motor caps, tonearm, cartridge wiring |
| Cassette decks | Belts, pinch rollers, idler tires, heads, azimuth |
| CD players | Laser pickup, sled lubrication, belts, spindle motor |
| Speakers | Surrounds (foam rot), crossover caps, voice coils, tweeter diaphragms |

Each class gets a curated **failure-mode library**: symptom → likely causes →
tests → fixes, seeded from service literature and repair-community knowledge,
then refined by real outcome data (see §5).

## 2. Core user flow

```
Select device ──► Describe symptoms ──► Ranked diagnosis ──► Guided repair ──► Log outcome
 (brand/model      (checklist + free     (causes with         (schematic +      (success/fail →
  lookup, photo     text + audio clip     confidence %,        step-by-step      learning loop)
  ID later)         of the problem)       tests to confirm)    + safety)
```

1. **Device selection** — search by brand/model (e.g., "Marantz 2270").
   Pulls device profile: year, topology (e.g., direct-drive vs. belt),
   known weak points, service manual/schematic if available. Unknown models
   fall back to the device-class generic profile.
2. **Symptom intake** — structured checklist per device class ("one channel
   dead", "hum", "speed drift", "eats tapes") plus free text, plus optional
   photo/audio upload (a recording of the hum or the grinding mechanism is
   hugely diagnostic).
3. **Diagnosis** — ranked list of probable causes with confidence, each with
   a cheap confirming test first ("measure DC at the speaker terminals — if
   >50 mV, suspect the output stage") before any soldering.
4. **Guided repair** — step-by-step instructions, parts list with substitutes,
   tools needed, schematic with the suspect section highlighted, test-point
   voltages, and prominent safety interlocks (mains, charged caps, laser).
5. **Outcome logging** — "Did this fix it?" The answer feeds the learning
   system and the user's personal repair journal.

## 3. The diagnosis engine (hybrid, three layers)

**Layer 1 — Structured failure-mode database.** Curated decision trees per
device class and per popular model. Deterministic, explainable, works offline.
Example: *cassette deck, "play button engages then stops"* → idler tire
slipping (most likely on Technics/Pioneer of that era) → belt → reel motor.

**Layer 2 — LLM reasoning with retrieval (RAG).** Free-text symptoms are
embedded and matched against the failure-mode DB, service-manual text, and
past repair sessions. An LLM synthesizes the structured candidates + retrieved
manual excerpts into a conversational diagnosis, asks clarifying questions
("does the hum change when you touch the tonearm?"), and explains *why*.
The LLM proposes; the structured layer and outcome statistics rank.

**Layer 3 — Outcome statistics (the learning loop).** Every confirmed repair
updates per-(model, symptom, fix) success counts. Ranking is Bayesian:

```
score(cause) = prior(cause | device class, model era)
             × P(observed symptoms | cause)          ← from failure-mode DB
             × success_rate(fix | model, symptom)    ← from logged outcomes
```

Cold start uses curated priors; as outcome data accumulates, it dominates.
Diagnoses always show provenance: "confirmed by 14 community repairs on this
model" vs. "based on the service manual."

## 4. Schematics & service documentation

- **Sources:** user-uploaded PDFs, public-domain manuals, and licensed/linked
  archives (HiFi Engine, Elektrotanya-style). ⚠️ Many service manuals are
  still under copyright — v1 strategy is *link or user-upload*, not rehosting,
  plus original redrawn block diagrams for popular models.
- **Smart viewer:** pan/zoom PDF & image viewer with overlay annotations.
  Diagnosis steps deep-link into the schematic ("Q507/Q508, output stage,
  highlighted in red"). Component callouts show expected voltages from the
  manual's test tables.
- **Ingestion pipeline:** OCR + LLM extraction turns uploaded manuals into
  structured data — parts lists, test-point voltages, adjustment procedures,
  board layouts — which feeds both retrieval and the schematic overlay anchors.

## 5. Learning & memory

Two scopes:

- **Personal repair journal** — every session saved: device, symptoms, what
  was tried, what worked, parts used, photos. Searchable ("what did I replace
  in that Sansui last year?").
- **Community knowledge base (opt-in)** — anonymized outcome records
  aggregated into the success-rate statistics above. Moderation/validation:
  an outcome only counts as "confirmed" after the user marks the device still
  working at a 2-week follow-up prompt, which filters out coincidental fixes.

Privacy: outcomes shared opt-in, no PII, photos stay personal unless
explicitly shared.

## 6. Safety (non-negotiable, first-class feature)

Vintage audio gear = mains voltage, large charged capacitors, CD lasers.

- Per-step hazard flags with required acknowledgement before showing
  mains/high-voltage procedures.
- Standing rules injected into every relevant guide: unplug + discharge caps,
  one-hand rule, isolation transformer / dim-bulb tester recommendations.
- Skill gating: novice mode hides live-measurement procedures and recommends
  professional service for hazardous repairs (e.g., tube amp PSU work).

## 7. Architecture & stack

**Recommendation: responsive PWA first** (works on the bench laptop/tablet,
installable, offline-capable for saved manuals), packaged later for app
stores via Capacitor if needed.

```
┌─ Client (React + TypeScript PWA) ───────────────────────────┐
│ Device picker · Symptom wizard · Diagnosis chat ·           │
│ Schematic viewer (pdf.js + canvas overlays) · Repair journal│
│ Offline cache (IndexedDB): saved manuals, active sessions   │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST/JSON + SSE for chat
┌─ API (Node/TypeScript or Python/FastAPI) ───────────────────┐
│ Diagnosis orchestrator (rules + RAG + outcome ranking)      │
│ Manual-ingestion pipeline (OCR → structured extraction)     │
│ Outcome/learning service (Bayesian rank updates)            │
└──────────────────────────────┬──────────────────────────────┘
        ┌──────────────────────┼─────────────────────┐
   PostgreSQL            pgvector (same DB)     Object storage
   devices, sessions,    embeddings of symptoms, (S3/minio):
   failure modes,        manual chunks,          manuals, schematics,
   outcomes, parts       past repairs            user photos
                               │
                         LLM provider (diagnosis chat, manual extraction)
```

**Core data model:**

- `Device` (brand, model, class, year, topology, weak points)
- `Document` (manual/schematic file + extracted structured data + overlay anchors)
- `FailureMode` (device class/model, symptoms, causes, tests, hazard level)
- `RepairProcedure` (steps, parts, tools, safety flags, schematic links)
- `RepairSession` (user, device, symptoms, diagnosis trail, steps taken)
- `Outcome` (session, fix applied, success, confirmed-at-follow-up)

## 8. Build phases

**Phase 1 — MVP (validate the core loop).** One device class done deeply
(receivers/amps — biggest community, best-documented failures). Device picker,
symptom checklist + free text, LLM diagnosis over a hand-curated failure-mode
DB (~50 failure modes), user-uploaded schematic viewer (no overlays yet),
personal repair journal with success/fail logging.

**Phase 2 — Depth.** All six device classes; manual-ingestion pipeline;
schematic overlays + test-point callouts; photo/audio symptom input;
offline mode.

**Phase 3 — The learning flywheel.** Community outcome aggregation, Bayesian
ranking live, follow-up confirmations, "fixed by N people" provenance, parts
cross-reference and substitution database.

**Open questions to settle before Phase 1:**
1. Mobile-native vs. PWA (recommended: PWA — bench use favors big screens).
2. Schematic licensing strategy beyond link/upload.
3. Solo tool vs. community product from day one (affects auth/backend scope).

## 9. Mockups

Generated with gpt-image-2 — see `mockups/`:

1. `01-device-select.png` — home / device selection
2. `02-diagnosis.png` — symptom intake + ranked diagnosis
3. `03-schematic-repair.png` — schematic viewer with guided repair steps
4. `04-repair-journal.png` — repair journal & community success stats
