---
layout: default
title: "Differences from Standard Business Central FIFO"
lang: en
description: "How Syntoralis FIFO Logistic differs from the standard FIFO costing in Business Central."
alt_url: /syntoralis-fifo-logistic/diff-bc-std.html
---

# Differences from Standard Business Central FIFO

## Standard Business Central FIFO

In standard Business Central, FIFO valuation is mainly handled through **Item Ledger Entries** and **inventory valuation**.

The standard FIFO costing method determines the value of stock consumption from the oldest inventory entries, but it does not guarantee that warehouse picks physically consume the oldest stock available in the warehouse.

Warehouse activities generally rely on:

- Bin ranking
- Bin types
- Fixed bins
- Dedicated bins
- FEFO (First Expired First Out)
- Standard warehouse selection algorithms

As a result, the stock physically picked in the warehouse can differ from the inventory layer used for financial FIFO valuation.

---

## Syntoralis FIFO Logistic approach

The Syntoralis FIFO solution introduces a **physical FIFO management** layer at the warehouse level.

Instead of relying solely on valuation entries, the solution records the actual date and time of the stock-in movement and uses this information when creating warehouse picks.

Inventory is therefore consumed according to:

```text
Oldest stock-in date/time first
```

regardless of the stock position in the bin.

---

## Key differences

### FIFO criterion

#### Standard Business Central

FIFO relies on:

```text
Item Ledger Entries chronology
```

mainly for valuation and accounting.

#### Syntoralis FIFO

FIFO relies on:

```text
Stock-in DateTime (warehouse Stock-in DateTime)
```

for physical execution in the warehouse.

---

### Selection for warehouse picks

#### Standard Business Central

Picks are generated according to warehouse configuration:

- Bin ranking
- Fixed bins
- Dedicated bins
- Default bins
- FEFO rules

The oldest stock is not necessarily selected.

#### Syntoralis FIFO

Picks are generated according to:

```text
Oldest available stock-in date/time
```

guaranteeing true physical FIFO rotation in the warehouse.

---

### Inventory visibility

#### Standard Business Central

Users have visibility on:

- Item Ledger Entries
- Warehouse Entries
- Bin Contents

However, the exact FIFO sequence used during warehouse consumption is not directly visible.

#### Syntoralis FIFO

The Warehouse Inventory page provides visibility on:

- Stock-in DateTime
- FIFO order
- Remaining FIFO inventory

allowing users to understand precisely which stock will be consumed first.

---

### FIFO tracking

#### Standard Business Central

There is no FIFO layer maintained at the warehouse level.

Warehouse Entries do not keep dedicated FIFO quantities.

#### Syntoralis FIFO

Warehouse Entries keep:

```text
Open
Remaining Qty
```

allowing the system to build and maintain FIFO consumption layers for warehouse processing.

---

### Initialization

#### Standard Business Central

No initialization process required.

#### Syntoralis FIFO

A FIFO initialization must be performed via the Recompute function before activating the solution.

This ensures that FIFO layers are correctly rebuilt from historical warehouse transactions.

---

### Lot and serial number handling

#### Standard Business Central

Lot and serial selection depends on standard warehouse logic and item tracking.

#### Syntoralis FIFO

Lot and serial selection follows FIFO rules based on the stock-in date/time, ensuring that tracked inventory is consumed in the same sequence as untracked inventory.

---

### FEFO integration

#### Standard Business Central

FEFO can influence selection when expiration dates exist.

#### Syntoralis FIFO

The solution integrates dedicated compatibility logic to avoid conflicts between FEFO processing and FIFO processing based on stock-in movements.

---

# Why use the Warehouse Inventory page?

Standard Business Central pages let you view quantities, but do not provide a direct view of the actual FIFO sequence that will be used by picks.

The Warehouse Inventory page was introduced to provide:

- Visibility of FIFO layers.
- Visibility of Stock-in DateTimes.
- Validation of FIFO order.
- Traceability of warehouse consumption decisions.
- Operational support for FIFO initialization and troubleshooting.

It is therefore the operational counterpart of the FIFO engine and provides transparency absent from standard Business Central features.

---

[Index](./index-en.html)