---
title: Derivatives Pricing
sector: Finance
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/finance
Watch out for: Better quantum hardware
players:
  - "Goldman Sachs | goldmansachs.com"
  - "JPMorgan | jpmorgan.com"
  - "IBM | ibm.com"
  - "Barclays | home.barclays"
  - "Classiq | classiq.io"
signal: 4
---
# What and why
The primary goal of this usecase is  to determine the fair value of entering a derivative contract today, given the inherent uncertainty about the future values of the underlying assets. This valuation allows banks and investors to protect against adverse market moves, speculate, and also to calculate metrics like Value at Risk (VaR), which is important for regulatory compliance. For simple, "path-independent" derivatives (where the final payoff depends only on the asset price at the very end), analytical solutions like the Black-Scholes model are used.

However, most practically relevant and complex derivatives are path-dependent, meaning their value depends on the behavior of the asset throughout the entire duration of the contract. This needs high-dimensional integration, and the current best solution classically is Monte Carlo. Unfortunately, this is expensive. And further, most Monte Carlo approaches today converge slowly, because accuracy only improves at $O(1/\sqrt{M})$ relative to the number of samples (M), which means the to reduce an error by a factor of 10, you must increase the number of simulated paths by a factor of 100 - this is resource intensive!

Through quantum amplitude estimation, researchers have shown that it might be possible to achieve a quadratic speed-up, which improves the convergence rate from the classical $(O(1/\sqrt{M}))$ to $(O(1/M))$, which means, for a target precision, a quantum computer can achieve the same result using significantly fewer samples, for instance, requiring only 1,000 quantum iterations to reach the same accuracy as 1,000,000 classical Monte Carlo simulations. 


# [[Methodology|Four gates of quantum advantage]]
## Theoretical quantum advantage
From a theoretical perspective, for this usecase, the separation between quantum and classical convergence rates is proven and optimal, since quantum amplitude estimation provides a quadratic speedup. This is positive, but not enough in the NISQ era. Also the standard Grover-Rudolph state preparation method is considered insufficient because it effectively requires the same Monte Carlo integration that the quantum algorithm is meant to replace. 

## Practical quantum advantage
The current hardware record for this application is a 3-qubit toy option demonstration from 2020, which has not been improved upon as of mid-2026. While advancements in quantum signal processing have reduced the estimated resources to 4,700 logical qubits and $10^9$ T-gates, achieving a wall-clock win requires a logical clock rate of 45 MHz. This is nearly four orders of magnitude higher than feasible estimates of 10 kHz for early fault-tolerant systems. Additionally, the required two-qubit error rate of below $10^{-6}$ is far lower compared the $10^{-2}$ to $10^{-3}$ currently available. 

## Economic quantum advantage
Currently, we're at a $10^{10}$ per-operation throughput gap, which means a quadratic algorithm can only afford roughly 68 binary operations per oracle call within a two-week budget. This is frankly unfeasible. Meanwhile, classical benchmarks continue to improve through GPU-parallel Monte Carlo and Quasi-Monte Carlo (QMC) methods. And the economic case is further weakened by a lack of head-to-head benchmarks comparing QAE against highly tuned classical QMC on identical derivative contracts.

## Ecosystem considerations
Major institutions like Goldman Sachs and JPMorgan Chase in collaboration with IBM Zurich are have and continue to invest to achieve advantage in derivative pricing. And these collaboration has yielded significant progress, such as reducing threshold estimates by 16x in just three years through algorithmic improvements. Nonetheless, there is nothing concrete yet, and this is one of the more hype-prone usecases. 

