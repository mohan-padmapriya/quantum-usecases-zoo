---
title: Battery Materials Simulation
sector: Energy
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/energy
Watch out for: "[[A better classical baseline]]"
players:
  - "Mercedes-Benz | mercedes-benz.com"
  - "Volkswagen Group | volkswagen-group.com"
  - "BMW Group | bmwgroup.com"
  - "IBM Quantum | ibm.com"
  - "Google Quantum AI | quantumai.google"
  - "PsiQuantum | psiquantum.com"
  - "Xanadu | xanadu.ai"
  - "Quantinuum | quantinuum.com"
  - "QunaSys | qunasys.com"
  - "Mitsubishi Chemical | mcgc.com"
---
# What and why
A lithium-ion cathode is a transition-metal oxide - think LiCoO₂, LiNiO₂, or the NMC family LiNi₁₋ₓ₋ᵧMnₓCoᵧO₂ - in which lithium shuttles in and out during charge and discharge. The properties that are interesting to material scientists, like cell voltage, ionic mobility, thermal stability, degradation mechanisms, descend from the electronic structure of those partially filled transition-metal *d* orbitals, in which electrons experience strong electronic correlations. It is in this correlated-electron regime that classical methods used to determine these properties, typically DFT + dynamic mean-field theory, becomes expensive and prone to errors. 

This is where experts believe quantum simulation can help.

# [[Methodology|Gates of quantum advantage]]

## Theoretical quantum advantage
The classical techniques of DFT and DMFT fail qualitatively for several battery-relevant oxides. For instance, for LiNiO₂, room-temperature DFT+DMFT reproduces the experimental insulating gap of ~0.6 eV with combined Mott and charge-transfer character, whereas GGA, meta-GGA and hybrid functionals all predict a ferromagnetic half-metal - i.e. the wrong ground state (Chen et al. 2024). Follow-up work applying DFT+DMFT and charge-transfer multiplet simulations across LiCoO₂, LiNiO₂ and NMC found that the redox chemistry is controlled by exactly this many-body physics (2025 DFT+DMFT redox study). This mechanism also applies to lithium-excess cathodes, and it is a strong-correlation problem that might warrant a quantum algorithm, since it is quantum many-body evolution, it does not require loading a large classical dataset or reading out a huge solution vector (you want a handful of energies and spectral quantities), and the correlated *d*-orbital active space is difficult to simulate. The relevant model system, the multi-orbital Fermi-Hubbard/Anderson impurity problem, is the canonical strongly-correlated benchmark, and its resource estimate using fault-tolerant computing has been quantified already (Yoshioka et al. 2024).

However, it is not trivial to prepare an initial state with non-negligible overlap on the true ground state, and there is no guarantee that overlap exists as the active space grows. And on the classical side, continuous-time quantum Monte Carlo impurity solvers are getting better. They can already handle single- and few-impurity DMFT well, and struggle only in the niche case of multi-impurity problems at many states-of-charge. So the theoretical advantage is exists, but is not a solid exponential separation. 

## Practical quantum advantage
The most relevant resource estimate for this usecase is the Xanadu-Volkswagen study of the cathode material, dilithium iron silicate (Li₂FeSiO₄), Delgado et al. 2022. Using qubitisation-based quantum phase estimation to get equilibrium voltages, ionic mobility and thermal stability, they estimated that the simulation needed more than 2,000 logical qubits and on the order of 10¹³ Toffoli gates. A 2023 follow-up on lithium-excess cathodes confirmed these results. 10¹³ Toffolis at realistic logical clock rates is days-to-longer of runtime on a machine that does not yet exist, and 2000 logical qubits means orders more of physical qubits. 

A 2025 study validating quantum simulation of transition-metal-oxide automotive catalysis (relevant because it is the same late-3d-oxide physics) estimated  chemically~10⁶-10⁷ physical qubits to simulate palladium-zeolite (Validation study 2025), but it conceded that classical multireference methods remain adequate for the smaller systems. IBM and Daimler ran a variational quantum eigensolver on IBM devices to compute ground-state energies and dipole moments along dissociation curves for lithium-sulfur battery species including LiH, H₂S, LiSH and the target Li₂S. These are four small molecules, breaking a single bond, on a NISQ device with heavy error mitigation. Researchers have also modelled LiCoO₂ as gas-phase Li₂Co₂O₄/Co₂O₄ fragments, which needed ~20 qubits per two formula units and ~400 qubits for a still-small 40-formula-unit supercell (2022 VQE cathode study). All of this has contributed to the developmet of techniques, but nothing so far has proven a practical quantum advantage. Even the more recent hardware demonstrations of X-ray absorption spectra for battery materials remain small-active-space proofs of principle (2025 XAS study).

## Economic quantum advantage

For the majority of battery-materials screening, DFT is adequate. On top of that, machine-learned interatomic potentials now reproduce these DFT results at a lower cost, and are being used for high-throughput screening (MLIP cathode review 2024). There is now plenty of research into combining DFT with ML to screen thousands of candidates for the price of one quantum job, that, at the moment does not exist. There are certain hard-correlation cases, but for these, a fault-tolerant machine that can do a 2,000-logical-qubit, 10¹³-Toffoli cathode calculation is, on any current cost model, orders of magnitude more expensive per calculation than the classical DFT+DMFT it would replace - and DFT+DMFT, for the single-impurity cases, already runs on ordinary clusters.
## Ecosystem considerations

