---
title: Carbon capture sorbents and DAC
sector: Climate
verdict: "[[Contested]]"
timeline: Unclear
Watch out for: "[[A better quantum algorithm]]"
tags:
  - usecase
  - sector/climate
---

# What and why
The primary job of CO2 capture sorbents and DAC materials is to remove carbon dioxide from the environment, with DAC materials addressing more diluted CO2 and CO2 capture sorbents being used for industrial point sources. For both concentrations, MOF (metal-organic frameworks) are the most promising candidate, since their cagelike structure might be precisely tuned to vary selectivity and capacity depending on where they must be deployed. The challenge is in finding MOF candidates that possess high CO2 selectivity and low regeneration energy. The idea is quantum computing might be used to identify good MOF candidates and understand their interaction with CO2, and also other atmospheric gases. 

# [[Methodology|Four gates of quantum advantage]]
## Theoretical quantum advantage


## Practical quantum advantage


## Economic quantum advantage


## Deployment/ecosystem advantage

### What 
- reducing GHG by capturing them
- natural gas and coal-fired power plants could be retrofitted with post-combustion of CO2
- To find MOFs, estimate binding potential of a set of representatibe molecules in the atmosphere like CO2, H2O, N2, within a simplified model system. 
-  critical to understand, at the quantum level, how the choice of metal affects CO2 interaction, a knowledge that is essential for rational material design.
- Focus only on X-MOF-74 family
- Calculate Potential Energy Surface for several metal/molecule combinations of the Mg-MOF-74 primitive cell, simplified. Get binding energy and equilibrium distance
- Simulation without noise model
- IBM quantum hardware - 4 qubit active space limitation means three electrons, 4 molecular orbits, twirled readout error extinction (T-Rex)

## Why
- MOFs from other solid sorbents because they have a customisable porous structure and large chemical selectivity
- MOFs are basically organic linkers + metal ions. 
- *The large variety of MOFs poses significant computational challenges for the selection of the best candidate material for a given application.* - [[vast molecular search space]]. 


## Alternatives
Amine scrubbing, which is a liquid sorbent based method, unfortunately they are corrosive and high desorption energy requirement, inefficient. 
Other solid sorbent options are nanoporous solids, such as zeolites, covalent organic frameworks, zeolitic imidazotale frameworks adn porous polymer networks. These dont require bond-formation and absorb CO2 selectively through physisorption, which means lower regeneration energy, and lower operating costs. But solid sorbents are less selective due to competitve adsorbtion with CO2 and incomplete regeneration due to water passivation of adsorbtion sites. 





Barroca paper - 
[[vast molecular search space]]
- goal: predict gas adsorbtion
	- simulate potential energy surface for CO2, N2,  and H2O molecules at the Mg+2 metal center that represents the binding sites of typical MOF frameworks
- Technique: ADAPT-VQE
- Proof of concept
-  qubit-ADPAT-VQE achieves chemical accuracy when
compared to UCCSD-VQE while maintaining hardware efficiency.
- The experimental binding energies for CO2 on Mg-MOF-74 are in the range of 39-47 kJ/mol.28 These values translate to 15-18 mHa per molecule, which is about 6x smaller than the results we obtained. This illustrates the limits of the oversimplification made by reducing the Mg-MOF-74 structure to a single metal ion
-  UCCSD-VQE (green circles) and qubit-ADAPT-VQE (blue circles) match the
NumPy (magenta triangles) benchmark in all three cases, however, RYRZ-VQE (red circles) only matches the benchmark for the simplest system, namely, Mg+2 + H2O.
![[BaroccaFig6.png]]

Rocca paper
https://pubs.rsc.org/dd/article/5/3/1388/1232033/Quantum-simulation-of-carbon-capture-in-periodic?silentauthchecked=true
- use Fe-MOF-74
- they use a procedure to build an active space, extract a smaller subspace for numerical simulation, based on the quantum number preserving ansatz with the VQE framework. 
- use an ansatz that needs 28 qubits, but used a sample-based quantum diagonlisation that cna use this ansatz but with reduced circuit depth. 
- use DFT as a validation tool

![[RoccaFig5.png]]
*Partial charges of the occupied orbitals included in the reduced active space of CO2@MOF, MOF, and CO2. The MOF and CO2 orbitals are depicted on the side of the corresponding orbital in the adsorbed system*

Open Quantum Institute
https://open-quantum-institute.cern/carbon-capture/
- QCentroid and ETH Zurich
- Identifying and optimising MOFs from a vast space of possible configurations using quantum GANs

## Classical baseline
The dominant classical effort is the Open DAC 2023 dataset (Meta FAIR and Georgia Tech, 2023, _ACS Central Science_), which used DFT (PBE+D3) across about 8,000 MOFs to produce roughly 176,000 adsorption energies and about 38 million single-point calculations, then trained machine-learning models (for example EquiformerV2 graph neural networks) on them.


# Verdict 
Quantum is used to compute binding energies on tiny fragments while classical DFT-plus-ML dominates real screening. UPGRADE trigger: a hardware demonstration computing a full MOF-pore CO₂ binding energy to chemical accuracy and beating DFT. DOWNGRADE trigger (already underway): machine-learning interatomic potentials reaching DFT-level accuracy at negligible cost, eliminating the niche.

## Responsible quantum
Clean-energy and climate framing is heavily used in marketing. Climate-benefit claims should be read as motivation, not delivered capability. Dual-use risk is low. Benefits, if realized, would accrue first to well-funded institutions.

