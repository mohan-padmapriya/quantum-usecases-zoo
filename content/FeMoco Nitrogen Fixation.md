---
title: FeMoco Nitrogen Fixation
sector: Chemistry
verdict: "[[Contested]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/chemistry
players:
  - Google Quantum AI | quantumai.google
  - Microsoft | microsoft.com
  - ETH Zurich | ethz.ch
  - PsiQuantum | psiquantum.com
  - BASF | basf.com
  - Boehringer Ingelheim | boehringer-ingelheim.com
---
# What and why
Industrial nitrogen fixation via the Haber-Bosch process, which produces ammonia, consumes ~2% of global electricity. Understanding how nitrogenase, the enzyme that performs biological nitrogen fixation under ambient conditions, could help make the Haber-Bosch process, and therefore ammonia production more efficient. This is called the FeMoco problem, and involves simulating the electronic structure of the iron-molybdenum cofactor within the nitrogenase enzyme.

The most advanced classical approach to date is a 2026 study by Zhai et al, and utilises classical heuristics and high-level coupled cluster theory to achieve near perfect accuracy. However, the strong electronic correlation and near-degenerate energy levels of the cofactor results in the classical resource requirements to scale exponentially as the system size and required precision increase. Quantum computing could perhaps be advantageous here as it encodes many-body wavefunctions directly onto an entangled state, which could in theory allow for ground-state energy estimation with polynomial scaling. 

# [[Methodology|Four gates of quantum advantage]]
## Theoretical quantum advantage
The theoretical case for exponential speedup via quantum phase estimation is heavily conditional on the ability to prepare an initial state with non-negligible ground-state overlap. Unfortunately, systematic evaluations have found that this overlap generically decays as system sizes grow. On the other hand, classical heuristics continue to get better, which is why there is still some debate in the community about whether there is enough evidence for such an exponential advantage across chemical space.  Even proponents at Google have conceded that asymptotic advantage is a "subject of legitimate debate. The 2026 classical solution by Zhai et al. also suggested that the FeMoco ground state is "only a slightly entangled state" and that the primary difficulty lies in ranking candidate states, a task classical filtering funnels can now apparently handle. 

## Practical quantum advantage
At present, no hardware demonstration of the FeMoco problem exists at a relevant scale. State-of-the-art estimates for simulating the 152-qubit benchmark require roughly $7.3\times 10^{10}$ Toffoli gates using matrix product state trial states, or approximately 9 hours of runtime when employing spectrum amplification (assuming a fault-tolerant machine with millions of physical qubits of course). However, because the target precision of chemical accuracy (~1 kcal/mol) has already been reached classically by Zhai et al. (2026) even the resource requirements for a quantum solution far exceed those of the newly established classical baseline.

## Economic quantum advantage
Simulating FeMoco a quantum computer currently cannot beat a cost-equivalent classical machine. Overhead analyses estimate that quantum hardware may face a slowdown "on the order of a $10 ^{13}$ factor" relative to price-comparable classical hardware before accounting for algorithmic constants. And G=given that the LLDUC FeMoco model was solved classically in a timeframe of "weeks on a small cluster," there is no current economic case for a quantum machine that would require roughly five million physical qubits and days of runtime. 


## Ecosystem considerations
There currently is a mature research culture in this area of research, given strategic partnerships between hardware vendors like Google and industrial giants such as BASF and Boehringer Ingelheim. A decade of open benchmarking has created a "virtuous cycle" of development, where quantum-inspired techniques have pushed the classical community to reach the current simulation frontier. Nonetheless, despite this maturity, nothing is currently deployed in an industrial production environment. 