There are several automobile companies investing in this usecase. IBM Quantum with Daimler/Mercedes-Benz on lithium-sulfur (Rice et al. 2021); PsiQuantum with Mercedes-Benz on fault-tolerant battery-chemistry simulation; Volkswagen Group with both Google and Xanadu on battery materials, the latter producing the Delgado cathode resource estimate; BMW Group with Quantinuum on electrochemical processes for batteries and fuel cells; QunaSys with Mitsubishi Chemical and JSR, and inside the €20m EU FULL-MAP battery consortium (QunaSys 2024). 

However, essentially all of this is R&D and algorithm-development waiting for fault tolerance. Nonetheless, a decade of these pilots has measurably improved the classical side. Dual-use risk is negligible; the strategic stakes are industrial competitiveness in EVs, not security.

# References

1. Delgado, A., Casares, P. A. M., dos Reis, R., et al. (2022). *Simulating key properties of lithium-ion batteries with a fault-tolerant quantum computer.* Phys. Rev. A **106**, 032428. arXiv:2204.11890. (Xanadu/Volkswagen; dilithium iron silicate cathode; >2,000 logical qubits, ~10¹³ Toffoli gates.)
2. Rice, J. E., Gujarati, T. P., Motta, M., Takeshita, T. Y., Lee, E., Latone, J. A., Garcia, J. M. (2021). *Quantum computation of dominant products in lithium-sulfur batteries.* J. Chem. Phys. **154**, 134115. arXiv:2001.01120. (IBM/Daimler; VQE energies and dipole moments for LiH, H₂S, LiSH, Li₂S on IBM hardware.)
3. *Validation of Quantum Computing for Transition Metal Oxide-based Automotive Catalysis* (2025). arXiv:2512.19778. (~10⁶-10⁷ physical qubits for chemically accurate Pd-zeolite; TiO/MnO/FeO validation; explicitly fault-tolerant-era.)
4. *Towards the simulation of transition-metal oxides of the cathode battery materials using VQE methods* (2022). arXiv:2208.07977. (LiCoO₂ via gas-phase fragments; ~20 qubits per two formula units, ~400 qubits for a 40-formula-unit supercell; FMO-VQE reduction.)
5. Chen et al. (2024). *Dynamic-correlation-driven paramagnetic insulating state in LiNiO₂* (DFT+DMFT). ChemRxiv:10.26434/chemrxiv-2024-3n05d. (DMFT recovers ~0.6 eV Mott/charge-transfer gap; GGA, meta-GGA and hybrids wrongly predict a ferromagnetic half-metal.)
6. *Redox Chemistry of LiCoO₂, LiNiO₂, and LiNi₁/₃Mn₁/₃Co₁/₃O₂ Cathodes: via XPS, DFT+DMFT, and Charge Transfer Multiplet Simulations* (2025). arXiv:2510.02875. (Metal-vs-oxygen redox governed by many-body correlation.)
7. Aykol, M., et al. (2020). *Prediction of Li intercalation voltages in rechargeable battery cathode materials: effects of exchange-correlation functional, van der Waals interactions, and Hubbard U.* arXiv:2003.01757. (Classical DFT/DFT+U baseline for cathode voltages.)
8. Yoshioka, N., et al. (2024). *Quantifying fault-tolerant simulation of strongly correlated systems using the Fermi-Hubbard model.* arXiv:2406.06511. (Fault-tolerant resource costing of the canonical strongly-correlated model.)
9. *Machine learning interatomic potentials in engineering perspective for developing cathode materials* (2024). J. Mater. Chem. A. RSC DOI:10.1039/d4ta03452j. (MLIPs at DFT accuracy, 3-4 orders of magnitude cheaper; high-throughput cathode screening.)
10. *Fast simulations of X-ray absorption spectroscopy for battery materials on a quantum computer* (2025). arXiv:2506.15784. (Small-active-space hardware/algorithm demonstration for battery XAS.)
11. Volkswagen Group and Xanadu (2022). *Volkswagen Group and Xanadu establish quantum simulation program for battery materials.* xanadu.ai/press and volkswagen-group.com press release. (Multi-year fault-tolerant battery-materials algorithm program.)
12. PsiQuantum and Mercedes-Benz (2022). *PsiQuantum partners with Mercedes-Benz to research battery chemistry simulation on a fault-tolerant quantum processor.* quantumcomputingreport.com / thequantuminsider.com.
13. QunaSys (2024). *QunaSys joins a leading European consortium (FULL-MAP) to advance sustainable battery innovation with quantum computing.* qunasys.com/en/news. (€19.95m EU project; electrolyte/anode/cathode modelling; also Mitsubishi Chemical and JSR joint research.)
14. Quantinuum and BMW Group (2021-2026). *BMW Group and Quantinuum multi-year partnership on electrochemical processes for fuel cells and batteries.* quantinuum.com press releases.
