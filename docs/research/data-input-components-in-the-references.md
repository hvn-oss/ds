# Data Input components in the references

Research for [Data Input components in the references](https://github.com/hvn-oss/ds/issues/57), under the map [hvn visual identity: Data Input components](https://github.com/hvn-oss/ds/issues/51). It covers how Attio (the app reference) and ElevenLabs (a close second) draw the 21 Data Input components, grouped by the map's five design families.

**Gist:** Both apps draw fields as white rounded rectangles with a very quiet outline. Attio's outline is a 6% black inset ring (≈ `#f0f0f0`) on ≈ 32px fields. ElevenLabs uses a slightly stronger grey hairline (≈ `#e5e5e5`–`#ececec`) on taller ≈ 36–40px fields. Labels sit above the field in both apps. Attio's labels are small and muted (≈ 12px); ElevenLabs' are darker (≈ 14px medium). Attio marks focus with a 1px blue border plus a faint blue ring. Errors are plain red text under the field, and Attio also tints the outline red. Neither app wraps an error message in a tinted box. Attio paints checked boxes, radios, switches, selected chips and the selected calendar day blue. ElevenLabs paints the same states near-black. Listboxes reuse the menu panel and often put a borderless search row at the top, so Selector and Typeahead look the same. Filters are built from compact chips: Attio's query builder uses `field ⌄ / operator ⌄ / value` rows, and ElevenLabs uses chip rows with a count badge. Many fields have no visible label: search fields, menu searches, composers, inline table editors and filter values. They rely on a leading icon, the panel they sit in, or placeholder text. The main divergences from the roadmap are ElevenLabs' near-black selection, Attio's fainter-than-token outlines, and the reference error style (plain red text) against hvn's tinted FieldStatus override.

## Sources and method

- **Mobbin** (web screens, fetched 2026-11-19). The full-resolution images were downloaded and examined, not just the metadata. Captures are 1920px wide from a 1440px viewport, so image px ÷ 1.333 gives CSS px. Values marked **≈** come from pixel runs and colour samples on those images (ImageMagick). They are accurate to about ±1–2px and ±2 per colour channel. JPEG and WebP edges blur, so 1px outlines read as 1–2 light pixels, and the sampled colour is lighter than the true CSS value.
- **Earlier audits**, for exact CSS values already gathered: the [Attio visual reference audit](https://github.com/hvn-oss/ds/blob/research/attio-visual-audit/docs/research/attio-visual-audit.md) (Attio's production CSS, including the inset-ring outlines) and the [ElevenLabs visual reference audit](https://github.com/hvn-oss/ds/blob/research/elevenlabs-visual-audit/docs/research/elevenlabs-visual-audit.md). Values quoted from them are cited as such.
- **Format precedent:** [Action components in the references](https://github.com/hvn-oss/ds/blob/research/action-components-in-the-references/docs/research/action-components-in-the-references.md).
- Static screenshots can't show hover or pressed states. Where a state isn't visible in a capture, this brief says so instead of guessing.

### Mobbin items cited

| Ref | Item |
|---|---|
| A1 | [Attio: profile settings (name fields, read-only email, timezone and week selects)](https://mobbin.com/screens/db2dac5a-8b53-41f1-af26-f8e4c6f6bd07) |
| A2 | [Attio: change email modal (focused field, read-only email behind)](https://mobbin.com/screens/cfa99e36-3e89-4fc6-801b-4994eec79707) |
| A3 | [Attio: create integration modal (focused field, optional textarea, avatar upload)](https://mobbin.com/screens/d06eb2b7-297c-4f29-ac09-0da589abf589) |
| A4 | [Attio: edit attribute modal (disabled select, resizable textarea, required `*`, `USD` prefix)](https://mobbin.com/screens/88b9b82a-62bd-439c-9238-8258c05590d3) |
| A5 | [Attio: sign-up error ("Please retry with a company email")](https://mobbin.com/screens/ac927464-727c-43e3-b3c0-a3f838aea01b) |
| A6 | [Attio: temporary password error](https://mobbin.com/screens/751fe160-1220-4018-83cf-16f6a765666c) |
| A7 | [Attio: onboarding with focused first name and placeholders](https://mobbin.com/screens/bb69c3e0-66f2-4ebe-9e12-0998b921713f) |
| A8 | [Attio: onboarding with read-only email and off switch](https://mobbin.com/screens/b4695a89-5374-403c-801e-7fcffe239969) |
| A9 | [Attio: create workspace (handle prefix, billing country select)](https://mobbin.com/screens/0deab833-5c02-434a-9c05-41387ab81efa) |
| A10 | [Attio: billing country combobox open, blue check](https://mobbin.com/screens/e8a73d4a-ff15-414a-92ce-a20bee5652d8) |
| A11 | [Attio: billing country search "uni"](https://mobbin.com/screens/b3de8dcc-ef07-41bb-b595-95c8f0cbc21c) |
| A12 | [Attio: invite rows, email field with inline role select](https://mobbin.com/screens/c4189a36-65e9-4f14-a124-1906921e9900) |
| A13 | [Attio: "How did you hear about us?" chips, "AI" selected](https://mobbin.com/screens/33d4f352-8408-490d-8d3a-2e99cd6a106c) |
| A14 | [Attio: notification settings, checkbox grid, off switch](https://mobbin.com/screens/e1752107-979b-4bda-a376-dd3dea959e38) |
| A15 | [Attio: notification settings, mixed checkboxes](https://mobbin.com/screens/ba3cd502-601b-41d5-81c6-f0bda4e69148) |
| A16 | [Attio: workflow settings, timezone select and on switch](https://mobbin.com/screens/f6b70d77-eff3-4bd1-a41d-d5a8d266b77e) |
| A17 | [Attio: timezone select open with "Search timezones…"](https://mobbin.com/screens/153cd485-a0ae-4486-bf94-03482dec1187) |
| A18 | [Attio: record creation radio cards](https://mobbin.com/screens/d4b7490d-46cb-4e80-ac91-20f4d47c20b3) |
| A19 | [Attio: developer settings (secret field with eye, OAuth switch, disabled fields)](https://mobbin.com/screens/c965c71e-6e18-4fc8-b135-2c50483ce69f) |
| A20 | [Attio: date picker in "Add to list" modal](https://mobbin.com/screens/1280eb3e-4faa-414c-8291-bc0eb2939f81) |
| A21 | [Attio: task date picker with a natural-language field](https://mobbin.com/screens/8e5b7a99-ab82-4d5a-825e-c1a4e0b181f5) |
| A22 | [Attio: meeting calendar with focused calendar panel](https://mobbin.com/screens/611dd8d9-4bcd-4887-b87e-a87e982f1dfe) |
| A23 | [Attio: meeting calendar, unfocused, "Find event…"](https://mobbin.com/screens/5fb07e91-0116-4067-96ff-32adf8d075db) |
| A24 | [Attio: "Add to list" record form](https://mobbin.com/screens/a578c81d-a58c-4c06-ae14-81b6e8ec8bbe) |
| A25 | [Attio: advanced filter popover (query builder)](https://mobbin.com/screens/ed5cf4f2-87e7-4db2-913d-7114c8e07210) |
| A26 | [Attio: report filter pill "Name · contains · enter text…"](https://mobbin.com/screens/fb366705-8f39-4e3f-842d-1bd8645250f2) |
| A27 | [Attio: workflow condition pill and "Limit" number field](https://mobbin.com/screens/f74d8951-c297-47da-807a-5ede55359fe6) |
| A28 | [Attio: visualization select open (search, check, disabled rows, switch)](https://mobbin.com/screens/feef947f-6c8c-442b-8a83-0f2878c43c54) |
| A29 | [Attio: data source select open (search, section labels)](https://mobbin.com/screens/d1f5d5a0-6f08-41a6-b9cf-f17d94ee8acc) |
| A30 | [Attio: inline phone number editor in a table cell](https://mobbin.com/screens/191ac4d4-fbd9-4339-8d2f-737bb3b48eb0) |
| A31 | [Attio: multi-select tag cells in a table](https://mobbin.com/screens/4087fbe2-d9dc-4097-ad39-f8501c937e70) |
| A32 | [Attio: status attribute modal (status tokens, focused name)](https://mobbin.com/screens/3dbe6d91-ff85-489e-8e7f-720f6c3102df) |
| A33 | [Attio: status editor popover](https://mobbin.com/screens/32cedf09-9471-42c9-8059-a6eae8caa64e) |
| A34 | [Attio: import review, value chips with "Invalid domain"](https://mobbin.com/screens/f5298659-136f-47ee-8a1e-80db122bcc0c) |
| A35 | [Attio: empty files tab, drop zone](https://mobbin.com/screens/94231441-24e8-45ba-999f-d9f4bb6da6d2) |
| A36 | [Attio: CSV import drop area](https://mobbin.com/screens/2e782b76-a2a2-4810-8c43-f4a7d80f788d) |
| A37 | [Attio: uploaded CSV file card](https://mobbin.com/screens/8fb27d4a-3bc4-4cc7-be9a-a0d8f51f45fc) |
| A38 | [Attio: inline folder rename](https://mobbin.com/screens/7a561314-128a-4336-aafc-d1f570283204) |
| A39 | [Attio: import history search field](https://mobbin.com/screens/c70f6551-55b5-4b1e-81b7-933f5045ce36) |
| A40 | [Attio: templates modal (borderless search, checkbox rows)](https://mobbin.com/screens/faf9047c-b32f-4186-ab4c-b7da288e82d2) |
| A41 | [Attio: choose record (borderless search)](https://mobbin.com/screens/3d3a3b51-40bb-4201-b526-e69acf4540ba) |
| A42 | [Attio: sign in, email field with leading icon](https://mobbin.com/screens/834847a2-855f-4fc8-9928-0c5febadc42e) |
| A43 | [Attio: notification modal (helper text, channel search, failed load)](https://mobbin.com/screens/f2f0b06d-5c2d-42a3-9906-1cb06a14e4eb) |
| A44 | [Attio: view picker with focus ring](https://mobbin.com/screens/f85654c3-a89c-444e-bdf4-7ba40c3118f4) |
| A45 | [Attio: create task (borderless title, "Create more" switch)](https://mobbin.com/screens/f2c03bd6-d24e-4e77-8460-f358be03af3a) |
| A46 | [Attio: webhook modal ("Search events" + "Add")](https://mobbin.com/screens/b9d71482-af9f-4b0f-a470-1bfe69e3bb29) |
| A47 | [Attio: object settings ("/" slug prefix, disabled slug field)](https://mobbin.com/screens/db0ba54b-3c24-4b83-adfd-ebfff84a5ec3) |
| A48 | [Attio: timezone search "singapore"](https://mobbin.com/screens/4bade38d-4fff-4d72-adc9-cd22dfbeec16) |
| A49 | [Attio: workflow prompt composer ("Describe your workflow…")](https://mobbin.com/screens/783bd942-a024-4d6f-b599-0800fffba981) |
| E1 | [ElevenLabs: "Update Given Name" modal](https://mobbin.com/screens/d53c5568-a11c-42e1-898a-ef93ed794e78) |
| E2 | [ElevenLabs: sign in, "Unable to sign in"](https://mobbin.com/screens/daa2e164-69bd-401b-9c95-b1a38c9ce72f) |
| E3 | [ElevenLabs: create account (password with eye, disabled "Sign up")](https://mobbin.com/screens/e4d1bef5-cec6-4fae-87b1-6428ace78c11) |
| E4 | [ElevenLabs: add webhook endpoint (textarea, checked boxes with descriptions)](https://mobbin.com/screens/ea3ea8cf-83c9-441b-86ac-370ef3d51b8e) |
| E5 | [ElevenLabs: create a dub (selects, drop zone, checkboxes, time fields)](https://mobbin.com/screens/fc605526-6d01-435f-aaa3-f1cb55e5adf6) |
| E6 | [ElevenLabs: create a dub with an uploaded file](https://mobbin.com/screens/eba9b189-7e97-4650-9455-03ccf046a350) |
| E7 | [ElevenLabs: select integration tool (checkbox list, Select All)](https://mobbin.com/screens/d407ae0c-c750-456f-9f9f-6ffb905e61fa) |
| E8 | [ElevenLabs: professional voice clone form](https://mobbin.com/screens/edf88013-a65a-41d7-b7d0-5a8024bdc9f2) |
| E9 | [ElevenLabs: ElevenReader distribution details (date field, required `*`)](https://mobbin.com/screens/a75f9fc5-f646-49bf-9849-11cb00479502) |
| E10 | [ElevenLabs: Zendesk credentials (helper text, error banner)](https://mobbin.com/screens/e37ce067-3ae6-4212-81b0-5d65968f8fa5) |
| E11 | [ElevenLabs: import phone number (country code, switch in a card)](https://mobbin.com/screens/f7bc7ebc-bcbf-4da3-9185-8adbc6589201) |
| E12 | [ElevenLabs: simulation test form (number field, switch, textareas)](https://mobbin.com/screens/e57e8ab1-9b79-4c5f-9612-f64f22c27193) |
| E13 | [ElevenLabs: Voice Changer settings (three sliders, switches, select)](https://mobbin.com/screens/d11d2dbd-cc82-4092-8a9b-b956c5ef21b1) |
| E14 | [ElevenLabs: Text to Speech settings (stability slider, switch)](https://mobbin.com/screens/fe8dcb43-f770-4ade-894d-0e187d80b874) |
| E15 | [ElevenLabs: date range picker, "Last week"](https://mobbin.com/screens/341306a0-1ec2-4cca-adf3-b6b924bffd6c) |
| E16 | [ElevenLabs: date range picker, custom range](https://mobbin.com/screens/dca603f3-4beb-4a71-8e63-42baaef3584d) |
| E17 | [ElevenLabs: application language listbox](https://mobbin.com/screens/fa6fce5c-2cb1-487a-90a1-ef0800ad72eb) |
| E18 | [ElevenLabs: voice reference combobox (search, groups)](https://mobbin.com/screens/e6f4cf81-fdda-433b-abe0-fb50ae2d5747) |
| E19 | [ElevenLabs: voice library search, "Filters 4", language filter search](https://mobbin.com/screens/de732e7c-968c-427f-a21b-28155bca9b82) |
| E20 | [ElevenLabs: files search, "+ Owner" filter, upload tray](https://mobbin.com/screens/dd75bcbc-6cee-4cd1-b9ca-46b600ef692f) |
| E21 | [ElevenLabs: workspace resources (type select, ID search, checkbox list)](https://mobbin.com/screens/f2c44d82-46ba-45e2-833e-87583f5aa68b) |
| E22 | [ElevenLabs: Voice Isolator history search](https://mobbin.com/screens/e9656d33-af90-4c82-88ab-e44a58f50ff1) |
| E23 | [ElevenLabs: agent system prompt composer](https://mobbin.com/screens/ed66c02b-8a0c-404c-b1bb-53af89f87dda) |
| E24 | [ElevenLabs: Voice Remixing composer](https://mobbin.com/screens/fe12f1da-b83b-4bc2-9950-61f3630e076c) |
| E25 | [ElevenLabs: script popover textarea](https://mobbin.com/screens/0b993301-6937-416a-996e-e02bbdfbf860) |
| E26 | [ElevenLabs: create collection (icon picker + name field)](https://mobbin.com/screens/e3633146-6155-4615-a361-710ec2389b9b) |
| E27 | [ElevenLabs: Audio Native colour fields](https://mobbin.com/screens/f68b6399-630a-4dd8-85ae-f6a5e2e5911d) |
| E28 | [ElevenLabs: manage collections select](https://mobbin.com/screens/cc29f86d-72a2-458b-916d-b3f79bfb0862) |
| E29 | [ElevenLabs: "Add URL" modal (folder select with badge)](https://mobbin.com/screens/fc9580c2-dc97-44b6-8065-727c69056018) |

## Text fields (TextInput, TextArea, NumberInput, InputGroup, Field)

### The field shell

| | Attio | ElevenLabs |
|---|---|---|
| Height | **≈ 32px** in settings, modals and onboarding (A1, A3, A5). Selects are the same height or 1–2px shorter (A1). Inline table editors fit the ≈ 34px row (A30). | **≈ 36–38px** in modals and forms (E1, E12). **≈ 40px** on sign in (E2). Compact selects in settings rows ≈ 32px (E5 "Detect"). |
| Fill | White. A few borderless fields sit on a light grey fill instead ("Find event…", A23). | White. Composers sit on a white card with a hairline and a soft shadow (E23, E24). |
| Outline | **Very quiet.** Drawn as `box-shadow: inset 0 0 0 1px #0000000f` (6% black, CSS per the Attio audit), sampled ≈ `#f0f0f0`–`#f5f5f5`. On white this is about 1.1:1. | A grey hairline, sampled ≈ `#dcdcdc`–`#ececec`, with the bottom edge 1–2 steps darker, a hint of a 1px drop shadow (E1, E12). Stronger than Attio's, still well below 3:1. |
| Radius | 6–8px (Attio audit). | ≈ 8px. |
| Text | ≈ 13–14px, near-black value. Placeholder ≈ `#a2a4a7` with a trailing "…" ("Enter your first name…", "Set Priority…"; A7, A24). | ≈ 14px. Placeholder mid-grey ("hh:mm:ss", "Easy to identify name of the phone number"; E5, E11). |
| Leading icon | Common: mail, key, search, currency glyphs (A42, A6, A39). | Search fields only (E20, E22). |

### Label, description and helper text (Field)

- **Attio:** the label sits above the field, ≈ 12px, medium weight and **muted** grey ("First Name", "Workspace name"; A1). "(optional)" follows the label in lighter grey ("Description (optional)", A3). Required fields add `*` after the label ("Currency *", A4). Helper text goes **below** the field in ≈ 12px muted text ("Channel is notified each time an entry is added", A43; "We support PNGs, JPEGs and GIFs under 10MB", A3).
- **Attio settings rows** put a label and a muted description on the left and the control on the right, for selects and switches ("Workflow timezone", "Get notified when this workflow fails"; A16, A14).
- **ElevenLabs:** the label is darker and larger, ≈ 14px medium near-black ("New given name", "Email"; E1, E2). The description goes **between the label and the field** ("This is how your voice will appear in the Voice Library"; E8, E9). Helper text can also go below ("Your Zendesk account email", E10). Required fields get a **red** `*` and a "* Required fields" note (E9). Some labels have a dotted underline that marks a tooltip ("Stability", "Number of speakers"; E13, E5).
- **Label-row actions (ElevenLabs):** the label row can carry a trailing link or badge ("Forgot your password?", "Last used"; E2) or "Best practices ↗" (E14).

### States

- **Focus (Attio):** a 1px blue border replaces the grey outline, plus a faint blue outer ring about 1px wide (sampled ≈ `#5c78b7` edge with a `#9fbcfb` halo; A3, A7, A2). The CSS focus outline is `inset 0 0 0 1px #266df0` with a 40% blue ring (Attio audit). The same ring appears on a focused calendar panel (A22), a focused view picker (A44) and an inline cell editor (A30).
- **Focus (ElevenLabs):** not seen in any capture. No field in the set shows a blue or dark focus outline.
- **Error (Attio):** the outline turns a **light red** (sampled ≈ `#dfc2c1`, still faint) and a ≈ 12px red message sits directly under the field with no icon ("Please retry with a company email", A5). Sometimes only the message changes and the outline stays grey ("Please enter a valid temporary password", A6). The message is plain text, with **no tinted background**.
- **Error (ElevenLabs):** a red message with a leading warning-triangle icon below the field group ("Unable to sign in", sampled red ≈ `#a44642` through anti-aliasing; E2). The fields themselves keep their grey outline. Form-level failures use a light-red banner with an icon and two lines ("Connection failed", E10).
- **Read-only (Attio):** muted grey text with the outline almost gone (≈ `#fcfbfc`), so the value reads as plain text in the field's position ("alexsmith@content-mobbin.com", A1, A8). Attio's pending email field works the same way (A1).
- **Disabled:** Attio keeps the outline and mutes the text and icon ("Type: Currency" select, A4; "Client ID" and "Client secret", A19). ElevenLabs' disabled filter chip mutes to light grey ("Accent", E19). Neither app uses a grey fill for disabled fields.
- **Warning and success field states:** not seen in either app.

### TextArea

- Both apps draw textareas with the same outline and radius as the field, with a **resize grip** at the bottom right ("Description (optional)"; A4, E4). Default height is about 2–3 lines.
- Prompt composers are a bigger pattern: a card holding a borderless textarea plus a footer toolbar of chips, a switch, a counter and a send button ("System prompt" with "Default personality" switch, E23; Voice Remixing, E24; Attio's "Describe your workflow…", A49). These are layout examples, not TextArea variants.

### NumberInput

- **No steppers in either app.** Numbers are plain fields ("Limit 100", A27; "Maximum conversation turns 5", E12).
- Units and currencies sit inside the field as a muted prefix ("USD Set Estimated contract value…", A24; "USD Set a default value…", A4).

### InputGroup

- **Attio** puts muted prefix text inside the field with no divider ("app.attio.com/" before the handle, A9; "/" before the slug, A47). Trailing selects also sit inside the field: the invite row is an email field with a borderless "Member ⌄" select at its right end (A12). A secret field has a leading eye toggle inside the field and a trash button outside it (A19).
- **ElevenLabs** places the country-code select ("🇺🇸 +1 ⌄") as a **separate box** about 8px from the number field, not joined (E11). Colour fields put a round swatch inside the field before the hex value (E27). The collection icon picker is a separate small select beside the name field (E26). The password eye toggle is a trailing icon inside the field (E2, E3).
- Neither app draws joined segments with a shared border between them.

## Choice controls (CheckboxInput, CheckboxList, RadioList, Switch)

| | Attio | ElevenLabs |
|---|---|---|
| Checkbox size | **≈ 16px**, ≈ 4px radius (A14). | ≈ 16–18px, ≈ 4px radius (E4). |
| Checked | **Blue fill**, sampled ≈ `#3b6ae4` (CSS `#266df0`), white check (A14). | **Near-black fill** ≈ `#252525`, white check (E4, E6). |
| Unchecked | A 1px outline so faint it nearly vanishes (sampled ≈ `#e4e4e4`; A15). One unchecked box shows a 1px blue outline, probably hover or focus (A15). | White with a light hairline and a faint shadow (E5, E7). |
| Radio | Selected is a blue disc with a white centre dot. Unselected is a hairline circle (A18). | Not seen. |
| Switch size | ≈ 28 × 16px, white thumb inset ≈ 1–2px (A16). | ≈ 34 × 18px (E13). |
| Switch on | **Blue track** ≈ `#236ef0` (A16, A14 "Email Watermark"). | **Near-black track** ≈ `#111111` (E13 "Speaker boost", E23 "Default personality"). |
| Switch off | Light grey track, white thumb (A8, A14, A28). | Light grey track, white thumb (E13, E14, E11). |

**Rows and lists:**

- **Settings rows (both apps):** label plus description on the left, switch or checkbox on the right edge ("Daily digest", A14; "Remove Background Noise" is the exception, with the switch left of its label, E13).
- **Checkbox grid (Attio):** a notifications matrix with one checkbox per channel column under icon headers ("Email", "App"; A14, A15).
- **Checkbox with description (ElevenLabs):** box on the left, a medium label, and a muted description line indented under the label (E4, E5). Lists can sit in a bordered box with "Select All / Deselect All" text actions in the header (E7). A header checkbox with a count selects all ("Voices (7)", E21).
- **Checkbox at the trailing edge (Attio):** filter lists in modals put the checkbox at the right end of each row (templates "Use cases", A40).
- **Radio cards (Attio):** each option is a bordered card with an icon tile, title, badge ("Recommended") and description. The radio sits at the right. The selected card gets a **blue 1px border and a pale blue ring** (A18).
- **Chip choice (Attio onboarding):** a wrap of small ≈ 26–28px chips with a leading icon. Each is an 8px rounded rectangle with a hairline and a faint raised shadow. Selected chips turn **solid blue with white text** ("AI"). Selecting "AI" reveals a follow-up field ("Which engine?"; A13). This behaves as a multi-choice list drawn as chips.

## Selectors and search (Selector, MultiSelector, Typeahead, Tokenizer, PowerSearch)

### Trigger

- **Attio:** the Selector trigger is the field shell: white, the same faint outline, value on the left, a small `⌄` chevron on the right (A1, A9, A16). Values can carry a leading icon or status dot ("Companies" with an object icon, A29; "● Prospecting", A24). Inline triggers inside toolbars and filters are compact ≈ 24–28px chips (A25).
- **ElevenLabs:** the same shape at ≈ 32–38px, with `⌄` on the right ("Detect", "Spanish", "MP3 (128kbps)"; E5, E13). Some triggers use an up-down `⇕` chevron instead ("Young Me", "Don't add to any collection"; E24, E28). Values can include a badge ("Knowledge Base `Current`", E29) or a flag (E17).

### Listbox panel

- Both apps reuse their menu panel: white, rounded, ring and soft shadow, ≈ 28–32px rows (see the [Action references](https://github.com/hvn-oss/ds/blob/research/action-components-in-the-references/docs/research/action-components-in-the-references.md)).
- **Search row at the top.** Most Attio selects open with a borderless search input ("Search…", "Search timezones…"), a leading magnifier and a hairline beneath (A10, A17, A28, A29). The trigger stays visible above the panel. ElevenLabs' voice and language pickers do the same ("Search for a voice…", E18; the language filter, E19).
- **Selected option:** Attio uses a **blue filled check-circle** at the trailing edge ("Singapore", "Bar"; A10, A28). ElevenLabs uses a black `✓` at the trailing edge ("English", E17).
- **Highlight:** a rounded inset grey fill on the active row, in both apps (A11, E18, E19).
- **Groups:** small muted uppercase section labels in Attio ("OBJECTS", "LISTS"; A29), and sentence-case labels in ElevenLabs ("Recent", "Professional", "Cloned"; E18).
- **Disabled options:** muted text and icon, with a footer note explaining why (A28).
- **Empty or error:** the panel shows a centred icon, a bold line and a muted line ("Failed to load Slack channels", A43).
- **Trailing metadata:** ElevenLabs rows end in a grey pill ("English", "+2 more"; E18).

### Typeahead (search as you type)

- **Attio:** typing filters the list in place and the first match is highlighted ("uni" → "United Kingdom", A11; "singapore" → one row, A48). The search field lives in the panel, not the trigger, so Typeahead and a searchable Selector look the same.
- **ElevenLabs:** the language filter opens a small panel whose first row is the typed query ("eng") above the matches (E19).

### MultiSelector and Tokenizer

- **Table cells (Attio):** multi-value attributes render as **coloured tag chips** in a row, truncated at the cell edge ("B2B", "B2C", "SAAS"; A31). These use categorical tints, not blue.
- **Status field (Attio):** tokens are a coloured dot plus a label, with no chip background, on one line inside an outlined field ("● New Lead ● In Progress …"; A32). Editing opens a popover list with drag handles, a coloured check-circle per status, a row menu and "+ Add status" (A33).
- **Chip editor (Attio import):** each value is a blue chip. An invalid value is a red chip ("Invalid domain"), and the popover lists values with remove `×` buttons and "+ Add domain" (A34).
- **Free-entry list (Attio):** "Search events" field plus an "Add" button beside it (A46). Invite rows add one field per email, with "+ Add more" (A12).
- ElevenLabs shows no tokenizer field. Its multi-choice inputs are checkbox lists (E7, E21).

### PowerSearch and query builders

- **Attio's advanced filter** is a floating popover of condition rows. Each row is: a muted `Where` / `And ⇄` conjunction box → a field chip with attribute icon (`Name ⌄`, `Primary lo… › Coun… ⌄`) → an operator chip (`contains ⌄`, `is ⌄`) → a value field or value select (`United States of America ⌄`) → a trailing `⋮` row menu. "+ Add filter" and "Clear all filters" sit beneath. Chips are ≈ 24px (A25).
- **Collapsed condition pill (Attio):** one bordered pill divided by hairlines into segments: `Name | contains | enter text… | ⋮` (A26), or `Description | contains | product design | ⋮ | +` (A27). The value segment is an **unlabelled inline field** with placeholder text.
- **Toolbar filters (Attio):** the view toolbar's "Filter" chip and "Advanced filter 3" count chip (see the Action references).
- **ElevenLabs filters** are a chip row: dropdown chips ("Language ⌄", "Accent ⌄", disabled until a language is chosen), category chips with icons, a "Filters" button with a black count badge ("4"), and "+ Owner" (E19, E20). The dashboard uses label-plus-value chips ("Date Range  Last week ⌄", "Granularity  Day ⌄"; E15).

## Date and time (Calendar, DateInput, DateRangeInput, DateTimeInput, TimeInput)

| | Attio | ElevenLabs |
|---|---|---|
| Panel | Menu panel, one month. Header "‹ August ›" on the left and the year on the right (A20, A21). | Menu panel with a preset list on the left, two months side by side, Start and End fields above, and a footer (E15, E16). |
| Weekday row | Single letters (M T W …) in muted text, Monday first (A20). Two letters (Mo Tu …) in a larger calendar (A22). | Two letters, Sunday first (E15). |
| Day cell | ≈ 30px square on a ≈ 32px pitch, ≈ 13px numerals. | ≈ 30px square on a ≈ 30px pitch. |
| Selected day | **Blue filled rounded square** (≈ 8px radius), white numeral (A20, A21, A22). | **Near-black filled rounded square** ≈ `#111827`, white numeral (E15). |
| Today | Blue numeral with a small blue dot beneath (A20). | Not marked. |
| Outside days | Muted grey numerals (A20). | Muted grey numerals, shown in the grey band when inside the range (E15). |
| Range | Not seen. | Days between the endpoints sit on a **continuous light grey band** (≈ `#f5f5f5`) with square inner edges. The endpoints are the dark rounded squares (E15, E16). |
| Events | Small coloured dots under days that have events (A22, A23). | Not seen. |
| Nav buttons | Ghost chevrons. The focused previous-month button shows the blue focus ring (A20). | Outlined square chevron buttons at the outer corners (E15). |
| Shortcuts | Small outlined chips with icons under the grid: "Today", "Tomorrow", "Next week", "No date" (A20, A21). | A preset list ("Last 15 minutes" … "Last week ✓" … "Month", "Year") with a black check on the active preset. The footer shows the range summary ("Mar 21, 2026 → Apr 2, 2026") and a black "Apply" (E15, E16). |
| Typed entry | A natural-language field at the top of the panel ("Next Tuesday…" with a `↵` hint), focused with the blue ring (A21). | Start and End fields hold full date-times ("03/26/2026, 06:59 AM"; E15). |
| DateInput trigger | Formatted text in a field ("Aug 22, 2024"; A24) or a ghost chip with a calendar icon ("Today", A21/A45). | The browser's native date field with a calendar icon (E9). |
| TimeInput | Not seen. | Plain fields with "hh:mm:ss" placeholders, paired for a range (E5, E6). |

## Slider and FileInput

### Slider (ElevenLabs only; Attio shows none)

- A thin **≈ 4px** track. The filled part is near-black (≈ `#131b26`) and the rest light grey (≈ `#e4e4e6`). Track ends are rounded (E13, E14).
- The thumb is a **≈ 12px solid dark disc** with no border, ring or shadow (E13).
- The label sits above, with a dotted underline for a tooltip. Min and max captions sit at the two ends of the track in muted ≈ 12px text ("More variable" … "More stable", "Low" … "High", "None" … "Exaggerated"). No current-value readout and no ticks (E13, E14).
- Sliders are stacked about 40px apart in a settings side panel, with "Reset values" below (E13).

### FileInput

- **Drop zone (ElevenLabs):** a full-width box with a **dashed hairline** border and ≈ 12px radius, containing an icon tile on the left and two lines: "Click or drag to upload here" (medium) and "Audio or video file, up to 1000MB or 45 minutes" (muted) (E5). After upload, it is replaced by a media preview with the file name, a size pill ("1.6 MB") and a trash button (E6).
- **Drop area (Attio import):** a large rounded panel on a faint grey fill with an illustration, "Drop your .CSV file onto this area to upload", "or", and an outlined "Choose a .CSV file" button (A36). After upload, the panel shows a file card with name, type and size, a trash button, and two stat tiles (A37).
- **Empty state as drop target (Attio):** "Drag and drop a file here to upload or browse to choose a file." with a blue "Upload file" button (A35).
- **Button-only upload (both):** avatar and logo fields are a preview tile plus "Upload image" (blue in settings, outlined in onboarding) and a "Remove" text button, with the constraints as helper text below ("We support PNGs, JPEGs and GIFs under 10MB"; A1, A3, A8). ElevenLabs uses "Upload samples / Record yourself" as a pair of buttons in a card (E8).
- **Progress (ElevenLabs):** a floating "Uploading 1 item" tray at the bottom right, with "Less than a minute left", "Cancel" and a ring spinner per file (E20).

## Forms in context

- **Settings (Attio):** a narrow centred column (≈ 380px). Field pairs sit side by side (First / Last name, Timezone / Start week on), and sections are separated by hairlines (A1). Single settings use the label-left, control-right row (A16).
- **Settings (ElevenLabs):** mostly rows of label + value + button that open small modals with a single field (E1). Side panels stack selects, sliders and switches (E13, E14).
- **Onboarding and auth:** Attio uses a ≈ 320px column of 32px fields with muted labels and a full-width blue "Continue" (A7, A8, A9). Sign-in fields have no label and a leading icon (A42). ElevenLabs auth uses labelled ≈ 40px fields and a full-width black button that is grey while disabled (E2, E3).
- **Modals:** both stack labelled fields with ≈ 12–16px between them, and put actions bottom right (A3, A4, E1, E4).
- **Inline in tables (Attio):** a cell editor opens as a white panel slightly larger than the cell, with a blue 1px border. The field inside has its own blue focus ring, and a muted "+ Add phone number" row sits below (A30). Inline rename in a file list is a small blue-bordered field in the row (A38).
- **Toolbars:** search fields span the toolbar width with a leading magnifier and no label ("Search", "Start typing to search"; A39, E20, E22). Filters are chips (see PowerSearch).

## Inputs without a visible label

The ticket asks where inputs appear without a visible label. In both apps it is common, and the second cue varies:

| Where | Example | What replaces the label |
|---|---|---|
| Toolbar and page search | Attio import history (A39); ElevenLabs files, voice library, history (E20, E19, E22) | Outlined field + leading magnifier + placeholder |
| Search inside a listbox or picker | Attio selects (A10, A17, A28, A29); ElevenLabs voice and language pickers (E18, E19) | **Borderless** field + magnifier + hairline below; the panel is the container |
| Search at the top of a modal | Attio templates and "Choose record" (A40, A41) | Borderless, larger text, hairline below; the modal title acts as the label |
| Auth fields | Attio sign in and temporary password (A42, A6) | Outlined field + leading mail or key icon |
| Composers and prompts | Attio workflow prompt (A49); ElevenLabs agent prompt, remixing, script popover (E23, E24, E25) | A card or popover container with toolbar, plus placeholder |
| Inline table and list editors | Attio phone cell, folder rename (A30, A38) | The column header or row; the blue focus border |
| Filter values | Attio condition pills (A26, A27), advanced filter value (A25) | The preceding field and operator segments |
| Title fields | Attio "Create Task" title (A45) | Borderless large text in the modal body |
| Grouped fields | Attio invite rows (A12); ElevenLabs dub language pair and time range (E5) | One group label for several fields ("Invite your team to collaborate", "Source Language", "Time range to dub") |
| Natural-language date entry | Attio task date (A21) | Inside the date panel; the trigger chip names it |

Two patterns stand out. Outlined but unlabelled fields almost always have a **leading icon**. Borderless unlabelled fields always sit inside a container (a listbox, modal or composer card) with a **hairline under the field**.

## Where the references diverge from the roadmap's visual direction

The roadmap ("What every map inherits" in `docs/roadmap.md`) says blue is for primary, focus, links and selection (checked boxes included); inputs use a 1px `--color-border-emphasized` outline that sits deliberately below 3:1 and needs a second cue; controls are ≈ 8px rectangles and pills are only for chips and badges; density follows Astryx's medium defaults; FieldStatus uses the categorical surfaces; and the Switch off track uses `--color-track`.

1. **Selection colour.** Attio matches the roadmap: checked boxes, radios, on switches, selected chips, the selected calendar day and the listbox check are blue. ElevenLabs uses near-black for all of them. hvn follows Attio here, and ElevenLabs only informs shape and density.
2. **Switch on-state.** The roadmap's neutral "toggle that is on" rule is about ToggleButton. Both references treat Switch as a selection control (blue in Attio, black in ElevenLabs), not as a neutral pressed toggle. The Choice controls design should confirm that Switch-on is blue.
3. **Outline strength.** Attio's input outline (6% black) is much fainter than ElevenLabs' and, likely, fainter than `--color-border-emphasized`. Attio's unchecked checkbox outline is barely visible. Both confirm the roadmap's "below 3:1" stance, and Attio leans on labels, icons and containers as the second cue. Neither app adds a fill to unlabelled fields.
4. **Error style.** Both apps show a field error as **plain red text** under the field, without a tinted surface. Attio also tints the outline red, and ElevenLabs adds an icon. hvn's existing FieldStatus override paints the status message on the categorical *background* pair, like a badge. The Text fields design should decide whether FieldStatus keeps the tinted surface or moves to plain text with an icon, and which red the error outline uses. The roadmap already says "Input status borders and icons follow `--color-text-<status>`".
5. **Read-only.** Attio drops the outline and mutes the text, so read-only reads like plain text. The roadmap is silent.
6. **Density.** Attio fields are ≈ 32px (Astryx `md`), and ElevenLabs fields are ≈ 36–40px (closer to `lg`). The roadmap's "Astryx medium defaults" match Attio.
7. **Chip choice controls.** Attio's onboarding chips are 8px rounded rectangles with a raised shadow that turn solid blue when selected. The roadmap allows pills for chips. It also says shadows are only for floating layers, so the chip's lift (like Attio's raised secondary buttons) would not carry over.
8. **Calendar range band.** ElevenLabs' range is a continuous grey band with dark endpoints. With hvn's blue selection, endpoints would be blue and the band a neutral or pale-blue fill. The Date and time design should choose.
9. **Slider.** Only ElevenLabs shows sliders: a near-black fill and a dark disc thumb. With hvn's blue, the filled track and thumb would be blue. The off-track would naturally be `--color-track`, matching ProgressBar and the Switch off-track.
10. **Focus.** Attio's focus ring (1px blue border plus a thin blue ring) matches the roadmap's blue focus. ElevenLabs focus was not seen.
11. **Hover and pressed states** of fields, checkboxes and options can't be seen in static captures, except one probable hover outline on an Attio checkbox (A15).

## What this means for hvn (inputs to the design families)

- **Text fields:** a white field with a quiet 1px outline and an 8px radius at `md` ≈ 32px. The label sits above. Optional and required markers sit in the label, and helper text goes below. Focus is a blue 1px border plus a soft blue ring. Errors are red text under the field and a red-tinted outline, so the FieldStatus surface is the open question. Read-only removes the outline and mutes the text. Prefixes and suffixes (text, currency, icons, inline selects) sit inside one field rather than as joined segments. Numbers have no steppers in the references.
- **Choice controls:** 16px checkboxes with a 4px radius and blue checked fill, blue radios with a white dot, and a compact ≈ 28 × 16 blue switch. Lists come in three layouts: settings rows (control right), checkbox-with-description, and bordered radio cards with a blue selected border.
- **Selectors and search:** the trigger is the field shell with a trailing chevron. The panel is the Menu surface with an optional borderless search row, section labels, a trailing check for selected rows, and empty and error states. Tokens are chips (categorical tags or blue value chips), with red for invalid. PowerSearch follows Attio's condition rows and its collapsed segmented pill.
- **Date and time:** a one-month panel with ≈ 30px day squares and a blue selected day. Today gets a dot or accent numeral. Outside days are muted. The range is a band between two selected endpoints. Shortcuts or presets and a typed field are optional slots, and range pickers get an Apply footer.
- **Slider and FileInput:** a thin track with a small solid thumb and min/max captions at the ends. The drop zone is a dashed hairline box with an icon tile, a title, constraints text and an upload button, and it becomes a file row with size and remove after upload.
- **Unlabelled inputs:** the references always pair an unlabelled field with a leading icon (outlined fields) or a container plus a hairline (borderless fields). This is evidence for the map's open question about whether such fields need another cue.
