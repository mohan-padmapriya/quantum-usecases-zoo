---
title: Energy Grid Placement
sector: Energy
verdict: "[[Algorithm-limited]]"
timeline: Unclear
tags:
  - usecase
  - sector/energy
Watch out for: "[[A better quantum algorithm]]"
players:
  - "Alliander | alliander.com"
  - "E.ON | eon.com"
  - "Commonwealth Edison | comed.com"
  - "D-Wave | dwavequantum.com"
  - "Multiverse Computing | multiversecomputing.com"
  - "IonQ | ionq.com"
  - "Oak Ridge National Laboratory | ornl.gov"
---
# What and why
Deciding where to put batteries on a grid and when to charge or discharge them, at minimum operational cost, is important for the power industry because it ensures reliability, but at the end of the year, also results in annual financial savings. This is what the problem of "unit commitment" is, and the standard classical approach involves Mixed-Integer Programming (MIP), which is typically executed using classical deterministic solvers like CPLEX. However, this problem isNP-hard, leading to exponential growth in complexity as the number of generators and time periods increase. Consequently, conventional methods become computationally intractable when applied to large-scale, modern electrical grids. Quantum computing is uniquely suited for this problem because algorithms like QAOA are designed to tackle the discrete binary on/off decisions that is the reason behind the combinatorial complexity of UC. Hybrid frameworks might optimise this by delegating intensive combinatorial subproblems to quantum units while handling continuous variables classically.


# Gates of quantum advantage
## Theoretical quantum advantage
While UC is a hard NP-hard problem, proposed solutions that use quantum algorithms such as the HHL algorithm for power flow show an asymptotic complexity of $O(n^{4.62} \log n)$, which is significantly worse than the $O(n^{1.9} \log n)$ complexity achieved by leading classical solvers. Furthermore, researchers have noted that optimisation advantages do not apply at the current NISQ error rates, and the measurement count for heuristics like QAOA increases exponentially with problem size. Also, continuous power flow variables are forced into discrete binary formats for quantum annealing, which means the efficient constraint structures that classical Mixed-Integer Linear Programming (MILP) use and exploit are discarded in the quantum case. 

## Practical quantum advantage
Hybrid algorithms have indeed been tested on systems with 3 to 26 generating units, however real-world grids involve tens of thousands of buses and variables. Further, classical solvers like CPLEX remain highly effective for instances with fewer than 400 units, which means that the crossover point for practical advantage is still quite distant. Additionally, practical execution is hindered by hidden overheads, such as 10-second communication latencies for sub-microsecond annealling, and the largest claimed scale-ups (e.g., D-QSLR at 1,020 units) have never faced a direct head-to-head benchmark against optimised classical solvers. 

## Economic quantum advantage
 Researchers have shown that to reconfigure a real 309-node distribution network, a quantum computer would require approximately 61,172 logical qubits and an execution time of $10^7$ seconds for a single optimisation layer. Using 8-SAT as a rigorous proxy for this problem class, fault-tolerant QAOA is only estimated to cross over classical heuristics at 179 variables while requiring between 8.8 million and 73.9 million physical qubit. In contrast, classical MILP can resolve real-world instances of this scale in seconds to minutes on commodity hardware. 

## Ecosystem considerations
The use case is considered highly strategic for national energy security and the Net-Zero transition, drawing active participation from utilities such as Alliander, E.ON, and Commonwealth Edison. It is also a regular in "quantum for SDG" lists. 



