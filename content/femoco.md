---
tags:
  - usecase
  - sector/chemistry
sector: Materials & Chemistry
verdict: ft-era
confidence: high
timeline: ft-era
scale: single active-site cluster (~54–150 spin orbitals)
advantage_replicated: false
publish: true
---
# FeMoco / Nitrogen Fixation

> [!verdict-ft] Verdict: Fault-tolerant era only
> Resource estimates place a useful FeMoco simulation well beyond near-term hardware. Meanwhile classical methods reached chemical accuracy on related systems by 2026. This case is the Zoo's methodological precedent.

> [!conf-high] Confidence: High
> Supported by multiple peer-reviewed resource-estimation studies and classical-method results.

**Up:** [[Materials & Chemistry]]

## A. Problem context
Industrial nitrogen fixation (green ammonia) at the scale of a single FeMoco active-site cluster. The promise was an exponential quantum advantage in computing the cluster's ground-state energy.

## B. Classical baseline
> [!baseline] Classical baseline (read this first)
> By 2026, advanced classical methods achieved chemical accuracy on related strongly-correlated systems. The baseline is a moving target, and it has been moving toward the quantum target, not away from it. See [[Lee Chan 2023 — No Exponential Advantage]].

## C. Quantum approach
Qubitization-based quantum phase estimation; earlier proposals used VQE and ADAPT-VQE. The electronic-structure problem is the canonical motivating example for fault-tolerant chemistry.

## D. Hardware feasibility
Requires fault-tolerant logical qubits at counts and error rates not expected for 10+ years. `source-tier: peer-reviewed`

## E. Bottlenecks
T-gate counts and logical-qubit overhead dominate. The I/O and state-preparation costs are non-trivial even granting the hardware. `source-tier: peer-reviewed`

## F. Evidence review
- No replicated practical advantage. `expert-opinion`
- Lee/Chan 2023: no generic exponential advantage in ground-state chemistry. `peer-reviewed`

## G. Ecosystem map
Academic chemistry groups; vendor roadmaps (IBM Starling/Blue Jay). `vendor` `press`

## H. Verdict inputs
Advantage contingent on hardware that does not exist, against a classical baseline that is still improving.

> [!investor] Investor signal
> Not investable as a near-term computing play. Treat any "quantum solves nitrogen fixation soon" pitch as a red flag and ask for the resource estimate and the current classical baseline.

## J. Responsible-quantum considerations
Overstated timelines here have historically anchored unrealistic expectations across the whole field.

> [!gaps] GAPS
> Need an updated 2026 classical baseline citation and a current logical-qubit resource estimate from a named group.