---
title: Derivatives Pricing
sector: Finance
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/finance
Watch out for: Better quantum hardware
---
# What and why
Pricing path-dependent and multi-asset derivatives needs high-dimensional integration, done classically by Monte Carlo. Quantum amplitude estimation offers a proven quadratic speedup over Monte Carlo, but the Goldman Sachs–IBM resource estimate (Chakrabarti et al. 2021) requires roughly 8000 logical qubits and a megahertz logical clock to beat classical methods. Quasi-Monte Carlo and GPUs already reduce the gap, and a quadratic speedup alone is insufficient once error-correction overhead is counted.