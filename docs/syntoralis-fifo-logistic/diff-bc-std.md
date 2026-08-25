---
layout: default
title: "Différences avec le FIFO standard de Business Central"
---

# Différences avec le FIFO standard de Business Central

## FIFO standard de Business Central

Dans Business Central standard, la valorisation FIFO est principalement gérée via les **Entrées de journal d'article** et la **valorisation des stocks**.

La méthode de coût FIFO standard détermine la valeur de la consommation de stock à partir des entrées d'inventaire les plus anciennes, mais elle ne garantit pas que les prélèvements d'entrepôt consomment physiquement le stock le plus ancien disponible dans l'entrepôt.

Les activités d'entrepôt reposent généralement sur :

- Classement des bacs
- Types de bacs
- Bacs fixes
- Bacs dédiés
- FEFO (First Expired First Out)
- Algorithmes standard de sélection d'entrepôt

En conséquence, le stock physiquement prélevé en entrepôt peut différer de la couche d'inventaire utilisée pour la valorisation financière FIFO.

---

## Approche Syntoralis FIFO Logistic

La solution Syntoralis FIFO introduit une couche de **gestion FIFO physique** au niveau entrepôt.

Plutôt que de s'appuyer uniquement sur les écritures de valorisation, la solution enregistre la date et l'heure réelles du mouvement d'entrée en stock et utilise cette information lors de la création des prélèvements d'entrepôt.

L'inventaire est donc consommé selon :

```text
Plus ancienne date/heure du mouvement d'entrée en stock en premier
```

quelle que soit la position du stock dans le bac.

---

## Principales différences

### Critère FIFO

#### Business Central standard

Le FIFO s'appuie sur :

```text
Chronologie des Item Ledger Entries
```

principalement pour la valorisation et la comptabilité.

#### Syntoralis FIFO

Le FIFO s'appuie sur :

```text
Date/heure d'entrée en stock (warehouse Stock-in DateTime)
```

pour l'exécution physique en entrepôt.

---

### Sélection pour les prélèvements d'entrepôt

#### Business Central standard

Les prélèvements sont générés selon la configuration d'entrepôt :

- Classement des bacs
- Bacs fixes
- Bacs dédiés
- Bacs par défaut
- Règles FEFO

Le stock le plus ancien n'est pas nécessairement sélectionné.

#### Syntoralis FIFO

Les prélèvements sont générés selon :

```text
Plus ancienne date/heure d'entrée en stock disponible
```

garantissant une véritable rotation FIFO physique en entrepôt.

---

### Visibilité de l'inventaire

#### Business Central standard

Les utilisateurs ont une visibilité sur :

- Item Ledger Entries
- Warehouse Entries
- Bin Contents

Cependant, la séquence FIFO exacte utilisée lors de la consommation en entrepôt n'est pas directement visible.

#### Syntoralis FIFO

La page Inventaire d'entrepôt fournit une visibilité sur :

- la Stock-in DateTime
- l'ordre FIFO
- l'inventaire FIFO restant

permettant aux utilisateurs de comprendre précisément quel stock sera consommé en premier.

---

### Suivi FIFO

#### Business Central standard

Il n'existe pas de couche FIFO maintenue au niveau entrepôt.

Les Warehouse Entries ne conservent pas des quantités dédiées FIFO.

#### Syntoralis FIFO

Les Warehouse Entries conservent :

```text
Open
Remaining Qty
```

ce qui permet au système de construire et maintenir des couches de consommation FIFO pour le traitement d'entrepôt.

---

### Initialisation

#### Business Central standard

Pas de processus d'initialisation requis.

#### Syntoralis FIFO

Une initialisation FIFO doit être réalisée via la fonction Recompute avant d'activer la solution.

Cela garantit que les couches FIFO sont correctement reconstituées à partir des transactions historiques d'entrepôt.

---

### Gestion des lots et numéros de série

#### Business Central standard

La sélection des lots et numéros dépend de la logique standard d'entrepôt et de suivi des articles.

#### Syntoralis FIFO

La sélection des lots et numéros suit les règles FIFO fondées sur la date/heure du mouvement d'entrée, garantissant que l'inventaire tracé est consommé dans la même séquence que l'inventaire non tracé.

---

### Intégration FEFO

#### Business Central standard

Le FEFO peut influencer la sélection lorsque des dates d'expiration existent.

#### Syntoralis FIFO

La solution intègre une logique de compatibilité dédiée pour éviter les conflits entre le traitement FEFO et le traitement FIFO basé sur les mouvements d'entrée.

---

# Pourquoi utiliser la page Inventaire d'entrepôt ?

Les pages standard de Business Central permettent de consulter des quantités, mais n'offrent pas une vue directe de la séquence FIFO réelle qui sera utilisée par les prélèvements.

La page Inventaire d'entrepôt a été introduite pour fournir :

- Visibilité des couches FIFO.
- Visibilité des Stock-in DateTime.
- Validation de l'ordre FIFO.
- Traçabilité des décisions de consommation en entrepôt.
- Support opérationnel pour l'initialisation et le dépannage FIFO.

Elle constitue donc le pendant opérationnel du moteur FIFO et apporte une transparence absente des fonctionnalités standard de Business Central.

---

[Index](./index.html)
