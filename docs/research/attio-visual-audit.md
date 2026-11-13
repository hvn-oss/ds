# Attio visual reference audit

Research for [#14](https://github.com/hvn-oss/ds/issues/14), under the map [#12](https://github.com/hvn-oss/ds/issues/12) "hvn visual identity: foundations and icons". Attio is hvn's **primary app reference**.

**Gist:** Attio is a dense, cool-neutral, border-led UI. It sets Inter at 13–14px on rows about 34px tall, uses 28px controls and 6–8px radii, and has a single saturated blue (`#266df0`). The blue is used only for primary actions, focus, links and selection. Shadows appear only on floating layers.

## Sources and method

- **Mobbin** (screens, flows, sections). The images were examined, not just the metadata. Mobbin web captures are 1920px wide and were taken from a 1440 × 900 viewport, so on-image pixels ÷ 1.333 give CSS px. Measured values are marked **≈**. They come from pixel runs on the full-resolution captures and are accurate to about ±1–2px.
- **Attio's production CSS**, for exact values (fetched 2026-11-12):
  - App: `https://app.attio.com/web-assets/main.bundle.b9beeb7260735d19.css` (StyleX output, so the variable names are hashed. The values are exact.)
  - Marketing: the `/_next/static/immutable/chunks/*.css` and `@font-face` preloads on `https://attio.com`.
- **Fontsource API** (`api.fontsource.org/v1/fonts/<id>`, `/v1/variable/<id>`), for licences and variable axes.

Mobbin items cited below:

| Ref | Item |
|---|---|
| S1 | [People table, populated](https://mobbin.com/screens/d7ef7ef2-c43b-4cad-826a-d1a862a51a3a) |
| S2 | [Users table, one row](https://mobbin.com/screens/e57bb001-6b0c-42d1-a673-67d130c00aeb) |
| S3 | [People table + comments side panel](https://mobbin.com/screens/c39cc249-1c01-4726-bb4d-7543beeaefde) |
| S4 | [Person record page](https://mobbin.com/screens/b4729369-cc37-4b1d-b51e-75954a6ff5c7) |
| S5 | [Create Person modal](https://mobbin.com/screens/9f630018-f1ca-4bf1-bccf-3fadc04b793f) |
| S6 | [Comment thread panel](https://mobbin.com/screens/b2977ddb-b0f2-4092-b9c9-56efef144ed1) |
| S7 | [Workspaces table](https://mobbin.com/screens/fa7f6f5e-f7ac-45db-9233-faac58dc7d55) |
| S8 | [Workflow settings page](https://mobbin.com/screens/f6b70d77-eff3-4bd1-a41d-d5a8d266b77e) |
| S9 | [Workflows list](https://mobbin.com/screens/617873c3-ab72-413e-a110-dabb9b826072) |
| F1 | [Onboarding flow, current (© 2026), 19 screens](https://mobbin.com/flows/33785144-9ef2-4b1a-8a1c-27c13ce0e1c6?tab=screens) |
| F2 | [Onboarding flow, earlier (© 2024, numbered "n/5" steps), 21 screens](https://mobbin.com/flows/4373fd95-c2f6-4361-9c2d-34ce151bcee9?tab=screens) |
| F3 | [Help and first steps](https://mobbin.com/flows/02944f34-fdab-49a1-bf4c-0aa800131dff?tab=screens) |
| F4 | [Accepting an invitation](https://mobbin.com/flows/536bb27b-20d8-4e63-a6bd-7b1c66ac77cb?tab=screens) |
| M1 | [Marketing hero](https://mobbin.com/sites/sections/5df02a80-4c9b-4515-a005-efef771a156c) |
| M2 | [Marketing hero, alt](https://mobbin.com/sites/sections/0bd5c4b3-a434-4be5-a20a-bf97cf821a24) |
| M3 | [Marketing "CRM for startups" hero](https://mobbin.com/sites/sections/8fa276bd-351b-4988-bdb2-dd8b84661988) |
| M4 | [Marketing feature section](https://mobbin.com/sites/sections/d67d6a20-d1ad-4ee2-b170-9bd5d7c433fc) |

The F-flow previews were matched to flows by the copyright year and step numbering on the screens. Treat a screen-to-flow match as likely rather than certain.

## 1. Fonts

| Role | Attio uses | Source | Closest OFL variable font on Fontsource |
|---|---|---|---|
| UI sans | **Inter** (variable, `font-weight: 100 900`, `InterVariable.woff2`) | app CSS `@font-face`; `html, body { font-family: Inter, sans-serif }` | **Inter**: `@fontsource-variable/inter`, OFL-1.1, axes `wght 100–900`, `opsz 14–32`, `ital` |
| Display sans (marketing headings) | **Inter Display** (static medium/semibold/bold) | attio.com preloads `inter_display_*.woff2`; `font-family: interDisplay` | The same Inter variable font: its `opsz` axis (14–32) *is* the Display cut at large sizes. No second family is needed. |
| Serif (rich text, marketing accents) | **Tiempos Text** (Klim, commercial) | app CSS `font-family: Tiempos Text, Georgia, Times New Roman, serif`; attio.com preloads `tiempos_text_regular(_italic)` | **Source Serif 4**: `@fontsource-variable/source-serif-4`, OFL-1.1, `wght 200–900`, `opsz 8–60`, `ital`. Runner-up: Newsreader (`opsz 6–72`). |
| Mono | **JetBrains Mono** | app CSS `Jetbrains Mono, SF Mono, …` | **JetBrains Mono**: `@fontsource-variable/jetbrains-mono`, OFL-1.1, `wght 100–800`, `ital` |

The older marketing captures (M1, M2, M4) show a rounder geometric grotesk in hero headlines. The live attio.com no longer loads it; it uses Inter Display. Ignore the older face.

**Weights** in the app CSS: 400, 500, 600 and 700. On screen, body text and cell values are 400. Labels, buttons, nav items and column headers are 500. Page and section titles are 600 (S1, S4, S8).

**Letter-spacing** tokens in the app CSS are `-0.02em`, `-0.01em`, `-0.005em`, `0` and `0.02em`. Small negative tracking is used on larger text.

## 2. Type scale and sizes

The app's atomic `font-size` set is exactly **10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 30, 32 and 36px**. The `line-height` set is 11, 12, 14, 16, 18, 20, 24, 28 and 36px. Line heights come in fixed px steps, not ratios.

Observed use, estimated from the screenshots against that scale:

| Use | Size / weight | Where |
|---|---|---|
| Table cell, sidebar nav item, button label, input text | ≈ 13–14px / 400–500 | S1, S2, S5 |
| Column header, toolbar chips ("Sorted by", "Filter"), sidebar group headings ("Records", "Lists") | ≈ 12–13px / 500. Group headings are smaller and muted. | S1, S7 |
| Field label above input, helper text, footnotes | ≈ 12px / 400–500, muted | S5, F1, F2 |
| Page title in top bar ("People", "Companies") | ≈ 14px / 500–600. The top bar uses a breadcrumb, not a large H1. | S1, F3 |
| Section heading in content ("Highlights", "General", "Notifications") | ≈ 14–15px / 600 | S4, S8 |
| Onboarding step heading ("Let's get to know you", "Create your workspace") | ≈ 20px / 600 | F1, F2 |
| Modal hero heading ("Welcome to Attio Pro") | ≈ 22–24px / 600 | F1 |
| Marketing H1 | ≈ 64–72px, Inter Display semibold, tight tracking | M1–M4 |

**For hvn:** the app body is **13px**, with 14px for emphasis and 12px for meta. Sizes above 24px appear only in onboarding and marketing.

## 3. Density

The measurements below are taken from S1 (1920px capture ÷ 1.333).

| Element | Value |
|---|---|
| Table row pitch | **≈ 34px.** 19 rows measured over 868 image px gives 45.7 px per row. This sits between Astryx's `sm` and `md` control heights. Use 32–36px. |
| Table header row | ≈ 34px (same as rows) |
| Primary button ("New Person") | **≈ 28px** tall (37 image px) |
| Toolbar controls (view picker, "View settings", "Import / Export", "Sorted by", "Filter") | ≈ 28px; the filter chips are ≈ 24px |
| Sidebar search input | ≈ 28px |
| Sidebar nav item | ≈ 28–30px pitch |
| Top bar (breadcrumb + actions) | ≈ 46–48px, with a 1px bottom border |
| View toolbar row | ≈ 46–48px, with a 1px bottom border |
| Onboarding inputs | ≈ 32px; the primary "Continue" button is ≈ 32–34px, full width (F1, F2) |

The CSS has atomic heights 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 and 44px. The control family runs 20 to 36px in 2px steps.

**Spacing scale** (exact, app CSS): 0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96 and 128px. This is a 4px rhythm with 2px and 6px half-steps for tight UI. Inside controls, 6–8px horizontal padding and 4–8px gaps dominate.

## 4. Layout

- **App shell** (S1, S2, S7, F3): a fixed left sidebar of about **262px** on `#fbfbfb`, separated from a white content area by a 1px border. The sidebar holds:
  - workspace switcher
  - search (with a `⌘K` hint) and an inbox icon button
  - primary nav (Home, Tasks, Notes, Emails, Calls, Reports, Sequences, Workflows)
  - collapsible groups ("Records", "Lists", "Chats"), each with a small coloured object icon
  - a footer with "Getting started", "Invite team members" and the trial notice.
- **Content** is a top bar (breadcrumb title, Share, Ask Attio) above a view toolbar above a full-bleed table. The table is edge to edge with no card wrapper. Column dividers are vertical 1px lines and the last row is a "count / Add calculation" summary row (S1, S2).
- **Side panels** (comments, S3, S6; help, F3) are about **300px** wide. They slide in on the right and push the table rather than overlay it. A 1px left border separates them, with no heavy shadow.
- The **record page** (S4) has three areas: a header strip with record name and actions, a left attribute list of label–value pairs (≈ 260px), and a tabbed main area (Overview, Activity, Emails…). Its "Highlights" are small bordered cards in a three-column grid.
- **Settings** (S8) is a narrow centred column, about 360–380px wide. Each row has a label and description on the left and the control on the right, and sections are divided by 1px rules.
- **Modals** (S5, F1) are about 400–480px wide, centred, white and elevated by shadow. They have a header with an icon and title, tabs, stacked fields, and a footer with the primary action bottom right.

## 5. Colour: neutrals

These are exact values from the app CSS `:root` blocks. The neutrals are **slightly cool (blue-tinted) greys**: in every step, B is the highest channel.

| Step | Hex | Role observed |
|---|---|---|
| white | `#ffffff` | Main content surface, cards, inputs, modals |
| 50 | `#fbfbfb` | Sidebar / secondary surface (confirmed by pixel sampling of S1: rgb 251) |
| 100 | `#f6f7f7` | Subtle fill: hover, table header, secondary button bg |
| 150 | `#f1f2f3` | Muted surface |
| 200 | `#eeeff1` | Selected/active nav item, neutral tag bg |
| 250 | `#e6e7ea` | Solid border |
| 300 | `#d9dade` | Stronger border (input outline via `inset 0 0 0 1px`) |
| 500 | `#a2a4a7` | Disabled text, placeholder |
| 550 | `#898a8d` | Icons, tertiary text |
| 700 | `#505155` | Secondary strong text |
| 900 | `#101112` | Primary text |
| dark ramp | `#2f3033`, `#212224`, `#1b1c1f`, `#17181a`, `#101112`, `#0b0c0d` | Dark-theme surfaces and borders. The app ships Light / Dark / System (see the theme menu in F1). |

**Alpha neutrals** are used heavily for text and hairlines on any surface:

- Secondary text: `#000000a1` (63% black). Tertiary text: `#0000008c` (55%) and `#00000080` (50%).
- Hairline borders and dividers: `#0000000f` (6%) and `#00000017` (9%).
- Hover and pressed fills: `#00000005`, `#0000000a` and `#0000001a`.
- In dark mode the hairline equivalents are `#ffffff12` and `#ffffff1a`.

**For hvn:** the standing decision seeds neutrals from Tailwind `neutral`, which is pure grey. Attio's ramp is cooler, closer to Tailwind `zinc`/`gray`. If hvn keeps `neutral`, it will read a touch warmer and flatter than Attio, which is acceptable but should be a deliberate choice. Attio also uses alpha neutrals for text and borders, which suits Astryx's layered surfaces.

## 6. Colour: primary accent

- **Primary blue `#266df0`.** Hover/pressed is `#215bc4`. Tints are `#d6e5ff` and `#e5eeff`, alpha tints are `#266df01a` (10%), `#266df033` (20%) and `#266df066` (40%, focus ring), and the light accent is `#80acff`. Pixel sampling of the S1 primary button gives rgb ≈ (41, 112, 236), which matches.
- The nearest Tailwind anchor is **blue-600 `#2563eb`**: it is about the same hue and slightly darker. Attio's hover `#215bc4` sits near blue-700 (`#1d4ed8`). Pinning hvn's primary at Tailwind blue-600 reproduces Attio's accent closely.
- **Where blue appears.** It is used sparingly:
  - Primary buttons ("New Person", "Create record", "Comment", onboarding "Continue", "Send invites", "Connect Google account") (S1, S5, S3, F1, F2)
  - Links and email values in cells and fields (S1, S4)
  - Focus rings on inputs, as a 1px inset blue border plus a soft outer ring (F2 "Enter your first name" field; F1)
  - Selected chip or option ("Customer success" in F2 step 4/5; the selected sync option card in F2)
  - Switches when on (S8), the active checkbox and check icons in menus (F1 role picker), and the "Add billing" CTA (F3)
  - Disabled primary buttons, as a 40% blue tint ("Reply" and "Comment" disabled in S6 and S3)
  - The People object icon (S1).
- Everything else is neutral. Page chrome, nav selection, table headers and secondary buttons never use blue.
- **Other hues** are categorical. Tags and object icons use paired tokens: a bg tint, a saturated fg, and a dark text. The families are green `#00d17e`/`#02ad6e`, cyan `#00b9eb`, purple `#9b69ff`, pink `#fa4b94`, orange `#f97514`, yellow `#f5e242`, lime `#aabf2a` and red `#ff5454`/`#eb3b3b` (S1 status dots, Companies tags in F3). Red is also the error colour: an input border plus a 12px red helper ("Please enter a valid temporary password", F2).

## 7. Borders vs shadows

Attio is **border-led**. Hierarchy inside the page comes from 1px hairlines and fills, never shadow:

- Table grid, top bar, toolbar, sidebar edge and side-panel edge are all 1px solid lines in `#e6e7ea` or 6–9% black (S1, S3).
- Inputs and secondary buttons draw their outline as `box-shadow: inset 0 0 0 1px <border>` rather than `border`, so the box never shifts size. The tokens include `inset 0 0 0 1px #d9dade`, `inset 0 0 0 1px #0000000f`, and focus `inset 0 0 0 1px #266df0`.
- Cards on the record page (S4 "Highlights") are bordered white boxes with no shadow.

Shadows are reserved for **floating layers**. The app defines three levels, which are exact and all tinted with a cool navy `#1c2840`:

| Level | Value | Use |
|---|---|---|
| Raised (button / control) | `inset 0 0 0 1px #0000, 0 0 2px 0 #1c28402e, 0 1px 3px 0 #0000000a` | Secondary buttons and chips: a barely visible lift (S1 toolbar buttons) |
| Overlay (menu / popover) | `inset 0 0 0 1px #0000, 0 0 0 1px #1c28400a, 0 4px 8px -4px #1c28401f, 0 4px 12px -2px #18294b29` | Dropdowns, the workspace menu, the country combobox (F1) |
| Modal / dialog | `0 8px 28px -6px #1c28401f, 0 18px 88px -4px #1c284029, 0 0 1px 0 #1c284029` | Create Person modal (S5), Welcome to Pro (F1) |

The primary button also gets a coloured shadow: `inset 0 0 0 1px #0000000f, 0 2px 4px -2px <blue 12%>, 0 3px 6px -2px <blue 8%>`. The destructive button uses the same recipe in red.

## 8. Radius

The app radius scale is exact: **0, 2, 4, 6, 8, 9, 10, 12, 14, 16, 20 and 32px**. On screen:

| Element | Radius (≈) | Where |
|---|---|---|
| Tags / badges / status chips | 4–6px | S1, F3 |
| Buttons, inputs, toolbar chips, nav items | **6–8px** | S1, S5, F1 |
| Menus, popovers, comment boxes, highlight cards | 8–10px | S3, S4, F1 |
| Modals | 12px | S5, F1 |
| Onboarding container card | ≈ 16px | F1, F2 |
| Pill elements ("Getting started" pill, onboarding interest chips) | full | F2, S1 |

This is "softly rounded, never bubbly": 8px for controls and 12px for surfaces.

## 9. Signup and onboarding

Sources: F1 (current), F2 (earlier), F4 (invite acceptance).

- **Frame.** The Attio wordmark is centred at the top of a white page, with a footer row of links (© Attio, Privacy Policy, Support, Sign out). A thin progress bar runs along the very top edge (F1). The steps sit in **one large card**, about 1150 × 650px, with a 1px border, 16px radius and no shadow.
- **Split layout.** The left half holds the form in a column about 320px wide. The right half is a light-grey (`#f6f7f7`–`#fbfbfb`) panel with a **live skeleton preview of the product** that fills in as the user types. The workspace name and logo appear in a mock sidebar, and the focused part is highlighted with a blue-ringed callout (F1, F2). Earlier versions (F2) used plain explanatory copy on the right instead ("Welcome to Attio.").
- **Steps** (F1, F2):
  1. Sign in, with Google first, then work email and a temporary-password code. Personal email domains are rejected with an explanation.
  2. "Let's get to know you": avatar upload, first and last name, a read-only email field, and a product-updates toggle.
  3. "Create your workspace": logo, company name, workspace handle with an `app.attio.com/` prefix, and a searchable billing country combobox.
  4. "Help us customise your workspace": pill multi-select for use case and current work (F2).
  5. "Bring your relationships into Attio": a Google or Microsoft connect CTA plus privacy reassurance (GDPR, CCPA, ISO 27001), customer logos, and a "manually create" escape hatch (F1).
  6. "Collaborate with your team": email rows with role selects, "Add more", "Copy invite link", "Send invites" and "Skip for now".
- **Step chrome.** F2 shows the step count as small muted text ("2/5") above the heading, with a back chevron. F1 replaces this with a back chevron plus the top progress bar.
- **Controls.** The primary CTA is a full-width blue button. Secondary actions are text buttons ("Skip for now", "Continue without sync"). Fields have their label above, in 12px muted medium text, about 32px tall, with a 1px hairline and 6–8px radius.
- **Landing in the app** (F1, F3): the user arrives at Home with a "Welcome to Attio Pro" modal over a blurred, dimmed app. A "Getting started 0/6" checklist pops up from the sidebar footer, and a sync toast sits top right. The checklist persists as a small sidebar pill with a progress count.

## 10. Implications for hvn foundations

1. **Typography:** use Inter variable (Fontsource) for UI and display, letting `opsz` stand in for Inter Display. Use JetBrains Mono for code. If a serif is wanted, Source Serif 4 is the OFL stand-in for Tiempos Text. Base app text is 13px, with steps 11/12/13/14/16/20/24/30/36 and fixed px line heights.
2. **Density:** compact. Controls are 28px by default (24px small, 32px large), table rows are about 34px, and bars are 48px. This matches a dense Astryx setting, so check it against Astryx's density defaults before overriding.
3. **Neutrals:** a cool-grey ramp with alpha variants for text (≈ 63% / 55% black) and hairlines (6–9% black). Decide deliberately whether Tailwind `neutral` (pure grey) is close enough or whether `zinc` reads truer.
4. **Primary:** pin to Tailwind **blue-600** `#2563eb`, the closest anchor to Attio's `#266df0`. Use it only for primary action, focus, link, selection and on-state.
5. **Shape:** 1px hairlines carry the in-page hierarchy. Shadows only for raised controls, popovers and modals, as three cool-tinted levels. Radius is 8px for controls and 12–16px for surfaces, with pills for chips.
6. **Onboarding:** one bordered split card, with the form on the left and a live product preview on the right, plus a thin top progress bar and a full-width blue CTA.
