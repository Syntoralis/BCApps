---
layout: default
title: "Analytics & KPI — Syntoralis FIFO Logistic"
lang: fr
description: "Convention UTM, événements GA4/Clarity et tableau de bord KPI pour l'offre Syntoralis FIFO Logistic."
alt_url: /internal/analytics-en.html
noindex: true
sitemap: false
---

# Analytics & KPI

## Convention UTM

Tous les liens vers le Microsoft Marketplace passent par l'include `marketplace-link.html` et portent :

- `utm_source = docs`
- `utm_medium = cta`
- `utm_campaign = fifo-logistic`
- `utm_content = <placement>` (ex. `sales-hero-fr`, `trial-convert-en`)

## IDs à renseigner

Dans `docs/_config.yml` :

```yaml
ga4_measurement_id: "G-XXXXXXX"
clarity_project_id: "xxxxxxxxxx"
```

## Événements GA4 recommandés

| Événement | Déclencheur |
|---|---|
| `cta_click` | Clic sur un CTA Marketplace (avec `placement`) |
| `trial_start_click` | Clic "Démarrer l'essai" |
| `doc_view` | Vue d'une page de documentation |
| `language_switch` | Changement FR/EN |

## Tableau de bord KPI

| KPI | Source | Objectif |
|---|---|---|
| Sessions / mois | GA4 | croissance |
| Taux de clic CTA (CTR) | GA4 | > 5 % |
| Démarrages d'essai | Marketplace + GA4 | croissance |
| Taux de conversion essai → payant | Marketplace | > 15 % |
| Pages les plus vues | GA4 | optimiser contenu |
| Taux de rebond | GA4 | < 60 % |

## Microsoft Clarity

Activer Clarity pour les heatmaps et enregistrements de session. Renseigner `clarity_project_id` dans `_config.yml` (le snippet est déjà intégré dans le layout).