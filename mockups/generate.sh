#!/usr/bin/env bash
set -u
KEY=$(tr -d ' \n' < /home/josh/Projects/Key/OpenAI.txt)
OUT=/home/josh/Projects/audio-repair-app/mockups
STYLE="High-fidelity UI mockup of a tablet web app for repairing vintage audio equipment, app name 'SoundBench'. Aesthetic of a vintage hi-fi service manual reprinted as a clean modern flat app: light warm paper background (hex f2f0e3), near-black ink text (hex 2e2e2e), one coral accent (hex f76f53) used sparingly for primary buttons, selection highlights and key markers only. Warm humanist sans-serif UI typography, monospace type for voltages, part numbers and model numbers, thin dark line-art icons drawn like schematic symbols, flat surfaces separated by thin ink borders, no shadows, no dark mode, no wood or metal textures, no skeuomorphic knobs or VU meters, professional product-design quality, realistic interface details, landscape tablet screen."

gen() {
  local name="$1" prompt="$2"
  curl -sS https://api.openai.com/v1/images/generations \
    -H "Authorization: Bearer $KEY" \
    -H "Content-Type: application/json" \
    -d "$(python3 -c '
import json,sys
print(json.dumps({"model":"gpt-image-2","prompt":sys.argv[1],"size":"1536x1024","quality":"high"}))' "$STYLE $prompt")" \
    -o "$OUT/$name.json"
  python3 - "$OUT/$name.json" "$OUT/$name.png" <<'PY'
import json, base64, sys
with open(sys.argv[1]) as f:
    r = json.load(f)
if "data" in r:
    open(sys.argv[2], "wb").write(base64.b64decode(r["data"][0]["b64_json"]))
    print(f"OK {sys.argv[2]}")
else:
    print(f"ERROR {sys.argv[1]}: {r.get('error', {}).get('message', r)}")
PY
}

gen 01-device-select "Home screen: header with SoundBench wordmark in dark ink, a search bar 'Search brand or model...', a grid of six device category tiles with thin dark line-art icons in schematic-drawing style: Receiver, Turntable, Cassette Deck, CD Player, Amplifier, Speakers — tiles are flat paper panels with thin ink borders, no fills. Below, a 'Recent projects' row showing two entries: 'Marantz 2270 — one channel dead' and 'Technics SL-1200 — speed drift', model numbers set in monospace. A single coral primary button 'New repair' with dark ink text." &
gen 02-diagnosis "Diagnosis screen for a Marantz 2270 receiver: left panel with a symptom checklist (checked: 'Left channel dead', 'Relay clicks on power-up') and a free-text box. Right panel titled 'Probable causes' showing a ranked list like numbered procedure entries in a service manual: 'Dirty speaker relay contacts — 62%', 'DC offset / output stage — 21%', 'Cold solder joint on driver board — 9%', confidence shown as thin coral bars, percentages in monospace, each entry with a 'Run confirming test' text button. The top-ranked cause is highlighted with a coral marker. A chat bubble from the assistant asks 'Does the channel come back if you tap the relay?'." &
wait
gen 03-schematic-repair "Guided repair screen: large schematic circuit diagram viewer in black ink line-work on paper occupying two thirds of the screen, with the section around two output transistors highlighted by a coral outline and a callout 'Q507 / Q508 — expect 0.6V' in monospace. Right sidebar with numbered repair steps like a printed service procedure, a safety warning banner in a distinct deep red with a triangular warning icon and text 'Discharge filter capacitors before proceeding', a parts list with part numbers in monospace, and Prev/Next step buttons — Next is the only coral element, with dark ink text." &
gen 04-repair-journal "Repair journal screen: a ledger-like list of repair entries separated by thin ink rules, each with device name, monospace model number, and a status stamp: 'Fixed' (outlined green stamp) or 'In progress' (outlined gray stamp) — Marantz 2270 relay cleaning — Fixed, Nakamichi BX-300 belt replacement — Fixed, Pioneer PL-12D speed adjustment — In progress. A stats panel showing 'Your fix rate 84%' in monospace, and a community note 'This fix worked for 14 of 16 people with this model'." &
wait
