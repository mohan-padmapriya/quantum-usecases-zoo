---
title: Risk Analysis
sector: Finance
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/finance
Watch out for: Better quantum hardware
---
# What and why
Computing tail risk measures - VaR, conditional VaR, economic capital- over loss distributions for regulatory and daily reporting, done classically by Monte Carlo with importance sampling. Quantum amplitude estimation promises the same quadratic speedup as derivatives pricing and inherits the same fault-tolerance gate of roughly 1200 logical qubits with circuit depths near 10^8. Classical methods already have a technique, importance sampling, built specifically to measure these rare worst-case losses efficiently, and running it across many GPUs in parallel keeps making it faster, pushing the point where quantum could overtake it even further out of reach. 