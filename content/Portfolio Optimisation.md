---
title: Portfolio Optimisation & Rebalancing
sector: Finance
verdict: "[[Algorithm-limited]]"
timeline: Unclear
tags:
  - usecase
  - sector/finance
Watch out for: "[[A better quantum algorithm]]"
players:
  - "BBVA | bbva.com"
  - "Bankia | bankia.es"
  - "Multiverse Computing | multiversecomputing.com"
  - "D-Wave | dwavequantum.com"
  - "Goldman Sachs | goldmansachs.com"
  - "JPMorgan | jpmorgan.com"
---
# What and why
Choosing asset weights to balance return against risk, including the harder discrete versions with lot sizes, transaction costs, and cardinality limits that are NP-hard. Quantum methods (QAOA, annealing) map the problem to a QUBO, but a 2025 TU Munich benchmark found classical heuristics like simulated annealing and tabu search clearly beat them. There is also the fact NP-hardness describes worst cases, not the instances banks solve. Extensive benchmarks on 250 real-world datasets show that professional classical solvers like Gurobi can reach proven optimal solutions for up to 1,000 assets in just seconds. Further, in the real world, the optimiser is almost never the bottleneck; the true difficulty lies in accurately estimating the future returns and risks (covariances) that feed into the model. Quantum-inspired tensor networks might be useful, but this runs on classical hardware.

# Gates of quantum advantage
## Theoretical quantum advantage
There is currently **no rigorous proof** that popular quantum algorithms like QAOA or Quantum Annealing provide a speedup for this specific class of financial problems. And especially on NISQ devices, there is no advantage. Even if we had perfect, error-corrected quantum computers, the gap in speed is massive. Quantum operations are significantly slower than classical ones; to overcome this, an algorithm would need a massive mathematical advantage that hasn't been identified for portfolio selection. 

## Practical quantum advantage
As studied by Stopfer and Wagner in late 2025, in direct head-to-head comparison on real hardware, tailored classical heuristics consistently outperform quantum approaches in solution quality for a fixed runtime. For universes larger than 20 assets, QAOA typically produces results that are roughly twice as bad as the optimal objective. DWave offers a hybrid quantum-classical portfolio optimisation service, however its audit show the QPU was only used for 0.034 seconds of a 5-second total budget (less than 1%). The remaining 99% of the work was done by classical algorithms.

When researcher try to prove quantum advantage, in order make these problems "quantum-ready," researchers use "penalties" to enforce rules (like selecting exactly (K) assets). These penalties make the problem artificially dense, causing current quantum hardware to fail (via "chain breaks") because the device spends all its energy enforcing rules rather than finding the best stocks. 

## Economic quantum advantage
At the moment, classical solvers cost cents in CPU time and reach proven optimality. No current quantum pipeline can match this on a cost-per-result basis. The industry's leading players are also relying more heavily on quantum-inspired solutions that run on classical hardware; for instance, Multiverse Computing uses LLM compression, which uses quantum-inspired classical software rather than pure quantum hardware. 

And then of course there is the practical deployment on cloud-based quantum systems, which inevitably introduces lot of latency. While the quantum chip itself might compute in milliseconds, the end-to-end process (queueing, calibration, and cloud overhead) can take minutes or even hours.

## Deployment/Ecosystem Considerations
While major institutions have conducted high-profile pilots, such as **BBVA and Bankia** collaborating with Multiverse Computing to test D-Wave’s hybrid solvers, these remain research initiatives. As of July 2026, there is no documented instance of a bank running a quantum portfolio optimizer in a live production environment. The good news is there are frameworks like QOBLIB (The Intractable Decathlon) and QUARK coming up, which now provide standardised  test cases that allow quantum solvers to compete directly against classical tools like Gurobi and CPLEX. 

