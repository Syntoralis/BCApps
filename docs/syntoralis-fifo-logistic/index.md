---
layout: default
title: "Bienvenue sur l'aide BC Syntoralis FIFO Logistique"
---

# Périmètre couvert

Le processus de prélèvement FIFO s'applique à l'ensemble des processus de sortie de stock utilisant les mécanismes standards de gestion d'entrepôt de Business Central.

Le moteur FIFO intervient uniquement sur les emplacements configurés pour utiliser la fonctionnalité FIFO et remplace la logique standard de sélection des stocks par une sélection basée sur la date réelle d'entrée en stock.

## Processus couverts

La fonctionnalité couvre les processus suivants :

### Prélèvement entrepôt (*Warehouse Pick*)

Lors de la création d'un prélèvement entrepôt, le système sélectionne les stocks selon leur ordre FIFO et génère les lignes de prélèvement correspondantes.

### Prélèvement inventaire (*Inventory Pick*)

Lorsqu'un prélèvement inventaire est créé, le moteur FIFO détermine les quantités à prélever selon les couches FIFO disponibles.

### Mouvement inventaire (*Inventory Movement*)

Les propositions de mouvements utilisent les informations FIFO afin de sélectionner les stocks les plus anciens disponibles.

### Réapprovisionnement des zones de prélèvement

Lorsque le système génère des mouvements de réapprovisionnement, la sélection des stocks sources respecte les règles FIFO.

### Articles suivis par lot

Le moteur FIFO gère les articles suivis par lot et sélectionne les lots dans l'ordre de leur entrée en stock.

### Articles suivis par numéro de série

Le moteur FIFO gère les articles suivis par numéro de série et sélectionne les numéros de série dans l'ordre FIFO.

### Articles avec date d'expiration

Le moteur FIFO reste compatible avec les mécanismes FEFO standards de Business Central lorsque des dates d'expiration sont utilisées.

---

## Processus exclus

Les fonctionnalités suivantes ne sont pas couvertes par le moteur FIFO :

### Réceptions entrepôt

La réception des marchandises reste gérée par les fonctionnalités standards de Business Central. Le moteur FIFO se limite à enregistrer les informations nécessaires au suivi FIFO.

### Ajustements de stock

Les journaux article et les ajustements d'inventaire ne sont pas pilotés par le moteur de prélèvement FIFO.

### Calcul des coûts

La fonctionnalité n'impacte pas les méthodes de valorisation des articles dans Business Central.

### Réservation des stocks

Les mécanismes standards de réservation continuent de fonctionner indépendamment du moteur FIFO.

### Disponibilité article

Les calculs de disponibilité standard ne sont pas modifiés par la solution FIFO.

---

## Objets fonctionnels concernés

Le processus de prélèvement FIFO intervient principalement sur les entités suivantes :

```text
Location
Bin Content
Warehouse Entry
Warehouse Activity Header
Warehouse Activity Line
Warehouse Pick
Inventory Pick
Inventory Movement
Lot No.
Serial No.
```

---

## Résultat attendu

Quel que soit le document généré, le système doit toujours :

- Identifier les stocks disponibles.
- Déterminer la couche FIFO la plus ancienne.
- Consommer les quantités dans l'ordre FIFO.
- Fractionner automatiquement les lignes lorsque nécessaire.
- Affecter correctement les lots et numéros de série.
- Mettre à jour les quantités FIFO restantes.

L'utilisateur obtient ainsi un document de prélèvement conforme aux règles FIFO sans modification des processus opérationnels standards.

## Pour en savoir plus
- [Différences avec le FIFO standard de Business Central](./diff-bc-std.html)
- [Processus de prélèvement FIFO](./pick-process.html)
- [Page Inventaire d'entrepôt](./whse-inventory.html)
- [Paramétrage FIFO](./setup.html)
- [Processus de Recalcul FIFO](./recompute-process.html)

## Zone de téléchargement
[MarketPlace App](https://github.com/Syntoralis/BCApps/tree/main/AppSource/Syntoralis-fifo-logistic)