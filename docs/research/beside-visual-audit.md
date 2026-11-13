# Beside visual reference audit

Research for [#13](https://github.com/hvn-oss/ds/issues/13), part of the map [#12](https://github.com/hvn-oss/ds/issues/12). Beside is hvn's **marketing** reference. This brief records what Beside's marketing site shows about fonts, type sizes, whitespace, neutrals, accent use, shape and elevation, and how it frames product visuals.

## Sources

- **Mobbin sections** (website sections, desktop captures). Each one is cited inline by a short name:
  - [Hero](https://mobbin.com/sites/sections/94d39c3f-025a-4d4e-894b-de12954f2ee8): "The AI operating system that runs your local business"
  - [Product tabs](https://mobbin.com/sites/sections/3ffb4e40-3d9e-4f66-adb7-b04bc5a831cb): "Built for how your business actually runs", with a desktop app in a browser frame
  - [Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75): "Your agent works for your business"
  - [Why Beside](https://mobbin.com/sites/sections/595fbaca-74ab-4c25-b94c-b1c93f1444cd): a comparison table
  - [Customer stories + FAQ](https://mobbin.com/sites/sections/2e929c0f-3d5e-4b5d-82ba-356dc6dd2473)
  - [FAQ](https://mobbin.com/sites/sections/8c5942fa-fa20-422a-821d-36d400ccdf58)
  - [Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669): "Don't take our word for it"
  - [Phone page](https://mobbin.com/sites/sections/03f765e3-3432-4ac7-ab08-a240654f65db): "The phone that answers for you", with a mobile mockup
  - [Case study hero](https://mobbin.com/sites/sections/5ef7e058-1b1c-49f8-a582-5bd91770f2d0): "How Beside works for TWFG Insurance"
  - [Start using Beside](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df): the closing CTA and steps
  - [About](https://mobbin.com/sites/sections/36034d03-ff72-4139-aaab-a13bbff5a953): a long-form text page
  - [Help](https://mobbin.com/sites/sections/922dbafc-e343-4fc6-999b-9a6bb73c3bde)
- **beside.com production CSS**, fetched 2026-11-12 from the three Next.js stylesheets that `https://www.beside.com` links (`/_next/static/chunks/*.css`), together with the homepage HTML. This is the primary source for exact values. Below, "CSS" means a custom property or rule from these files, and "HTML" means a utility class counted in the homepage markup.

## Summary

Beside is a quiet, near-monochrome, **warm-neutral** site. It uses a single sans family (Inter) at **regular weight for display text** with tight negative tracking. Near-black is the only CTA colour, and colour shows up only in small, animated gradient moments. Product UI sits inside large rounded "stone" panels, and elevation comes from soft, low-opacity shadows. For hvn: copy the restraint, the type scale and the radius/shadow language, and swap Beside's multicolour gradient for hvn's blue as the single accent.

## Typography

| What | Observed value | Source |
|---|---|---|
| Family | **Inter**, used for sans, brand and display: `--font-sans`, `--font-brand: "Inter"`. Inter is declared as a variable font (`font-weight: 100 900`). | CSS |
| Mono | System mono stack `ui-monospace, SFMono-Regular, "SF Mono", Menlo…`, used for small uppercase eyebrows such as "LIVE DEMO", "LIVE CALL" and "HOW IT WORKS" | CSS; [Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669) |
| Unused commercial faces | `@font-face` declares **GT America** and **GT America Expanded** (Grilli Type, commercial), but no rule on the homepage references them | CSS |
| Display weight | **Regular (400)**. The hero h1 is `font-normal text-[36px] md:text-[48px] leading-[1.25] tracking-[-0.03em]`. The headings in every captured section are visibly regular, not bold. | HTML; [Hero](https://mobbin.com/sites/sections/94d39c3f-025a-4d4e-894b-de12954f2ee8), [Start using Beside](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df) |
| UI weight | Medium (500) dominates: 228 `font-medium` against 40 `font-normal` and 32 `font-semibold`. It is used for labels, nav, buttons and row titles. | HTML |

**Marketing type scale** (CSS custom properties, exact):

| Token | Size / line-height | Tracking |
|---|---|---|
| `marketing-display-large` | 64px / 1.1 | display: −0.045em |
| `marketing-display-compact-large` | 56px / 1.15 | display-compact: −0.04em |
| `marketing-display` | 42px / 1.1 | −0.045em |
| `marketing-display-compact` | 40px / 1.15 | −0.04em |
| `marketing-heading-large` | 36px / 1.2 | heading: −0.035em |
| `marketing-heading` | 30px / 1.2 | −0.035em |
| `marketing-title` | 24px | card: −0.025em |
| `marketing-title-small` | 20px | |
| `marketing-lead` | 17px | |
| `marketing-body-large` / `body` / `body-small` | 16 / **15** / 14px | |
| `marketing-footnote` / `navigation-detail` / `caption` | 13 / 12.5 / 12px | |
| `marketing-price-large` / `price` | 60 / 52px, line-height 1 | price: −0.05em |

In practice, body copy sits between 13 and 15px (the most common sizes in the HTML are `text-[13px]` ×118, `text-[15px]` ×95 and `text-[14px]` ×79). Secondary copy is set in `--stone-500` grey under a near-black heading, as in [Why Beside](https://mobbin.com/sites/sections/595fbaca-74ab-4c25-b94c-b1c93f1444cd) and [About](https://mobbin.com/sites/sections/36034d03-ff72-4139-aaab-a13bbff5a953). One recurring device sets the heading as two lines, the first in ink and the second in grey: "Your questions, covered / Get started today" in [FAQ](https://mobbin.com/sites/sections/8c5942fa-fa20-422a-821d-36d400ccdf58) and "Don't take our word for it. / Give it a try now." in [Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669).

**Fontsource / OFL mapping**

- Inter is already OFL and variable: `@fontsource-variable/inter`. hvn can use it directly.
- If hvn wants the GT America character that Beside declares but doesn't use, the closest OFL variable font is **Archivo** (`@fontsource-variable/archivo`). It is a grotesk with a `wdth` axis from 62 to 125, so one family covers both GT America (wdth 100) and GT America Expanded (wdth around 112–125).
- For mono eyebrows, use **JetBrains Mono** or **Geist Mono** (both OFL variable on Fontsource) instead of the system stack, so the eyebrows render the same on every platform.

## Neutrals

Beside's neutrals are a custom **warm "stone"** ramp (CSS `--stone-*`), with light values first and dark-mode values second:

| Token | Light | Dark | Role |
|---|---|---|---|
| `--stone-0` | `#fefdfb` | `#141310` | page / view background (`--color-background-view`) |
| `--stone-100` | `#f7f6f3` | `#1c1b18` | grouped surfaces, panels, FAQ open state (`--color-background-grouped`) |
| `--stone-200` | `#1e1d1c0f` (6% ink) | `#ffffff0f` | borders (`--color-border-primary`) |
| `--stone-500` | `#78756f` | `#cec8c3` | secondary text (`--color-text-secondary`) |
| `--color-stone-600` | `#57534d` | n/a | body text (`--color-text-body`) |
| `--stone-900` | `#1e1d1c` | `#f9f4ee` | primary text, inverted backgrounds, focus ring |
| `--color-text-ink` | `#0e0e10` | n/a | headline ink (203 uses in the HTML) |
| `--background` | `#fff` | `#0e0e0e` | |
| `--muted-foreground` | `#737373` | `#cec8c3` | |

The light page is effectively white. Elevated or grouped areas step down to `#f7f6f3`, as in the FAQ open item ([FAQ](https://mobbin.com/sites/sections/8c5942fa-fa20-422a-821d-36d400ccdf58)), the phone and live-demo panels ([Phone page](https://mobbin.com/sites/sections/03f765e3-3432-4ac7-ab08-a240654f65db), [Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669)) and the secondary pill buttons ([Help](https://mobbin.com/sites/sections/922dbafc-e343-4fc6-999b-9a6bb73c3bde)). The CSS also ships Tailwind's `stone` steps (`#fafaf9`, `#d6d3d1`, `#a6a09b`, `#57534d`, `#44403b`, `#292524`). Borders are a **translucent ink** (6%), not a solid grey. For hvn this points to `neutral` with a slight warm cast, or to Astryx's alpha border tokens.

## Accent colour and where it appears

- **There is no brand-hue CTA.** Primary buttons are near-black pills (`--color-text-ink #0e0e10` / `stone-900`) with white text. Secondary buttons are white pills with a hairline border, or `stone-100` pills. See "Get started" / "Learn more" in the [Case study hero](https://mobbin.com/sites/sections/5ef7e058-1b1c-49f8-a582-5bd91770f2d0) and "Get started" / "Try it live" in [Start using Beside](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df). `--accent` itself is `#1a1a1a`.
- **Colour appears only as a shimmer gradient** on single words or numbers. The blue→coral→peach sweep `#498fff → #ff7a7a → #ffbc74` (CSS `linear-gradient(90deg,#0e0e10 …,#498fff 35%,#ff7a7a 50%,#ffbc74 65%,#0e0e10 …)`) animates across "Your questions, covered" in [Customer stories + FAQ](https://mobbin.com/sites/sections/2e929c0f-3d5e-4b5d-82ba-356dc6dd2473) and across the demo phone number "+1 (424) 855-1231" in [Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669). A second, rainbow variant (`#0fb6ff → #a565f8 → #f87bdc → #ff891c → #fbb500`) also exists.
- **Blue `#498fff`** is the first stop of the shimmer and the most frequent saturated hex in the HTML (×12, plus interpolated `#4790ff`-ish values). This supports hvn's choice of blue as the primary hue: it is already Beside's lead accent stop. The nearest Tailwind anchor is `blue-500` (`#3b82f6`; Tailwind v4's `#3080ff` appears in the same CSS).
- **A warm amber/peach wash** (amber `#fbb500`, CSS gradients ending in `#f7f5ed`/`#f4f0e8`) fills dotted illustration panels behind product cards. See the phone-icon card in [Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75) and the receptionist card backdrop in the [Case study hero](https://mobbin.com/sites/sections/5ef7e058-1b1c-49f8-a582-5bd91770f2d0).
- Status colours come from the Tailwind palette (`emerald`, `red`, `amber`). They show up in-product only, for example the green "Live" dot in [Product tabs](https://mobbin.com/sites/sections/3ffb4e40-3d9e-4f66-adb7-b04bc5a831cb).

## Shape: radius, borders and shadows

- **Radius**: pills are everywhere (`rounded-full` ×84: buttons, tabs, the search field, badges). Cards and panels use **20px** most often (`rounded-[20px]` ×39), then 12px (`rounded-xl`) ×27, 24px ×16, 14px ×16 and 16px ×12. 28px and 48px appear on hero-scale panels. The device frame uses `--device-corner-radius: 56px`. The tokens follow Tailwind (`--radius-lg .5rem` … `--radius-4xl 2rem`). You can see it in the rounded FAQ panel ([FAQ](https://mobbin.com/sites/sections/8c5942fa-fa20-422a-821d-36d400ccdf58)), the comparison table card ([Why Beside](https://mobbin.com/sites/sections/595fbaca-74ab-4c25-b94c-b1c93f1444cd)) and the photo cards ([Customer stories + FAQ](https://mobbin.com/sites/sections/2e929c0f-3d5e-4b5d-82ba-356dc6dd2473)).
- **Borders**: hairlines in 6% ink (`--color-border-primary`). Feature lists are separated by row dividers, not boxed in cards; see [Start using Beside](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df) and [Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75).
- **Shadows**: soft and low-opacity, used to lift floating UI rather than to structure the page. Values in the HTML include `0 2px 12px rgba(0,0,0,.06)` (×5, the default card), `0 1px 4px rgba(0,0,0,.12)`, `0 4px 20px rgba(0,0,0,.08)`, `0 8px 32px rgba(0,0,0,.08)` and a single large `0 24px 80px rgba(0,0,0,.22)` for the hero product window. The CSS adds glassy treatments such as `0 8px 40px #0000001f, inset 0 2px 1px #fff`. Floating cards (testimonial "2x Time saved", hero search field, tab bar) carry a shadow plus a hairline; see [Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75) and [Product tabs](https://mobbin.com/sites/sections/3ffb4e40-3d9e-4f66-adb7-b04bc5a831cb).
- **Rule of thumb**: surfaces are separated by tone (white against `stone-100`) and hairlines, and shadows are kept for things that float.

## Whitespace and section rhythm

- Spacing base is `--spacing: .25rem` (4px, Tailwind default). Sections use `py-20` (80px) and widen to `md:py-28` (112px). Each captured section has one idea and wide margins; see [Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75) and [Why Beside](https://mobbin.com/sites/sections/595fbaca-74ab-4c25-b94c-b1c93f1444cd).
- Widths: the outer container is `max-w-[1400px]`. Text measures are narrow: `max-w-[420px]` ×23, `[440px]` ×13, `[560px]` and `[640px]`, plus `max-w-[620px]` on the hero h1. Body text rarely runs past about 60 characters.
- Two layout patterns alternate:
  1. **Centred stack**: icon glyph, heading, subhead and a pill CTA pair, centred above a wide visual. Seen in [Hero](https://mobbin.com/sites/sections/94d39c3f-025a-4d4e-894b-de12954f2ee8), [Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75), [Phone page](https://mobbin.com/sites/sections/03f765e3-3432-4ac7-ab08-a240654f65db) and [Help](https://mobbin.com/sites/sections/922dbafc-e343-4fc6-999b-9a6bb73c3bde).
  2. **Split 5/7**: an eyebrow, heading and body column on the left, with a table, visual or accordion on the right. Seen in [Why Beside](https://mobbin.com/sites/sections/595fbaca-74ab-4c25-b94c-b1c93f1444cd), [FAQ](https://mobbin.com/sites/sections/8c5942fa-fa20-422a-821d-36d400ccdf58), [Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669) and [Product tabs](https://mobbin.com/sites/sections/3ffb4e40-3d9e-4f66-adb7-b04bc5a831cb).

## Landing page structure

The homepage and product pages are built from these section types, in roughly this order:

1. **Nav**: logo, five text links with chevron dropdowns, "Log in" as text and "Get started" as a black pill ([Hero](https://mobbin.com/sites/sections/94d39c3f-025a-4d4e-894b-de12954f2ee8)).
2. **Hero**: a small pill badge ("Books the jobs"), a two-line regular-weight h1 and a grey subhead. The hero has an inline search/audit input pill with a secondary action, under a decorative dotted arc. The product window peeks in from below the fold ([Hero](https://mobbin.com/sites/sections/94d39c3f-025a-4d4e-894b-de12954f2ee8)).
3. **Tabbed product showcase**: a pill tab bar (Live Agent / Website Builder / Phone / Calendar / Customers) switches a large framed UI shown beside a copy column ([Product tabs](https://mobbin.com/sites/sections/3ffb4e40-3d9e-4f66-adb7-b04bc5a831cb)).
4. **Feature rows**: icon, bold label and grey description, in a divided list ([Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75), [Start using Beside](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df)).
5. **Comparison table** against point solutions, with check and cross icons ([Why Beside](https://mobbin.com/sites/sections/595fbaca-74ab-4c25-b94c-b1c93f1444cd)).
6. **Live demo**: a gradient phone number beside a chat transcript card ([Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669)).
7. **Social proof**: a large stat ("21,000+ paying businesses") and a horizontal carousel of rounded photo cards with category pills ([Customer stories + FAQ](https://mobbin.com/sites/sections/2e929c0f-3d5e-4b5d-82ba-356dc6dd2473)).
8. **FAQ**: a split layout with a heading and CTA on the left and an accordion on the right. Only the open item is filled with `stone-100` ([FAQ](https://mobbin.com/sites/sections/8c5942fa-fa20-422a-821d-36d400ccdf58)).
9. **Closing CTA**: centred logo glyph, heading, primary and secondary pills, then numbered steps ([Start using Beside](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df)).

Text pages ([About](https://mobbin.com/sites/sections/36034d03-ff72-4139-aaab-a13bbff5a953), [Help](https://mobbin.com/sites/sections/922dbafc-e343-4fc6-999b-9a6bb73c3bde)) use the same type with a narrow left-aligned measure, a grey eyebrow ("Company") and underlined inline links.

## How product visuals are framed

- **Desktop**: the app is shown in a **light browser-chrome window** with traffic-light dots and a URL pill. It has about 12–16px radius, a hairline and a large soft shadow, and sits directly on the white page. The UI inside is real and legible, though some list content is replaced by grey skeleton bars to keep focus. A caption sits below in small grey text ("Live Agent: a reactivation campaign proposed…"). See [Product tabs](https://mobbin.com/sites/sections/3ffb4e40-3d9e-4f66-adb7-b04bc5a831cb) and [Hero](https://mobbin.com/sites/sections/94d39c3f-025a-4d4e-894b-de12954f2ee8).
- **Mobile**: a **flat, white iPhone outline** (Dynamic Island, about 56px device radius, no photographic bezel) is centred in a wide **`stone-100` panel with about 20–24px radius**. The panel carries handwritten-style "NOTE" annotations with small arrows, and an overlapping white CTA card ("Available on iOS, Android, Web.") sits in a corner ([Phone page](https://mobbin.com/sites/sections/03f765e3-3432-4ac7-ab08-a240654f65db)).
- **Component crops**: instead of whole screens, Beside often shows single UI cards out of context: a chat transcript ([Live demo](https://mobbin.com/sites/sections/bacfcd5d-bcca-4640-8fcf-da2f03dc8669)), the "AI Receptionist answered" card with a floating "Ask anything about Beside" input ([Case study hero](https://mobbin.com/sites/sections/5ef7e058-1b1c-49f8-a582-5bd91770f2d0)) and a stat testimonial card ([Agent features](https://mobbin.com/sites/sections/f20db8a5-e144-488e-a895-0132b6d6eb75)). These sit on stone panels or on warm dotted gradient washes.

## Implications for hvn foundations

1. **Type**: use Inter Variable (`@fontsource-variable/inter`) for UI and marketing. Set display at weight 400 with −0.03 to −0.045em tracking, and adopt a marketing ramp close to 64/56/42/36/30/24/20/17/15/13/12. If hvn wants a more distinctive display face, Archivo Variable is the OFL stand-in for the GT America that Beside declares.
2. **Neutrals**: seed from Tailwind `neutral` as the map decides. Beside's warm `stone` ramp (`#fefdfb`, `#f7f6f3`, `#78756f`, `#57534d`, `#1e1d1c`, ink `#0e0e10`) is the tone to aim for. Use an alpha-ink hairline (about 6%) for borders.
3. **Accent**: make blue the single accent and give it more roles than Beside gives its colour. Beside reserves colour for shimmer moments and keeps CTAs black. hvn can either keep a near-black primary button and use blue for links, focus and highlights, or move the primary button to blue. That is a decision for the colour ticket. `#498fff` is a useful light-mode highlight reference near Tailwind `blue-500`.
4. **Shape**: pill buttons and inputs, about 20px card and panel radius, about 12px small-card radius, and a device radius of about 56px for mockups.
5. **Elevation**: default card shadow `0 2px 12px rgb(0 0 0 / .06)`, overlay shadow `0 8px 32px rgb(0 0 0 / .08)`, hero window shadow `0 24px 80px rgb(0 0 0 / .22)`. Separate structure with tone and hairlines, not shadows.
6. **Rhythm**: 80px section padding, 112px from `md`, a 1400px container, and 420–640px text measures. This fits Astryx's default spacing, so no override is needed.
