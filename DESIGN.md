---
name: Mobem Solutions
description: Système éditorial Ink / Paper / Signal Red — agence web nantaise (PME et artisans).
colors:
  paper: "oklch(0.973 0.003 80)"
  ink: "oklch(0.07 0 0)"
  charbon: "oklch(0.11 0.006 55)"
  signal-red: "oklch(0.51 0.22 27)"
  gris: "oklch(0.59 0 0)"
  rule: "oklch(0.90 0 0)"
  carte-claire: "oklch(1 0 0)"
  carte-sombre: "oklch(0.14 0.005 55)"
  rule-sombre: "oklch(0.24 0.005 55)"
typography:
  display:
    fontFamily: "var(--font-inter), Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(48px, 8.5vw, 136px)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.045em"
  display-serif:
    fontFamily: "var(--font-dm-serif), Times New Roman, serif"
    fontSize: "clamp(48px, 8.5vw, 136px)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.02em"
    fontStyle: "italic"
  headline:
    fontFamily: "var(--font-inter), Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 5vw, 56px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "var(--font-inter), Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.02em"
  body:
    fontFamily: "var(--font-inter), Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "var(--font-inter), Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-jetbrains), ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  label-micro:
    fontFamily: "var(--font-jetbrains), ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.16em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  hairline: "2px"
  card: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "56px"
  hero: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-outline-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  button-default:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
    height: "40px"
  input-focus:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.carte-claire}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  swiss-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px"
  badge-accent:
    backgroundColor: "transparent"
    textColor: "{colors.signal-red}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
---

# Design System: Mobem Solutions

## 1. Overview

**Creative North Star: "The Atelier Editorial"**

Mobem ne ressemble pas à une agence web. Le système emprunte au magazine d'architecture imprimé : papier ivoire (Paper), encre profonde (Ink), une encre signalétique rouge utilisée comme une annotation typographique, et un tracé Swiss strictement orthogonal où chaque filet de 1px porte du sens. Les coins sont durs par doctrine, les fontes sont mixtes par intention (Inter pour la matière, DM Serif Display en italique pour le geste, JetBrains Mono pour les métadonnées système), les sections sont numérotées en chiffres mono comme des spreads de revue.

Cette posture sert directement la stratégie de PRODUCT.md : un dirigeant de PME qui compare trois agences doit, en cinq secondes, sentir qu'il parle à un atelier de spécialistes, pas à une usine WordPress, pas à un SaaS californien, pas à une boîte awwwards qui scroll-jacke, pas à un cabinet KPMG en bleu marine. Le système rejette explicitement les quatre familles : pas de gradient, pas de glassmorphism, pas de bleu corporate, pas de hero-métrique, pas de cards arrondies identiques.

**Key Characteristics :**

- **Plat par défaut.** Ombres rares, profondeur par filets de 1px et par contraste de couleur, jamais par flou.
- **Radius zéro.** L'arrondi est l'exception, signalée et justifiée (avatars, pulse dot, components Radix hérités).
- **Triple typo intentionnelle.** Inter (corps & headlines), DM Serif Display italique (gestes émotionnels), JetBrains Mono (labels système).
- **Un seul accent.** Le Signal Red porte la conversion ; il n'est jamais décoratif.
- **Numérotation visible.** Sections, KPI, navigation utilisent des index mono (`01`, `02`, `S1`, `S2`) qui font partie de l'identité.
- **Mode sombre = charbon chaud.** Jamais noir pur, jamais "tech-bro dark mode".

## 2. Colors: La palette Refonte

Palette éditoriale stricte : un fond, une encre, un signal. Tout le reste est dérivé (gris de filets, surfaces sombres, états hover) et n'apparaît qu'en service du trio.

### Primary

- **Signal Red** (`oklch(0.51 0.22 27)`) : l'encre signalétique. Utilisé sur le CTA principal "Diagnostic gratuit", sur les liens d'action critique, sur le caret typographique du hero, sur le live-dot de disponibilité, sur les focus rings. Jamais sur un fond plein de plus de quelques composants à la fois. Sa rareté est sa fonction.

### Neutral

