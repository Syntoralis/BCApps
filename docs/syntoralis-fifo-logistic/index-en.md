---
layout: default
title: "Welcome to BC Syntoralis FIFO Logistic Helper"
---

## Scope

The FIFO pick process applies to all outbound stock processes that use Business Central's standard warehouse management mechanisms.

The FIFO engine only intervenes on locations configured to use FIFO and replaces the standard location-based selection logic with a selection based on the actual stock-in date.

## Covered processes

The feature covers the following processes:

### Warehouse Pick

When a warehouse pick is created, the system selects stock according to FIFO order and generates the corresponding pick lines.

### Inventory Pick

When an inventory pick is created, the FIFO engine determines quantities to pick based on available FIFO layers.

### Inventory Movement

Movement proposals use FIFO information to select the oldest available stock.

### Replenishment for pick zones

When the system generates replenishment movements, source stock selection respects FIFO rules.

### Lot-tracked items

The FIFO engine handles lot-tracked items and selects lots in order of their stock-in date.

### Serial-tracked items

The FIFO engine handles serial-tracked items and selects serial numbers in FIFO order.

### Items with expiration dates

The FIFO engine remains compatible with Business Central's standard FEFO (First Expired First Out) mechanisms when expiration dates are used.

---

## Excluded processes

The following features are not covered by the FIFO engine:

### Warehouse receipts

Goods receipts remain managed by Business Central's standard functionality. The FIFO engine only records the information needed for FIFO tracking.

### Stock adjustments

Item journals and inventory adjustments are not driven by the FIFO pick engine.

### Cost calculations

The feature does not affect item valuation methods in Business Central.

### Stock reservations

Standard reservation mechanisms continue to operate independently of the FIFO engine.

### Item availability

Standard availability calculations are not changed by the FIFO solution.

---

## Affected functional objects

The FIFO pick process primarily acts on the following entities:

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

## Expected outcome

Regardless of the generated document, the system must always:

- Identify available stock.
- Determine the oldest FIFO layer.
- Consume quantities in FIFO order.
- Automatically split lines when necessary.
- Correctly assign lots and serial numbers.
- Update remaining FIFO quantities.

This produces a pick document compliant with FIFO rules without changing standard operational processes.

## Detailed section
- [Differences from Standard Business Central FIFO](./diff-bc-std-en.html)
- [Pick Process](./pick-en-process.html)
- [Warehouse Inventory Page](./whse-inventory-en.html)
- [FIFO Setup](./setup-en.html)
- [Recompute Process](./recompute-process.html)

## Download section
[MarketPlace App](https://github.com/Syntoralis/BCApps/tree/main/AppSource/Syntoralis-fifo-logistic)