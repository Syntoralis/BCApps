---
layout: default
title: "Differences from Standard Business Central FIFO"
---
# Differences from Standard Business Central FIFO

## Standard Business Central FIFO

In standard Business Central, FIFO valuation is primarily managed through **Item Ledger Entries** and **Inventory Valuation**.

The standard FIFO costing method determines the value of inventory consumption based on the oldest inventory entries, but it does not guarantee that warehouse picks consume the physically oldest stock available in the warehouse.

Warehouse activities generally rely on:

- Bin Ranking
- Bin Types
- Fixed Bins
- Dedicated Bins
- FEFO (First Expired First Out)
- Standard warehouse selection algorithms

As a result, the inventory physically picked in the warehouse may differ from the inventory layer used for financial FIFO valuation.

---

## Syntoralis FIFO Logistic Approach

The Syntoralis FIFO solution introduces a **Physical FIFO Management** layer at warehouse level.

Instead of relying only on inventory valuation entries, the solution tracks the actual stock-in movement date and time for warehouse inventory and uses this information during warehouse pick creation.

Inventory is therefore consumed according to:

```text
Oldest Stock-in Movement DateTime First
```

regardless of the bin where the inventory is stored.

---

## Main Differences

### FIFO Criteria

#### Standard Business Central

FIFO is based on:

```text
Item Ledger Entry chronology
```

primarily for costing and inventory valuation.

#### Syntoralis FIFO

FIFO is based on:

```text
Warehouse Stock-in DateTime
```

for physical warehouse execution.

---

### Warehouse Pick Selection

#### Standard Business Central

Warehouse picks are generated according to warehouse configuration such as:

- Bin Ranking
- Fixed Bins
- Dedicated Bins
- Default Bins
- FEFO rules

The oldest stock is not necessarily selected.

#### Syntoralis FIFO

Warehouse picks are generated according to:

```text
Oldest available Stock-in DateTime
```

ensuring true FIFO stock rotation within the warehouse.

---

### Inventory Visibility

#### Standard Business Central

Users have visibility into:

- Item Ledger Entries
- Warehouse Entries
- Bin Contents

However, the exact FIFO sequence used during warehouse consumption is not directly visible.

#### Syntoralis FIFO

The Warehouse Inventory page provides visibility into:

- Stock-in DateTime
- FIFO ordering
- Remaining FIFO inventory

allowing users to understand exactly which inventory will be consumed first.

---

### FIFO Tracking

#### Standard Business Central

No warehouse-level FIFO layer is maintained.

Warehouse entries are not tracked with dedicated FIFO quantities.

#### Syntoralis FIFO

Warehouse entries maintain:

```text
Open
Remaining Qty
```

allowing the system to build and maintain FIFO consumption layers for warehouse processing.

---

### Initialization

#### Standard Business Central

No initialization process is required.

#### Syntoralis FIFO

A FIFO initialization must be performed through the Recompute function before activating the solution.

This ensures that FIFO inventory layers are correctly established from historical warehouse transactions.

---

### Lot and Serial Number Management

#### Standard Business Central

Lot and serial selection depends on standard warehouse and item tracking logic.

#### Syntoralis FIFO

Lot and serial selection follows FIFO stock-in movement rules and ensures that tracked inventory is consumed in the same sequence as non-tracked inventory.

---

### FEFO Integration

#### Standard Business Central

FEFO can influence warehouse selection when expiration dates exist.

#### Syntoralis FIFO

The solution includes dedicated compatibility logic to avoid conflicts between FEFO processing and FIFO stock-in movement processing.

---

# Why Use the Warehouse Inventory Page?

The standard Business Central pages allow users to view inventory quantities but do not provide a direct view of the FIFO sequence that will be used by warehouse picks.

The Warehouse Inventory page was introduced to provide:

- Visibility of FIFO inventory layers.
- Visibility of Stock-in DateTime values.
- Validation of FIFO ordering.
- Traceability of warehouse consumption decisions.
- Operational support during troubleshooting and FIFO initialization.

It therefore acts as the operational counterpart of the FIFO engine and provides transparency that is not available in standard Business Central warehouse functionality.

---

[Index](./index-en.html)