- **Paper** (`oklch(0.973 0.003 80)`) : fond chaud légèrement ivoire (chroma 0.003, hue 80 ≈ jaune chaud). Surface principale en mode clair. Tinté volontairement pour ne jamais ressembler au blanc clinique d'un SaaS.
- **Ink** (`oklch(0.07 0 0)`) : encre profonde quasi-noire. Texte principal en clair, fond CTA secondaire, élément graphique de plein.
- **Charbon chaud** (`oklch(0.11 0.006 55)`) : fond du mode sombre. Hue 55 (brun chaud), pas un noir bleuté. Identité tactile, pas tech-cliché.
- **Gris** (`oklch(0.59 0 0)`) : texte secondaire (`muted-foreground`), métadonnées, légendes. Le seul gris du système.
- **Rule** (`oklch(0.90 0 0)`) en clair, (`oklch(0.24 0.005 55)`) en sombre : filets de 1px qui structurent la grille Swiss. Visible mais discret.
- **Carte** : surface légèrement décalée du fond, ouvre une hiérarchie de profondeur sans ombre (`oklch(1 0 0)` clair, `oklch(0.14 0.005 55)` sombre).

### Named Rules

**The One Voice Rule.** Le Signal Red est le seul accent du système. Pas de "color-1 / color-2 / color-3" inventés. Quand un graphique a besoin de plusieurs couleurs (charts Recharts), les chart-2/3/4/5 existent en tokens mais ne sortent JAMAIS de l'usage data-visualisation.

**The Warm Neutral Rule.** Aucun `#000`, aucun `#fff`, jamais. Paper, Ink, Charbon, Gris sont tous tintés. Cette chaleur est la différence palpable entre Mobem et un site d'agence corporate.

**The Doubled Signal Rule.** Le rouge n'est jamais seul porteur d'information. Il est toujours doublé d'un mot, d'une flèche, d'un changement de poids, d'une icône. Daltonisme et a11y AA non négociables.

## 3. Typography

**Display Font :** Inter (sans, variable) avec fallback Helvetica Neue, Arial.
**Serif accent :** DM Serif Display (italique uniquement) avec fallback Times New Roman, serif.
**Body Font :** Inter (même famille que Display, variantes de poids et de taille).
**Label / Mono :** JetBrains Mono avec fallback ui-monospace.

**Character :** triade délibérée. Inter porte la masse (rigueur, lisibilité, suisse). DM Serif italique ajoute la respiration humaine, le geste manuscrit, le contraste éditorial — utilisé uniquement sur les segments émotionnels du hero et des headlines clés ("à l'échelle humaine"). JetBrains Mono porte la métadonnée : numéros de section, labels uppercase, indicateurs de système. Le mix imite la mise en page d'une revue d'architecture, jamais un site portfolio générique.

### Hierarchy

- **Display** (700, `clamp(48px, 8.5vw, 136px)`, line-height 0.88, letter-spacing -0.045em) : hero h1 uniquement. Tracking serré, line-height serré. Le titre du hero respire vers le bas via une grille, pas via des marges internes.
- **Display Serif Italic** (DM Serif 400, italique, mêmes dimensions que Display, letter-spacing -0.02em) : segment émotionnel intra-titre, jamais en bloc. Précédé d'un retour à la ligne, jamais d'un sous-titre indépendant.
- **Headline** (700, `clamp(36px, 5vw, 56px)`, line-height 1, letter-spacing -0.03em) : titres de section quand ils existent (page realisations, blog, methode). Souvent remplacés par un label mono uppercase de 13px en home.
- **Title** (500, 13px, uppercase, letter-spacing 0.02em) : titre fonctionnel de section sur la home ("Services", "Réalisations"). Posture éditoriale assumée : on numérote et on classe, on ne crie pas.
- **Body** (400, 17px, line-height 1.5) : paragraphes principaux. Cap à 65-75ch obligatoire.
- **Body Small** (400, 14px, line-height 1.5) : descriptions, sub-rows du hero, item lists.
- **Label** (mono 400, 11px, uppercase, letter-spacing 0.06em) : tous les marqueurs système : numéros de section "01", catégories de dropdown, KPI captions, "Engagement", "Nantes · France · 2026".
- **Label Micro** (mono 400, 10px, uppercase, letter-spacing 0.16em) : labels verticaux (writing-mode vertical-rl), watermarks éditoriaux, signature en pied de section.

### Named Rules

**The Italic-Serif Rule.** DM Serif Display n'apparaît qu'en italique, et uniquement comme contrepoint dans un titre. Jamais en bloc, jamais en regular, jamais sur un paragraphe.

**The Mono-As-System Rule.** JetBrains Mono est réservé aux indicateurs de système : numéros, labels uppercase, métadonnées. Jamais de prose en mono, jamais de CTA en mono.

**The 65ch Rule.** Tout paragraphe de body texte dépasse 65ch ⇒ il est cassé ou recolonné. Pas de pavé long pleine largeur sur desktop.

## 4. Elevation

