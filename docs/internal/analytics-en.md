---
layout: default
title: "Analytics & KPI — Syntoralis FIFO Logistic"
lang: en
description: "UTM convention, GA4/Clarity events and KPI dashboard for the Syntoralis FIFO Logistic offer."
alt_url: /internal/analytics.html
noindex: true
sitemap: false
---

# Analytics & KPI

## UTM convention

All links to the Microsoft Marketplace go through the `marketplace-link.html` include and carry:

- `utm_source = docs`
- `utm_medium = cta`
- `utm_campaign = fifo-logistic`
- `utm_content = <placement>` (e.g. `sales-hero-en`, `trial-convert-fr`)

## IDs to fill in

In `docs/_config.yml`:

```yaml
ga4_measurement_id: "G-XXXXXXX"
clarity_project_id: "xxxxxxxxxx"
```

## Recommended GA4 events

| Event | Trigger |
|---|---|
| `cta_click` | Click on a Marketplace CTA (with `placement`) |
| `trial_start_click` | Click "Start trial" |
| `doc_view` | View of a documentation page |
| `language_switch` | FR/EN switch |

## KPI dashboard

| KPI | Source | Target |
|---|---|---|
| Sessions / month | GA4 | growth |
| CTA click-through rate (CTR) | GA4 | > 5 % |
| Trial starts | Marketplace + GA4 | growth |
| Trial → paid conversion rate | Marketplace | > 15 % |
| Top pages | GA4 | optimize content |
| Bounce rate | GA4 | < 60 % |

## Cookie consent

GA4 and Clarity scripts are loaded only after acceptance via the cookie banner (`docs/_includes/cookie-consent.html`). The choice is stored in `localStorage` (`syntoralis_cookie_consent`).

## Microsoft Clarity

Enable Clarity for heatmaps and session recordings. Fill in `clarity_project_id` in `_config.yml` (the snippet is already integrated in the layout).