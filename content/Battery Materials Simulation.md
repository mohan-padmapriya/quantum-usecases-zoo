---
title: Battery Materials Simulation
sector: Energy
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/energy
players:
  - Mercedes-Benz | mercedes-benz.com
  - Volkswagen Group | volkswagen-group.com
  - BMW Group | bmwgroup.com
  - IBM Quantum | ibm.com
  - Google Quantum AI | quantumai.google
  - PsiQuantum | psiquantum.com
  - Xanadu | xanadu.ai
  - Quantinuum | quantinuum.com
  - QunaSys | qunasys.com
  - Mitsubishi Chemical | mcgc.com
signal: 4
note: automobile industry
---
# What and why
A lithium-ion cathode is a transition-metal oxide in which lithium shuttles in and out during charge and discharge. The properties that are interesting to material scientists, like cell voltage, ionic mobility, thermal stability, degradation mechanisms, are caused by electronic structure of those partially filled transition-metal *d* orbitals, in which electrons experience strong electronic correlations. It is in this correlated-electron regime that classical methods used to determine these properties, typically DFT + dynamic mean-field theory, becomes expensive and prone to errors. 

This is where experts believe quantum simulation can help.

# [[Methodology|Gates of quantum advantage]]

## Theoretical quantum advantage
The classical techniques of DFT and DMFT fail qualitatively for several battery-relevant oxides. This is also true for lithium-excess cathodes, and it is a strong-correlation problem that might warrant a quantum algorithm. What makes this problem particularly relevant for quantum is that it is inherently a quantum many-body evolution, it does not require loading a large classical dataset or reading out a huge solution vector (you want a handful of energies and spectral quantities), and the correlated *d*-orbital active space is difficult to simulate classically. The relevant model system, the multi-orbital Fermi-Hubbard/Anderson impurity problem, is the canonical strongly-correlated benchmark, and its resource estimate using fault-tolerant computing has been quantified already (Yoshioka et al. 2024).

However, it is not trivial to prepare an initial state with non-negligible overlap on the true ground state, and there is no guarantee that overlap exists as the active space grows. And on the classical side, continuous-time quantum Monte Carlo impurity solvers are getting better. They can already handle single- and few-impurity DMFT well, and struggle only in the niche case of multi-impurity problems at many states-of-charge. So the theoretical advantage is exists, but is not a solid exponential separation. 

## Practical quantum advantage
The most relevant resource estimate for this usecase is the Xanadu-Volkswagen study of the cathode material, dilithium iron silicate (Li₂FeSiO₄), Delgado et al. 2022. Using qubitisation-based quantum phase estimation to get equilibrium voltages, ionic mobility, and thermal stability, they estimated that the simulation needed more than 2,000 logical qubits and on the order of 10¹³ Toffoli gates. A 2023 follow-up on lithium-excess cathodes confirmed these results. 10¹³ Toffolis at realistic logical clock rates is several days runtime, and we don't even have logical qubits yet. 

A 2025 study validating quantum simulation of transition-metal-oxide automotive catalysis (relevant because it is the same late-3d-oxide physics) estimated  chemically~10⁶-10⁷ physical qubits to simulate palladium-zeolite (Validation study 2025), but it conceded that classical multireference methods remain adequate for the smaller systems. IBM and Daimler ran a variational quantum eigensolver on IBM devices to compute ground-state energies and dipole moments along dissociation curves for lithium-sulfur battery species including LiH, H₂S, LiSH and the target Li₂S. However, note that these just are four small molecules, breaking a single bond, on a NISQ device with heavy error mitigation. Researchers have also modelled LiCoO₂ as gas-phase Li₂Co₂O₄/Co₂O₄ fragments, which needed ~20 qubits per two formula units and ~400 qubits for a still-small 40-formula-unit supercell (2022 VQE cathode study). All of this has contributed to the development of techniques, but nothing so far has proven a practical quantum advantage. Even the more recent hardware demonstrations of X-ray absorption spectra for battery materials remain proofs of principle (2025 XAS study).

## Economic quantum advantage
For the majority of battery-materials screening, DFT is adequate. On top of that, interatomic potentials got using ML can now reproduce these DFT results at a lower cost, and are being used for high-throughput screening (MLIP cathode review 2024). There is now plenty of research into combining DFT with ML to screen thousands of candidates for the price of one quantum job, that, at the moment, we cannot do yet because we dont have the hardware. There are certain hard-correlation cases, but for these, a fault-tolerant machine that can do a 2,000-logical-qubit, 10¹³-Toffoli cathode calculation is, on any current cost model, orders of magnitude more expensive per calculation than the classical DFT+DMFT, which, for the single-impurity cases, already runs on ordinary clusters.
## Ecosystem considerations
There are several automobile companies investing in this usecase. IBM Quantum with Daimler/Mercedes-Benz on lithium-sulfur (Rice et al. 2021); PsiQuantum with Mercedes-Benz on fault-tolerant battery-chemistry simulation; Volkswagen Group with both Google and Xanadu on battery materials, the latter producing the Delgado cathode resource estimate; BMW Group with Quantinuum on electrochemical processes for batteries and fuel cells; QunaSys with Mitsubishi Chemical and JSR, and inside the €20m EU FULL-MAP battery consortium (QunaSys 2024). 

However, essentially all of this is R&D and algorithm-development waiting for fault tolerance. Nonetheless, a decade of these pilots has measurably improved the classical side. Dual-use risk is negligible, since the strategic stakes are industrial competitiveness in EVs, not security.