Système quasi-plat. La profondeur est dite par contraste de couleur (Paper vs. Card), par filets de 1px, et par la grille Swiss visible. Les ombres sont l'exception, pas la règle.

### Shadow Vocabulary

- **Aucune ombre sur surfaces de base.** Hero, sections, KPI strip, cards de pricing, bento : toutes plates.
- **`shadow-sm`** (Tailwind default, très subtile) : Card primitive uniquement, et rarement appelée à l'intérieur des sections de marque.
- **`shadow-xl`** (Tailwind default, marquée) : dropdowns de navigation flottants uniquement. C'est un signal d'overlay, pas de hiérarchie permanente.

### Named Rules

**The Flat-By-Default Rule.** La profondeur naît des filets, pas du flou. Tout drop-shadow décoratif est interdit. Les seules exceptions sont les overlays (dropdowns, dialogs Radix) où l'ombre signale le détachement du flux.

**The Grid-As-Depth Rule.** La grille Swiss (`gap: 1px` sur fond `--border`) suffit à structurer une section. Pas besoin de "boxes" séparées : les cellules SONT les boxes.

## 5. Components

### Boutons

- **Shape :** rectangle franc, radius 0. Aucun bouton du système n'est arrondi.
- **Primary (`cta-hover` / `bg-accent`) :** fond Signal Red, texte Paper, 12px 20px de padding, font-medium 14px. Hover : fond → Ink (clair) ou Charbon teinté (sombre), texte → Paper. Transition 220ms ease sur background. Toujours accompagné d'une `<ArrowRight />` Lucide 16px à droite.
- **Default (Radix Button variant `default`) :** fond Ink, texte Paper, h-10, px-4. Usage interne (formulaires, modales).
- **Outline :** transparent + border Rule, texte Ink. Hover : border → Ink. Lecture comme un "secondary" technique, jamais à côté du Primary dans le même cluster CTA si on veut préserver la hiérarchie.
- **Ghost :** texte muted, hover bg muted. Réservé aux actions de nav et clusters icônes.
- **Focus :** ring 2px Signal Red + offset 2px. Non négociable, posé en CSS de base (`globals.css`).
- **Bouton mono d'onglet (mobile tab switcher du pricing) :** font mono 11px uppercase, padding 12px 16px, état actif = fond Ink + texte Paper, état inactif = texte gris + hover bg secondary.

### Inputs / Fields

- **Style :** fond Paper (ou Carte sombre), border 1px Rule, h-10, px-3, font 14px. Pas de radius.
- **Focus :** la border passe à Ink (foreground), `ring-0` (le ring lift est inutile car la border elle-même répond). Transition 200ms.
- **Erreur :** `aria-invalid` ⇒ border passe à Signal Red.
- **Placeholder :** Gris (`text-muted-foreground`).

### Cartes & Conteneurs

- **Card primitive (Radix-based, `components/ui/card.tsx`) :** radius 4px (token `rounded-xl`, hérité de `--radius + 4px`), background Card, border Rule, padding `py-6 px-6` interne, ombre minimale `shadow-sm`. Utilisé pour conteneurs intra-formulaire.
- **Swiss Cell (signature) :** zéro radius, pas de border interne, fond Paper sur fond Rule via `.swiss-grid { gap: 1px; background: var(--border) }`. Padding intérieur 32-48px. La cellule remplace la card sur tout layout multi-colonnes (KPI strip, pricing desktop, bento grid).
- **Bento Cell :** identique à Swiss Cell mais avec `bento-hover` (sur hover : fond → Foreground, texte → Background). Inversion brutale, pas de fondu de couleurs.

### Navigation

