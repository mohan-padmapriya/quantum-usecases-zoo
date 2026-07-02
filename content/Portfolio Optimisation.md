---
title: Portfolio Optimisation & Rebalancing
sector: Finance
verdict: "[[Contested]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/finance
Watch out for: "[[A better classical baseline]]"
---
# What and why
Choosing asset weights to balance return against risk, including the harder discrete versions with lot sizes, transaction costs, and cardinality limits that are NP-hard. Quantum methods (QAOA, annealing) map the problem to a QUBO, but a 2025 TU Munich benchmark found classical heuristics like simulated annealing and tabu search clearly beat them. Quantum-inspired tensor networks might be useful, but this runs on classical hardware.