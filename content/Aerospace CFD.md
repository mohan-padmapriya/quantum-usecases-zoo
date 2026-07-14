---
title: Aerospace CFD
sector: Aerospace
verdict: "[[Algorithm-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/aerospace
Watch out for: "[[A better quantum algorithm]]"
players:
  - "Airbus | airbus.com"
  - "Rolls-Royce | rolls-royce.com"
  - "PsiQuantum | psiquantum.com"
  - "Xanadu | xanadu.ai"
  - "Riverlane | riverlane.com"
  - "Classiq | classiq.io"
  - "NVIDIA | nvidia.com"
  - "BMW Group | bmwgroup.com"
---
# What and why
Computational fluid dynamics (CFD) is one of the main approaches used in aerospace design. Before an aircraft wing, a nacelle, or a turbine blade is ever built, its behaviour in air is predicted by numerically solving the Navier–Stokes equations on a mesh, which essentially models pressure, velocity, and temperature at millions to billions of grid points. Such simulation allows drag reduction, even few percent of which, across the fleet, is worth billions in fuel and a meaningful fraction of aviation's carbon budget. Manufacturers still rely on expensive physical rigs because these simulations are too expensive for classical machines.

There is a lot of funding for quantum solutions to this usecase. The logic is that a register of $n$ qubits spans a state space of dimension $2^n$; if you could encode a discretised flow field of $2^n$ cells into that register and evolve it, you would get exponential compression of the state and, the hope goes, an exponential speedup. However, it is not this straightforward, as we will see in the next few sections. 
# Gates of quantum advantage

## Theoretical quantum advantage
The Navier–Stokes equations are nonlinear, whereas the Schrödinger evolution a quantum computer implements natively is linear and unitary. Not to say quantum computing therefore cannot be applied here, rather, you cannot simply load a flow field into a quantum state and let the hardware evolve it. Instead, there are two main workarounds. With the Carleman linearisation approach, you embed the finite-dimensional nonlinear system into an infinite-dimensional linear one by carrying along all the polynomial products of the variables as new coordinates, then truncate at some order $\nu$. The truncated linear system can be handed to a quantum linear-system or Hamiltonian-simulation subroutine. Having said that, this approach is quite restrictive in the regime it works for.

