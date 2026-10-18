# Mobem Solutions — Style Reference

> Blue-lit automation studio. Quiet white space around compact black type; saturated blue controls and layered workflow imagery create the focal points.

**Theme:** light only (`forcedTheme="light"`).

## Positioning
- Mobem sells **recovered hours, not software**. Mobem Solutions (founded by Arnaud Clavier, solo, near Nantes) finds the admin tasks wasting a small business's time, automates them on the client's own tools, then measures the hours saved. Copy speaks for the company (« nous », « Mobem Solutions »), never in the founder's first person; never mention associates or a GME. The founder appears only once, discreetly (small black-and-white portrait on À propos).
- Signature: « Diagnostiquer avant de prescrire. »
- Priority audiences, one page each (`/metiers/...`): organismes de formation Qualiopi, courtiers en assurance, cabinets d'expertise comptable. Wider: TPE-PME de 2 à 50 personnes.
- French, vouvoiement, short concrete sentences in the trade's own words.
- Every promise is expressed in hours per month; every market figure shows its source (13px Soft Charcoal caption). Hours shown on the site are labelled « exemple type ».
- Trust line: « Installé sur vos propres comptes. Vos données restent chez vous. »
- Jargon (n8n, API, workflow, agent IA) only in « Sous le capot » and the FAQ — never in headlines, buttons or hero.
- No invented testimonials, client logos or unmeasured results. No mention of the former web-agency offer on main pages.

## Tokens (see `app/globals.css`)
| Name | Value | Tailwind |
|---|---|---|
| Paper White | `#ffffff` | `bg-background`, `bg-white` |
| Absolute Ink | `#000000` | `text-ink` |
| Graphite | `#161618` | `text-graphite` |
| Soft Charcoal | `#6a6a6b` | `text-charcoal` |
| Studio Black | `#0f0f12` | `bg-studio` |
| Electric Capture Blue | `#0d44e8` | `bg-blue`, `bg-accent` |
| Electric Blue Sweep | `linear-gradient(90deg, #161618 0%, #161618 60%, #174ef2 100%)` | `var(--gradient-electric-blue-sweep)`, `text-sweep` |

Logo: `components/ui/mobem-logo.tsx` (three linked nodes + « Mobem / Solutions »), pure black on transparent (white on dark surfaces). Favicon: `app/icon.svg`.

Font: Google Sans Flex (next/font, variable — weights 400/450/550/600), fallback Inter.

Type utilities (named `type-*` so tailwind-merge doesn't strip them next to `text-<color>`):
`type-display` 60/66 600 · `type-section` 40/48 600 · `type-feature` 20/28 600 · `type-body` 18/30 450 · `type-nav` 15 550 · `type-meta` 14 550 · `type-caption` 13 450.

Radii: cards & media 20px · buttons, badges, inputs 14px · icon controls 9999px. Never pill-shaped rectangular buttons.

Shadows: `shadow-card` (graphite multi-layer), `shadow-blue` (button inset), `shadow-chip`, `shadow-float`.

## Components
- `btn-blue` — filled diagnostic / exploration button only (« Réserver mon diagnostic gratuit », « Voir si c'est automatisable chez moi »). Never « Acheter ».
- `btn-outline` — white, 1px graphite border (« Voir un exemple en 2 min »).
- `chip-dark` / `chip-light` — Studio Black announcement badge / white step badge on dark panels.
- `card-lift` — white 20px card with the graphite shadow stack.
- `icon-control` — 40px circular control.
- `WorkflowPanel` — dark panel of trade-verb step nodes; the active step glows blue (`step-active`).
- `ProofPane`, `RemindersPane`, `InboxPane` — client-tool panes in action; `BeforeAfterCard` for hours.
- `TradeVisual` — `blue-field` media container + pane + floating workflow panel.
- `DiagnosticButton` / `DiagnosticModal` — Calendly booking (email prefill from the closing band).

## Do / Don't
- Blue only for booking/exploration controls and the active workflow step — never as a page background or text color.
- Supporting copy in Soft Charcoal 18/30, not Ink.
- No 700–800 display weights; no heavy black shadows; no colorful semantic badge palettes.
- No robots, brains, glowing circuits. The only photo is the founder's small black-and-white portrait.
- Screenshots/panes always cropped inside 20px media cards.

## Langage « studio calme » (inspiré de Cap)

Un canevas blanc et calme, des traits fins, une seule touche de bleu (#0d44e8). Ni halo, ni dégradé, ni ombre lourde.

- **Boutons** : pilules. Noir (`btn-dark`) pour l'action secondaire à gauche, bleu (`btn-blue`) pour réserver à droite.
  Bouton discret : `btn-outline` (trait fin gris).
- **Sur-titres** : composant `Eyebrow` (capitales 12 px, interlettrage 0,2 em, gris), sans pastille.
- **Cartes** : utilitaire `hairline` (fond #fcfcfc, bordure 1 px, rayon 12 px, sans ombre). Icône dans un `icon-tile`
  (carré 40 px, fond bleu très pâle, icône bleue).
- **Illustrations** : à plat sur `art-panel` (gris très clair). Formes blanches cernées d'un trait noir de 2 px,
  accents en bleu plein. Aucun dégradé, aucune ombre portée.
- **Hero** : deux colonnes, texte à gauche, liste « Cette semaine » qui se coche toute seule à droite.
