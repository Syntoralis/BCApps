# Syntoralis — BCApps

[![Documentation](https://img.shields.io/badge/Docs-GitHub%20Pages-blue)](https://syntoralis.github.io/BCApps/)
[![Accessibilité RGAA](https://img.shields.io/badge/Accessibilité-RGAA%20AAA-brightgreen)](https://syntoralis.github.io/BCApps/)
[![Licence](https://img.shields.io/badge/Licence-Propriétaire-red)](#licence)

Dépôt des **extensions Microsoft Dynamics 365 Business Central** développées par **Syntoralis EURL**, accompagnées de leur documentation bilingue (FR/EN). La documentation est publiée automatiquement via GitHub Pages.

🌐 **[Documentation en ligne](https://syntoralis.github.io/BCApps/)** · 🌐 **[syntoralis.eu](https://syntoralis.eu)**

---

## Table des matières

- [À propos](#à-propos)
- [Structure du projet](#structure-du-projet)
- [Extensions disponibles](#extensions-disponibles)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Charte graphique (Branding)](#charte-graphique-branding)
- [Déploiement](#déploiement)
- [Sécurité](#sécurité)
- [Accessibilité](#accessibilité)
- [Licence](#licence)

---

## À propos

Syntoralis développe des extensions pour **Microsoft Dynamics 365 Business Central** destinées à optimiser la gestion d'entrepôt, avec un focus sur la rotation FIFO des stocks. Ce dépôt regroupe les paquets d'extension (`.app`) prêts à installer ainsi que la documentation utilisateur et technique associée, disponible en français et en anglais.

Le site de documentation est construit avec **Jekyll** et déployé automatiquement sur **GitHub Pages** à chaque poussée sur la branche `main`.

**Périmètre :** gestion d'entrepôt · prélèvement FIFO · articles suivis par lot et numéro de série · compatibilité FEFO.

---

## Structure du projet

```
BCApps/
├── .github/
│   └── workflows/
│       └── gh-pages.yml          # Build & déploiement Jekyll → GitHub Pages
├── AppSource/
│   └── Syntoralis-fifo-logistic/
│       └── SYNTORALIS_..._1.0.0.57.app  # Paquet d'extension Business Central
├── docs/                         # Source du site de documentation (Jekyll)
│   ├── _config.yml               # Configuration Jekyll
│   ├── _layouts/
│   │   └── default.html          # Layout principal
│   ├── assets/
│   │   └── css/
│   │       └── style.css         # Feuille de style (thèmes clair/sombre)
│   ├── img/                      # Images et logos
│   ├── index.md / index-en.md    # Pages d'accueil FR / EN
│   └── syntoralis-fifo-logistic/ # Documentation de l'extension (FR / EN)
└── README.md
```

---

## Extensions disponibles

### Syntoralis FIFO Logistic — v1.0.0.57

Moteur de prélèvement **FIFO** pour Business Central : sélection des stocks selon la date/heure réelle d'entrée en stock, pour les prélèvements entrepôt, inventaire, mouvements et réapprovisionnements. Compatible avec les articles suivis par lot, numéro de série et dates d'expiration (FEFO).

- 📖 [Documentation FR](https://syntoralis.github.io/BCApps/syntoralis-fifo-logistic/) · [EN](https://syntoralis.github.io/BCApps/syntoralis-fifo-logistic/index-en.html)
- ⬇️ [Télécharger le .app](https://github.com/Syntoralis/BCApps/tree/main/AppSource/Syntoralis-fifo-logistic)
---

## Fonctionnalités

| Fonctionnalité | Détail |
|---|---|
| **Bilingue FR / EN** | Documentation en deux langues avec switcher de langue |
| **Mode sombre / clair** | Détection automatique (`prefers-color-scheme`) + bascule manuelle persistée via `localStorage` |
| **Diagrammes Mermaid** | Schémas de processus rendus côté client |
| **Navigation mobile** | Menu burger accessible (`aria-expanded`) |
| **SEO** | Balises `hreflang`, `robots`, Open Graph |
| **Déploiement automatique** | Build Jekyll + publication GitHub Pages via GitHub Actions |

---

## Stack technique

- **Extensions :** Microsoft Dynamics 365 Business Central (AL), paquets `.app`
- **Documentation :** Jekyll (Ruby) + kramdown, déployée sur GitHub Pages
- **Frontend :** HTML5 sémantique, CSS3 avec variables custom (thèmes clair/sombre), JavaScript vanilla
- **Diagrammes :** Mermaid (CDN)
- **CI/CD :** GitHub Actions (`.github/workflows/gh-pages.yml`)

---

## Charte graphique (Branding)

Identité visuelle commune avec le site Syntoralis, définie dans `docs/assets/css/style.css` et le logo SVG. Design sobre, accessible (RGAA AAA) et éco-conçu : zéro police web, zéro framework lourd, contrastes > 7:1.

### Logo

- **Fichier principal :** `docs/img/logo-syntoralis.rs.svg` (format vectoriel) — privilégié pour le web.
- **Variantes raster :** `.png` / `.webp` / `.avif` pour les usages bitmap.
- **Couleur du logo :** vert institutionnel `#81c784` (SVG), teinté dynamiquement via `fill: var(--accent-color)`.

### Palette de couleurs

#### Mode clair (`:root`)

| Token CSS | Valeur | Usage |
|---|---|---|
| `--bg-color` | `#ffffff` | Fond de page |
| `--text-color` | `#1a1a1a` | Texte courant |
| `--card-bg` | `#f5f5f5` | Fond des cartes / champs |
| `--border-color` | `#cccccc` | Bordures |
| `--accent-color` | `#1B5E20` | Accent (liens, titres, boutons) |
| `--focus-outline` | `3px solid #1B5E20` | Contour de focus |

#### Mode sombre (`[data-theme="dark"]`)

| Token CSS | Valeur | Usage |
|---|---|---|
| `--bg-color` | `#121212` | Fond de page |
| `--text-color` | `#e0e0e0` | Texte courant |
| `--card-bg` | `#1e1e1e` | Fond des cartes / champs |
| `--border-color` | `#444444` | Bordures |
| `--accent-color` | `#69F0AE` | Accent — vert néon doux |
| `--focus-outline` | `3px solid #69F0AE` | Contour de focus |

### Typographie

- **Famille principale :** `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` (polices système, aucune requête web, zéro FOUT/FOIT).
- **Poids :** 600 pour les titres, 700 pour le logo et les badges, normal pour le corps.
- **Tailles :** `h1` 2.2 rem · `h2` 1.8 rem · `h3` 1.4 rem · `h4` 1.2 rem · corps 1 rem · interligne 1.6.

### Principes de la charte

- **Minimaliste et institutionnel** : fond blanc/noir, accent vert unique, pas de dégradés ni d'effets lourds.
- **Sobre** : uniquement des transitions `transform`/`opacity`.
- **Accessible** : couleurs validées pour le contraste, focus visible, typographie système lisible.
- **Éco-conçu** : variables CSS centralisées, zéro dépendance externe lourde, images optimisées.

---

## Déploiement

### Documentation (GitHub Pages)

Le site est généré par Jekyll depuis le dossier `docs/` et déployé automatiquement :

1. Pousser sur la branche `main`.
2. Le workflow `.github/workflows/gh-pages.yml` installe Ruby/Jekyll, build le site et le publie sur GitHub Pages.
3. La documentation est disponible à `https://syntoralis.github.io/BCApps/`.

**Prévisualisation locale :**

```bash
cd docs
bundle install
bundle exec jekyll serve
# puis ouvrir http://localhost:4000/BCApps/
```

### Extension (.app)

1. Compiler l'extension en AL (Visual Studio Code + AL Language).
2. Déposer le fichier `.app` dans `AppSource/Syntoralis-fifo-logistic/`.
3. Mettre à jour le lien de téléchargement dans la documentation si la version change.

> Aucune compilation nécessaire pour la documentation ; Jekyll suffit.

---

## Sécurité

- Le dépôt ne contient ni secret ni configuration serveur.
- La documentation est servie en **HTTPS** par GitHub Pages.
- Les dépendances externes se limitent à Mermaid (CDN) pour les diagrammes.

---

## Accessibilité

La documentation vise la conformité **RGAA AAA** :

- Lien d'évitement (*skip link*) vers le contenu principal
- Navigation entièrement utilisable au clavier (focus visible, `aria-*`)
- Icônes décoratives masquées aux lecteurs d'écran (`aria-hidden`)
- Contraste des couleurs > 7:1 en mode clair et sombre
- Attribut `lang` défini sur chaque page
- Switcher de langue avec attributs `hreflang`

---

© Syntoralis EURL — Tous droits réservés.

Le code source des extensions et de la documentation est la propriété exclusive de Syntoralis EURL. Toute reproduction, distribution ou utilisation à des fins commerciales sans autorisation écrite préalable est interdite.

