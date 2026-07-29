---
title: Aerospace CFD
sector: Aerospace
verdict: "[[Algorithm-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/aerospace
players:
  - Airbus | airbus.com
  - Rolls-Royce | rolls-royce.com
  - PsiQuantum | psiquantum.com
  - Xanadu | xanadu.ai
  - Riverlane | riverlane.com
  - Classiq | classiq.io
  - NVIDIA | nvidia.com
  - BMW Group | bmwgroup.com
signal: 3
---
# What and why
Computational fluid dynamics (CFD) is one of the main approaches used in aerospace design. Before an aircraft wing, a nacelle, or a turbine blade is ever built, its behaviour in air is predicted by numerically solving the Navier–Stokes equations on a mesh, which essentially models pressure, velocity, and temperature at millions to billions of grid points. Such simulation allows drag reduction, even few percent of which, across the fleet, is worth billions in fuel and a meaningful fraction of aviation's carbon budget. Manufacturers rely on expensive physical rigs to do these simulations, because some of them are too expensive for classical machines.

There is a lot of funding towards building quantum solutions for this usecase. The logic is that a register of $n$ qubits spans a state space of dimension $2^n$; if you could encode a discretised flow field of $2^n$ cells into that register and evolve it, you would get exponential compression of the state and, the hope goes, an exponential speedup. However, it is not this straightforward, as we will see in the next few sections. 
# [[Methodology | Gates of quantum advantage]]

## Theoretical quantum advantage
The Navier–Stokes equations are nonlinear, whereas the Schrödinger evolution a quantum computer implements natively is linear and unitary. Not to say quantum computing therefore cannot be applied here, rather, you cannot simply load a flow field into a quantum state and let the hardware evolve it. Instead, there are two main workarounds. With the Carleman linearisation approach, you embed the finite-dimensional nonlinear system into an infinite-dimensional linear one, then truncate at some order $\nu$. The truncated linear system can be tackled by hamiltonian simulation, among other methods. However, this approach is quite restrictive and works conditionally only for certain regimes of the problem. 

The second workaround is to solve the linearised Navier–Stokes equations directly with a quantum linear systems algorithm (QLSA) like HHL (Harrow, Hassidim and Lloyd 2009) or its modern descendants, inside an outer iteration that handles the nonlinearity classically. This is the route Airbus has pursued for boundary-layer instability (the onset of turbulence over a wing) and the one Rolls-Royce and Classiq have also used in an industrial pipeline. However, with HHL, quantum advantage is not guaranteed, as discussed in - [[Quantum Advantage FAQ#2. Where is quantum advantage believed to exist]]. 

All in all, the theoretical quantum advantage here is conditional. 

## Practical quantum advantage
 The most complete estimate of quantum resources required was presented by Zhuang et al. (2025), in which the authors used a spectral input/output scheme, a synthesised circuit and error correction/ They reported that solving Navier–Stokes on a $2^{80}$-point grid would take roughly 8.71 million physical qubits at a $5\times10^{-4}$ error rate and about 42.6 days of runtime (arXiv:2509.08807), and they presented this, fairly, as a two-orders-of-magnitude improvement on prior estimates and an asymptotic exponential win over a classical supercomputer that would need a century. On what is possible with more near-term hardware, Turro, Lignarolo and Dragoni (2025) implemented a quantum Carleman LBM on real problems and report median error fidelities around $10^{-3}$, which is encouraging in terms of accuracy. 

More generally, aerospace CFD simulation outputs are large classical fields that typically require reading out a $D$-dimensional field to fixed accuracy costs $\Omega(D)$ measurements; this is expensive. And as discussed in the previous section, the input embedding process is expensive too. This is currently a bottleneck at both ends; input loading and output read-out. QSLA so far has shown advantage only for few scalar problems, which, due to a small read-out, escape this caveat. 


## Economic quantum advantage
Classical CFD simulations today are typically run in GPU clusters that manufacturers have been using for decades, and a solver needing millions of physical qubits and weeks of runtime (Zhuang et al. 2025) is nowhere near cost parity. 

## Ecosystem considerations
Airbus and BMW Group ran a multi-year Quantum Computing Challenge ("The Quantum Mobility Quest," 2024) with an explicit track on aerodynamics, won by a University of Hamburg team on aircraft-noise and efficiency optimisation. PsiQuantum is collaborating with Airbus under the QuLAB programme to develop fault-tolerant fluid-mechanics algorithms, and Airbus has separately estimated the quantum resources for boundary-layer instability. Rolls-Royce is is running parallel collaborations with Xanadu and Riverlane, with Classiq, and with NVIDIA on GPU-accelerated circuit simulation of CFD meshes. This is a mature, well-funded research culture with domain experts on both sides. Further, there are classical methods that are coming out of this research, which in itself is valuable, for instance quantum-inspired tensor and lattice methods. 


