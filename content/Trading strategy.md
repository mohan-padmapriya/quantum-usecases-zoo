---
title: Trading-Strategy & Arbitrage Optimisation
sector: Finance
verdict: "[[Algorithm-limited]]"
timeline: Unclear
tags:
  - usecase
  - sector/finance
Watch out for: "[[A better quantum algorithm]]"
players:
  - "JPMorgan | jpmorgan.com"
  - "HSBC | hsbc.com"
  - "Toshiba | global.toshiba"
  - "D-Wave | dwavequantum.com"
  - "IBM | ibm.com"
---
# What and why
Finding profitable trades, such as currency loops where converting through several currencies leaves you with more than you started. The trouble is that the core problem is already easy for ordinary computers. A standard algorithm finds these currency loops quickly, so the quantum version only looks interesting on artificially complicated setups. Further, high-frequency trading needs answers in less than a millionth of a second, while sending a problem to a quantum computer in the cloud and getting it back takes thousandths of a second or longer, which is far too slow. Demonstrations on quantum annealers are quicker but so far have not beaten fast classical methods at a useful scale.

Currency arbitrage, which is the process of identifying and exploiting price discrepancies across global exchange rates to generate risk-free profits, need real-time, high-speed processing of vast combinatorial solution spaces because arbitrage opportunities are typically highly short-lived. Accurate identification of these cycles allows financial institutions to optimise capital allocation, which in turn, is claimed to enhance overall market efficiency. The most established classical method to date for detecting these opportunities is the Bellman-Ford algorithm, which identifies profitable cycles in polynomial time. In high-frequency trading (HFT) environments, classical systems acting on these opportunities utilise custom hardware to execute decisions in under a microsecond. 

The struggle for classical systems is to process vast combinatorial solution spaces in real-time, that is to identify and execute the optimal trading route before arbitrage opportunities, which are fleeting, elapse. 

This problem can be rewritten as a Quadratic Unconstrained Binary Optimization (QUBO) problem, which can then be solved on a quantum computer. 

# Gates of quantum advantage
## Theoretical quantum advantage
Current quantum proposals are largely NISQ heuristics, mapping the task to a Quadratic Unconstrained Binary Optimization (QUBO) format for annealers or utilizing the Quantum Approximate Optimization Algorithm (QAOA). These methods have no identified super-quadratic speedup over the best classical algorithm - Bellman Ford, which is already polynomial.  And most existing research benchmarks quantum performance against generic heuristics on toy-sized models rather than the actual classical state-of-the-art. 

## Practical quantum advantage
From a practical perspective, this use case faces a fatal execution latency bottleneck, because HFT environments require decisions in under a microsecond, but unfortunately, currently, the fixed programming overhead for a single quantum job is approximately 15.8 milliseconds, which is roughly 30,000 times slower than a standard classical decision loop. Furthermore, experimental results on small currency graphs show that classical solvers on standard laptops consistently outperform current quantum hardware, while gate-based algorithms often converge on money-losing cycles that violate the problem's constraints. 

## Quantum Economic advantage
The economic advantage of quantum computing in this niche is further undermined by quantum-inspired classical hardware. For instance, Toshiba’s Simulated Bifurcation Machine, which is a classical FPGA, can detect currency arbitrage in 30 microseconds, a speed that is roughly a million times faster than current quantum job overheads and compatible with standard exchange colocation. Conclusively, today, quantum hardware cannot currently compete on a cost-equivalent or speed-equivalent basis. 

## Quantum ecosystem advantage
In terms of the broader ecosystem, this use case is characterised by the thinnest level of industry adoption, with no live quantum trading deployments existing at any bank or hedge fund as of mid-2026.  Research teams at firms like JPMorgan and HSBC continue to explore the domain, but most high-profile results have been labeled by experts as artifacts of hardware noise rather than genuine quantum computational speedup. The lack of verifiable interest from top-tier quant firms suggest that currency arbitrage is not currently viewed as a strategic priority usecase. 