- **Style :** numérotation visible (`01`, `02`, `03`). Items text-sm 14px muted, hover text-foreground. Pas de underline, pas de pill, pas de fond.
- **Active state :** absent (la couleur du lien suffit). On suppose que le visiteur sait où il est par le contenu de la page.
- **Dropdowns :** panneau Card avec `shadow-xl` (l'exception ombre), border Rule, max-width 480-700px, grid 2-3 colonnes de listes mono-labeled. Footer du dropdown avec lien "Voir tout" en Signal Red mono uppercase.
- **CTA dans nav :** bouton primary Signal Red avec ArrowRight, jamais à plus de un par header.
- **Ripple :** sur pointer-down des items de nav, une vague circulaire `nav-ripple` 550ms. Effet discret, taillé pour récompenser le clic sans détourner.

### Signature Components

**Custom Cursor (`#mobem-cursor`).** Curseur natif masqué sur les surfaces marquées `data-cursor`. Petit dot 12px par défaut, gonfle à 64px Signal Red avec `mix-blend-mode: difference` au hover sur les zones d'action, devient une caret verticale 3×22px sur les zones de texte. Désactivé sur surfaces tactiles (`@media (hover: none)`).

**Caret typographique.** Un caret terminal 0.055em × 0.78em fond Signal Red qui clignote (`steps(2)` 1.05s) à la fin du segment italique du hero. Signal de "système vivant", pas de "à compléter".

**Live availability dot.** Pastille 8px Signal Red avec animation `pulse-dot` 2s (box-shadow expanding ring). Posée à côté de la mention de disponibilité dans le footer / contact.

**KPI Strip.** Bande horizontale 4 cellules Swiss, chacune avec label mono "0N · {key}", chiffre 36-44px bold tracking serré, description gris 12px. Signature visuelle du hero, jamais réutilisée ailleurs (pas de SaaS hero-metric template).

**Vertical Editorial Label.** Texte mono 10px uppercase letter-spacing 0.16em en `writing-mode: vertical-rl` rotation 180deg, opacité 25%. Marqueur "Nantes · France · 2026" en marge droite. Posture éditoriale assumée.

## 6. Do's and Don'ts

### Do:

- **Do** utiliser le **Signal Red** uniquement sur le CTA principal, le caret, le live-dot, les focus rings et les liens d'action critique. Si tu hésites à le poser, ne le pose pas.
- **Do** numéroter explicitement les sections, KPI, offres (`01`, `02`, `S1`, `S2`). C'est la signature éditoriale.
- **Do** utiliser la grille Swiss (`gap: 1px` sur fond `--border`) pour tout layout multi-cellules. Les filets sont la profondeur.
- **Do** mixer Inter + DM Serif italique + JetBrains Mono selon leurs rôles définis. Tout titre émotionnel mérite une bascule serif italique courte ; toute métadonnée mérite la mono.
- **Do** garder les corners durs (`rounded-none`). Si une primitive Radix a un radius hérité, soit on l'aplatit, soit on l'isole (avatar, pastille, badge ronde).
- **Do** prouver `prefers-reduced-motion` sur toute nouvelle animation. `globals.css` couvre la base ; toute nouvelle keyframe doit s'y plier.
- **Do** capper le body texte à 65-75ch.
- **Do** doubler le Signal Red d'un mot, d'une icône ou d'un poids quand il porte de l'information. Daltonisme non négociable.

### Don't:

- **Don't** ressortir un gradient (`linear-gradient`, `bg-gradient-to-*`). Aucun. Le système est plat. Le piège SaaS californien commence là.
- **Don't** appliquer `background-clip: text` avec un gradient. Le **gradient text** est interdit (loi partagée du skill, et trahison directe du registre éditorial).
- **Don't** poser de glassmorphism (`backdrop-blur` + opacité translucide) sur une carte décorative. Le seul `backdrop-blur` autorisé est celui du header au scroll, et il signale un état, pas une esthétique.
- **Don't** dupliquer le template hero-métrique (gros chiffre + petit label + accent gradient). La KPI Strip de Mobem est numérotée et mono ; elle ne ressemble pas à "99.9% Uptime".
- **Don't** générer des grilles de cards identiques icône + heading + texte. La grille Swiss + bento existent précisément pour casser cette monotonie.
- **Don't** utiliser de **side-stripe border** (`border-l-4` rouge sur une callout). Interdit système-wide. Si tu veux signaler une callout, utilise une numérotation, un label mono ou un fond Carte.
- **Don't** sortir le bleu corporate, le bleu Loire, le bleu marine, ni aucun second accent. Le système est mono-accent par doctrine.
- **Don't** copier un visuel awwwards (scroll-jacking, 3D décoratif, typo géante qui couvre l'écran). La force du système est la rigueur, pas la démonstration.
- **Don't** copier un visuel KPMG (photo équipe costume, fond bleu marine, texture corporate). On est une agence, pas un cabinet.
- **Don't** poser un emoji ni un em dash (`—` n'est pas un em dash mais `--` est interdit en copy ; on utilise virgule, point-virgule, deux-points, parenthèses).
- **Don't** utiliser DM Serif en regular non-italique, ni en bloc de prose. C'est un geste, pas une matière.
- **Don't** introduire un nouveau radius. Les seules valeurs autorisées sont 0, 2px (hairline), 4px (card primitive Radix), 9999px (full pour avatars et pastilles).
- **Don't** utiliser `#000` ou `#fff` nulle part. Tous les neutres sont tintés.
