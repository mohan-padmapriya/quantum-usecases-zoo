---
title: FeMoco Nitrogen Fixation
sector: Materials & Chemistry
verdict: ft-era
confidence: high
scale: Single FeMoco cluster active site
timeline: 10+ years
advantage_replicated: false
tags: [usecase, sector/chemistry]
---

# FeMoco / Nitrogen Fixation

**Verdict:** Fault-tolerant era only  
**Confidence:** High  
**Classical Status:** Chemical accuracy achieved (2026)

---

## A. Problem & Context

Industrial nitrogen fixation via Haber–Bosch consumes ~2% global electricity. The FeMoco active site geometry—how iron and molybdenum atoms arrange in the nitrogenase enzyme—determines catalytic efficiency. Computing this accurately classically remained hard until 2025–2026.

---

## B. Classical Baseline

Advanced density functional theory and coupled-cluster methods achieved chemical accuracy on FeMoco by 2026. Key result: Lee & Chan (2023) *Nature Communications* showed no evidence of generic exponential advantage in ground-state chemistry. Classical methods continue improving; no quantum system has beaten them on this problem.

**Confidence:** High. Multiple peer-reviewed labs have replicated.

---

## C. Quantum Approach

Variational quantum eigensolver (VQE) or phase estimation on fault-tolerant qubits could in principle simulate FeMoco ground state. Earlier papers proposed this (Reiher et al. 2017) with resource estimates placing it ~10+ years out.

**Confidence:** Medium. Feasible in theory; no evidence it outperforms classical in practice.

---

## D. Hardware Feasibility

Requires fault-tolerant logical qubits at error rates <10^-10. Current best: IBM Starling (2029 roadmap) targets logical error rates ~10^-8. Still 100× away.

**Confidence:** Medium. Roadmaps exist but are speculative.

---

## E. Bottlenecks

1. T-gate count and logical-qubit overhead dominate cost.
2. State preparation and readout fidelity.
3. Classical methods improving faster than quantum hardware—moving target.

**Confidence:** High.

---

## F. Evidence Review

- **Peer-reviewed:** Lee & Chan 2023, Zhai et al. 2026 (classical solution)
- **Preprint:** Various VQE proposals; none beat classical yet
- **Vendor:** IBM/Google roadmaps mention this as a target; no results yet
- **Press:** Frequent hype; ignore without peer review

**No practical advantage demonstrated.** Dequantization is a live risk.

**Confidence:** High.

---

## G. Ecosystem Map

- Academic: University labs (chemistry + quantum); mostly theoretical
- Industry: IBM, Google (hardware); catalysis companies (classical benchmarking)
- Funding: NSF, DOE, corporate research

---

## H. Verdict Inputs

- Classical methods reached chemical accuracy in 2026.
- Quantum hardware still 10+ years from error rates needed.
- Classical baseline continues improving.
- Use case depends entirely on fault-tolerant hardware that does not exist yet.

---

## I. Investor Signal

**Not investable as near-term computing play.** If you hear "quantum solves catalysis soon," ask for a resource estimate. If they don't have one or it assumes error rates below current roadmaps, red flag. The Haber–Bosch problem is not going away; classical methods work. Bet on better classical catalysts, not quantum catalysts, for the next decade.

---

## J. Responsible Quantum

This is the canonical example of responsible quantum claims: Reiher et al. (2017) made a clear, honest resource estimate. When classical methods caught up and dequantization happened, the field acknowledged it. That is how science should work.

---

**Cite this entry:**  
Quantum Use Case Zoo. "FeMoco Nitrogen Fixation." quantumusecasezoo.org, 2026.

**Last updated:** 2026-06-20  
**Confidence in this assessment:** High
