# Product

## Register

brand

## Users

**Profil prioritaire : dirigeant de PME nantaise (10 à 50 salariés).**

Contexte : il arrive sur le site via recherche locale ("agence web Nantes") ou recommandation. Il sait qu'il lui faut un vrai site, il compare deux ou trois agences avant de décider. Il n'est pas développeur, mais il a déjà eu un site WordPress décevant et il reconnaît la qualité quand il la voit. Décision business : il engage le budget de son entreprise, il veut sentir qu'il parle à un partenaire sérieux, pas à un freelance ni à une usine à templates.

Profil secondaire : artisans et TPE locales arrivant via SEO local ou bouche-à-oreille. Ils ne sont pas la cible de la home, mais la page pricing et les pages métiers doivent leur laisser une place naturelle.

## Product Purpose

Mobem Solutions est une agence web nantaise spécialisée dans la création de sites professionnels pour PME et artisans (livraison en 10 jours, SEO local inclus, Lighthouse 90+ garanti).

Ce site est une surface de **conversion pure**. Sa seule mission stratégique : amener le visiteur à réserver le diagnostic gratuit. Tout le reste (réalisations, méthode, blog, pages métiers, pages villes) sert ce but unique, soit en générant le trafic qualifié via SEO local, soit en construisant la confiance qui mène au RDV.

Le succès se mesure à un seul indicateur : le nombre de diagnostics réservés via le site.

## Brand Personality

**Expert, direct, sans bullshit.**

Voix d'un spécialiste qui sait de quoi il parle et ne perd pas son temps à le surjouer. On affirme avec précision (chiffres, garanties, méthode), on ne promet pas la lune, on traite le dirigeant en adulte. Pas de jargon SaaS, pas de superlatifs vides, pas de "révolutionnaire". Le ton français vise un "vous" professionnel, jamais condescendant ; le registre est celui d'un pair compétent, pas d'un commercial.

Émotion visée chez le visiteur : la confiance tranquille. Il doit se dire "ces gens savent, je peux leur faire confiance avec mon budget", pas "wow, c'est impressionnant".

## Anti-references

Le site doit se distinguer explicitement des quatre archétypes saturés du marché :

- **L'agence WordPress générique.** Templates Elementor, héros stock photo "business handshake", cards arrondies identiques, palette bleu corporate. Le piège du "site d'agence sans âme".
- **Le SaaS californien copié-collé.** Gradients violets, glassmorphism, hero-métrique "99.9% uptime", grilles d'icônes Lucide interchangeables. Mobem n'est pas un SaaS pour PME.
- **L'agence créative parisienne "awwwards".** Scroll-jacking, transitions 3D décoratives, typo géante qui couvre l'écran, démonstration de force technique sans contenu. Le piège du "on est plus cools que vous".
- **La boîte de conseil corpo (style KPMG).** Bleu marine + gris froid, photo d'équipe en costume, ton institutionnel impersonnel. Mobem est une agence, pas un cabinet.

Conséquence : la direction artistique éditoriale déjà en place (palette Ink / Paper / Signal Red, radius 0, mélange Inter + DM Serif Display + JetBrains Mono, grille Swiss/bento) est la bonne réponse, et il faut la défendre contre toute dérive vers l'un de ces quatre lanes.

## Design Principles

1. **Practice what you preach.** L'agence vend de la qualité web, donc chaque pixel est la démonstration en direct. Un détail bâclé sur ce site est un argument commercial perdu. Performance, accessibilité, micro-interactions, copy : tout doit être au niveau de ce qu'on promet aux clients.
2. **Show, don't tell.** Les promesses ("10 jours", "Lighthouse 90+", "SEO local") doivent être prouvées par le site lui-même avant d'être annoncées. Performance réelle visible, soin du détail palpable, langage précis. Le visiteur conclut par lui-même.
3. **Confiance par la précision, pas par l'emphase.** "Expert, direct, sans bullshit" interdit les méga-CTA criards, les "GARANTIE 100 %", les superlatifs. La confiance vient de la rigueur formelle : typographie maîtrisée, chiffres exacts, copy condensé. On ne hausse jamais la voix.
4. **Local sans folklore.** Nantes est une donnée structurante (SEO local, pages villes, schema LocalBusiness) mais jamais une posture esthétique. Pas de bleu Loire, pas de référence aux ducs de Bretagne, pas de "à l'Ouest c'est mieux". Le local est un fait, pas un argument de marque.
5. **Une seule conversion compte.** Chaque section doit, directement ou indirectement, conduire vers le diagnostic gratuit. Newsletter, contact direct, articles de blog : autorisés, mais toujours secondaires et visuellement discrets par rapport au CTA principal.

## Accessibility & Inclusion

Cible : **WCAG 2.2 niveau AA** sur l'ensemble du site, avec respect strict de `prefers-reduced-motion`.

Exigences concrètes :

- Contrastes AA validés pour tous les couples texte/fond, y compris le rouge Signal sur fond clair (à vérifier au cas par cas, certains usages sont limites).
- Navigation clavier complète, focus visible non ambigu, skip-link déjà en place sur la home.
- Toutes les animations décoratives (fade-up, marquee, custom cursor, ripple, blinking caret) doivent se désactiver sous `prefers-reduced-motion`. La base est en place dans `globals.css`, à étendre systématiquement à toute nouvelle animation.
- Le custom cursor doit disparaître sur les surfaces tactiles (déjà géré via `@media (hover: none)`).
- Langue déclarée `fr` au niveau racine ; tout contenu en anglais (rare) doit porter `lang="en"` localement.
- Le rouge Signal n'est jamais le seul porteur d'information (toujours doublé d'un mot, d'une icône ou d'un changement de poids typographique).
