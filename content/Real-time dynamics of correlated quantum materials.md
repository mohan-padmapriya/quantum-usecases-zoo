---
title: Real-time dynamics of correlated quantum materials
sector: Science
timeline: Fault-tolerant era
Watch out for: "[[A better classical baseline]]"
verdict: "[[Hardware-limited]]"
tags:
  - usecase
  - sector/science
---
# What and why
Simulating the time-dynamics of quantum systems evolving under a many-body Hamiltonian has been extensively researched for the longest time, after all, simulating quantum systems on quantum systems was arguably one of the earliest aims in the field. The focus of this usecase is to study how electrons, or more generally spins interact and evolve over time within crystalline solids or complex molecules, given these processes are governed by strong interparticle interactions, where the entanglement between the particles grows rapidly. 

# Four gates of quantum advantage
## Theoretical quantum advantage
This usecase is likely to show theoretical quantum advantage, since it has been proven that time-dynamics simulation can be efficiently handled by quantum computers, but with the growth of entanglement, classical approaches, including approximations like approximations like Matrix Product States (MPS) and isoTNS, fail. Although there are specific instances where classical methods are tractable, like when [[Classical simulation of free-fermionic dynamics and quantum chemistry with magic input | Quantinuum and Phasecraft ]] showed "magic" paired-electron structures can be partially dequantized by mixed-Pfaffian estimators. However, the authors noted that these classical methods seem to fail as soon as interacting dynamics are introduced. 

## Practical quantum advantage
Experiments have successfully simulated 2D Fermi-Hubbard and XY models on processors with 69 to 127 qubits, and on various qubit processors. However, it is generally noted that the hardware is not yet up to the mark, and, for instance, "quality of the quantum simulation gradually degrades with system size and quantum gate count", as is expected of NISQ hardware. All results rely heavily on some sort of error mitigation, and there is hope that fault-tolerant machines will allow for practical quantum advantage. 

## Economic quantum advantage
Here the question is whether quantum beats classical on cost-equivalent machines. Already, Multiverse Computing has shown that by using four NVIDIA H200 GPUs and exploiting Hamiltonian symmetries, they could reduce Q-CTRL's claimed 3,000× quantum speedup to just ~36×. Further, for 1-D systems, , the classical machine (high-end GPUs) is currently competitive or superior in cost-per-result. The good news is that  in 2D systems, the classical resources required scale exponentially (estimated at 10^6
  years for certain 69-qubit fidelities according to [[Thermalization and criticality on an analogue-digital quantum simulator|Google in 2025]]. 
## Deployment/ecosystem quantum advantage

This usecase, at the research level, is already accessible via cloud APIs. And further, there's teams, especially in industry (Q-CTRL, IBM, Google, Phasecraft, Quantinuum, QuEra), from all over the world working on it. Given this is a more research-leaning usecase with implications for several industries downstream, it has and will likely continue seeing a lot of funding and support. But its broad applicability also lends itself to dual-use considerations. 

## Gaps
There are no peer-reviewed, replicated demonstration that a specific, useful dynamical simulation is beyond all classical methods. Classical methods continue to get better, which is why the single biggest development that could change the verdict on this usecase is a new classical baseline. 

We are also missing fault-tolerant resource estimates for 2D time-simulation problems, which is where quantum is believed to win against classical. 

## References
![[real-time-dynamics.base]]