The second workaround is to solve the linearised Navier–Stokes equations directly with a quantum linear systems algorithm (QLSA) like HHL (Harrow, Hassidim and Lloyd 2009) or its modern descendants, inside an outer iteration that handles the nonlinearity classically. This is the route Airbus has pursued for boundary-layer instability (the onset of turbulence over a wing) and the one Rolls-Royce and Classiq have also used in an industrial pipeline. However, with HHL, quantum advantage is not guaranteed, as discussed in - [[Quantum Advantage FAQ#2. Where is quantum advantage believed to exist]]. 

All in all, the theretical quantum advantage here is conditional. 

## Practical quantum advantage
 The most complete end-to-end estimate, Zhuang et al. (2025), integrates a spectral input/output scheme, a synthesised circuit and error correction, and reports that solving Navier–Stokes on a $2^{80}$-point grid would take roughly 8.71 million physical qubits at a $5\times10^{-4}$ error rate and about 42.6 days of runtime (arXiv:2509.08807), and they present this, fairly, as a two-orders-of-magnitude improvement on prior estimates and an asymptotic exponential win over a classical supercomputer that would need a century. On the near-term side, Turro, Lignarolo and Dragoni (2025) implemented a quantum Carleman LBM on real problems and report median error fidelities around $10^{-3}$, which is encouraging in terms of accuracy. 

More generally, aerospace CFD simulation outputs are large classical fields and reading out a $D$-dimensional field to fixed accuracy costs $\Omega(D)$ measurements; this is expensive. And as discussed in the previous section, the input embedding process is expensive too. This is currently a bottleneck at both ends; input loading and output read-out. QSLA so far has shown advantage only for few scalar problems. 


## Economic quantum advantage
Classical CFD simulations today are typically run in GPU clusters that manufacturers have been using for decades, and a solver needing millions of physical qubits and weeks of runtime (Zhuang et al. 2025) is nowhere near cost parity. 

## Ecosystem considerations
Airbus and BMW Group ran a multi-year Quantum Computing Challenge ("The Quantum Mobility Quest," 2024) with an explicit aerodynamics-solver track, won by a University of Hamburg team on aircraft-noise and efficiency optimisation. PsiQuantum is collaborating with Airbus under the QuLAB programme to develop fault-tolerant fluid-mechanics algorithms, and Airbus has separately estimated the quantum resources for boundary-layer instability. Rolls-Royce is the most active engine-side player, running parallel collaborations with Xanadu and Riverlane, with Classiq, and with NVIDIA on GPU-accelerated circuit simulation of CFD meshes. This is a mature, well-funded research culture with domain experts on both sides. Further, there are classical methods that are coming out of this research that is valuable, for instance quantum-inspired tensor and lattice methods. 
# References

1. Harrow, A. W., Hassidim, A., and Lloyd, S. (2009). "Quantum algorithm for linear systems of equations." *Physical Review Letters* 103, 150502. arXiv:0811.3171. https://doi.org/10.1103/PhysRevLett.103.150502
2. Aaronson, S. (2015). "Read the fine print." *Nature Physics* 11, 291–293. https://doi.org/10.1038/nphys3272 (author copy: https://www.scottaaronson.com/papers/qml.pdf)
3. Liu, J.-P., Kolden, H. Ø., Krovi, H. K., Loureiro, N. F., Trivisa, K., and Childs, A. M. (2021). "Efficient quantum algorithm for dissipative nonlinear differential equations." *PNAS* 118, e2026805118. arXiv:2011.03185. https://doi.org/10.1073/pnas.2026805118
4. Li, X., Yin, X., Wiebe, N., Chun, J., Schenter, G. K., Cheung, M. S., and Mülmenstädt, J. (2023). "Potential quantum advantage for simulation of fluid dynamics." arXiv:2303.16550. Published in *Physical Review Research* 7, 013036 (2025). https://arxiv.org/abs/2303.16550
5. Gonzalez-Conde, J., Lewis, D., Bharadwaj, S. S., and Sanz, M. (2024). "Quantum Carleman linearisation efficiency in nonlinear fluid dynamics." arXiv:2410.23057. Published in *Physical Review Research* 7, 023254 (2025). https://arxiv.org/abs/2410.23057
6. Zhuang, X.-N., et al. (2025). "A Pathway to Practical Quantum Advantage in Solving Navier-Stokes Equations." arXiv:2509.08807. https://arxiv.org/abs/2509.08807
7. Turro, F., Lignarolo, A., and Dragoni, D. (2025). "Practical Application of the Quantum Carleman Lattice Boltzmann Method in Industrial CFD Simulations." arXiv:2504.13033. https://arxiv.org/abs/2504.13033
8. Bakker, B., and Watts, T. W. (2023). "Quantum Carleman Linearization of the Lattice Boltzmann Equation with Boundary Conditions." arXiv:2312.04781. https://arxiv.org/abs/2312.04781
9. Classiq and Rolls-Royce (2026). "Approximate Quantum Linear Solvers for Hybrid CFD: End-to-End Analysis with a Chebyshev-LCU Approach." arXiv:2606.01067. https://arxiv.org/abs/2606.01067
10. Rolls-Royce (28 November 2025). "Quantum project unlocks accelerated run times for giant air flow calculations." Press release (with Xanadu and Riverlane). https://www.rolls-royce.com/media/press-releases/2025/28-11-2025-quantum-project-unlocks-accelerated-run-times-for-giant-air-flow-calculations.aspx
11. PsiQuantum (2025). "PsiQuantum Collaborating with Airbus to Advance Quantum Computing for Aerospace" (QuLAB programme). https://www.psiquantum.com/news-import/airbus
12. Airbus and BMW Group (2024). "The Quantum Mobility Quest" Quantum Computing Challenge — aerodynamics quantum-solver track and 2024 winners. https://www.airbus.com/en/innovation/digital-transformation/quantum-technologies/airbus-and-bmw-quantum-computing-challenge
13. Pope, S. B. (2000). *Turbulent Flows.* Cambridge University Press (Reynolds-number scaling of DNS grid requirements). https://doi.org/10.1017/CBO9780511840531
