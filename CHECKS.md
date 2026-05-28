# Checks locaux avant push

Exécute ces étapes dans l'ordre. Règle chaque erreur avant de passer à la suivante.

---

## 1. Dépendances à jour

```bash
pnpm install
```

> Vérifie que le lockfile est propre et qu'il n'y a pas de dépendances manquantes.

---

## 2. TypeScript — zéro erreur de type

```bash
pnpm type-check
```

**Sortie propre :** aucun output, code de sortie 0.

**Erreurs courantes :**
- `Type 'X' is not assignable to type 'Y'` → problème de typage, corriger la valeur ou ajouter un cast
- `Cannot find module '@/...'` → import manquant ou alias non résolu dans `tsconfig.json`
- `Property '...' does not exist on type '...'` → prop manquante dans l'interface ou le type

---

## 3. Lint ESLint (règles Next.js)

```bash
pnpm lint
```

**Sortie propre :** `✔ No ESLint warnings or errors`

**Erreurs courantes :**
- `'X' is defined but never used` → supprimer la variable ou import inutilisé
- `img elements must have an alt prop` → ajouter `alt=""` sur les images décoratives
- `Do not use \`<a>\` elements...` → remplacer par `<Link>` de Next.js
- `react-hooks/exhaustive-deps` → ajouter la dépendance manquante dans le tableau du hook

Pour ignorer une règle sur une ligne (dernier recours) :
```ts
// eslint-disable-next-line @next/next/no-img-element
```

---

## 4. Audit sécurité dépendances

```bash
pnpm audit:deps
```

Équivalent à `pnpm audit --audit-level=high` — ne fait échouer que sur les failles **high** et **critical**.

**Sortie propre :** `No known vulnerabilities found` ou uniquement des failles `low`/`moderate`.

**Si une faille high est trouvée :**
1. Voir si un patch existe : `pnpm audit --fix`
2. Sinon, ajouter un override dans `package.json` :
```json
"pnpm": {
  "overrides": {
    "nom-du-paquet": ">=version-patchée"
  }
}
```
3. Relancer `pnpm install` puis `pnpm audit:deps`

---

## 5. Build production

```bash
pnpm build
```

Nécessite un fichier `.env.local` avec les variables Sanity et Resend (copier `.env.local.example`).

**Sortie propre :** `✓ Compiled successfully` et récapitulatif des routes.

**Erreurs courantes :**
- `Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not defined` → vérifier `.env.local`
- `Type error: ...` → TypeScript bloque le build, corriger d'abord avec `pnpm type-check`
- `Module not found: Can't resolve '...'` → import manquant ou chemin incorrect
- `Dynamic server usage` sur une page statique → ajouter `export const dynamic = 'force-dynamic'` ou `force-static`

---

## 6. Tests Playwright — smoke

Lance le serveur de prod en arrière-plan (nécessite que le build soit fait).

```bash
# Terminal 1
pnpm start

# Terminal 2
pnpm exec playwright test --project=Chromium tests/example.spec.ts
```

Ou en une commande (démarre automatiquement le serveur) :
```bash
pnpm exec playwright test --project=Chromium tests/example.spec.ts
```

**Sortie propre :** `3 passed`

---

## 7. Tests d'accessibilité — WCAG 2.1 AA (base RGAA 4.1)

```bash
pnpm test:a11y
```

> Ou cibler un navigateur spécifique : `pnpm exec playwright test --project=Chromium tests/a11y.spec.ts`

**Sortie propre :** `4 passed`

**Si des violations sont trouvées**, le rapport indique :
- L'impact (`critical`, `serious`, `moderate`, `minor`)
- L'ID de la règle (`color-contrast`, `label`, `button-name`, etc.)
- Le sélecteur CSS de l'élément concerné

**Violations fréquentes et corrections :**

| Règle | Cause | Fix |
|---|---|---|
| `color-contrast` | Texte trop peu contrasté | Augmenter l'opacité ou changer la couleur |
| `label` | `<input>` sans `<label>` associé | Ajouter `htmlFor` + `id` ou `aria-label` |
| `button-name` | Bouton sans texte accessible | Ajouter `aria-label="..."` |
| `link-name` | `<a>` sans texte ou aria-label | Ajouter `aria-label` sur les liens icône |
| `image-alt` | `<img>` sans `alt` | Ajouter `alt=""` (décoratif) ou description |
| `heading-order` | Ordre des titres h1→h2→h3 non respecté | Revoir la hiérarchie des headings |
| `landmark-one-main` | Pas de `<main>` sur la page | Vérifier la structure HTML |

Pour voir le rapport HTML complet après un échec :
```bash
pnpm exec playwright show-report
```

---

## 8. Lighthouse (performance + SEO local)

Nécessite que le build soit fait (`pnpm build`) et que Node.js soit à jour.

```bash
pnpm start &
npx @lhci/cli@0.14 autorun
```

Ou avec un serveur déjà lancé sur le port 3000 :
```bash
npx @lhci/cli@0.14 collect --url=http://localhost:3000
npx @lhci/cli@0.14 assert
```

**Seuils configurés dans `.lighthouserc.json` :**
| Catégorie | Seuil | Niveau |
|---|---|---|
| Performance | ≥ 85 | warn |
| **Accessibilité** | **≥ 90** | **error** |
| Best practices | ≥ 85 | warn |
| **SEO** | **≥ 90** | **error** |

**Si Lighthouse échoue :**
- Performance < 85 → vérifier images non optimisées, JS bloquant, LCP
- Accessibilité < 90 → corriger d'abord avec `pnpm test:a11y`
- SEO < 90 → vérifier meta description, balises title, robots.txt

---

## Commande tout-en-un (qualité rapide)

```bash
pnpm ci
```

Enchaîne : `type-check` → `lint` → `audit:deps`

---

## Checklist avant push

- [ ] `pnpm install` — dépendances à jour
- [ ] `pnpm type-check` — 0 erreur TypeScript
- [ ] `pnpm lint` — 0 erreur ESLint
- [ ] `pnpm audit:deps` — 0 faille high/critical
- [ ] `pnpm build` — build production OK
- [ ] Tests smoke passent
- [ ] Tests a11y passent (ou violations documentées et planifiées)
