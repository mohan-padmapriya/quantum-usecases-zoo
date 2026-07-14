---
title: Carbon capture sorbents and DAC
sector: Climate
verdict: "[[Contested]]"
timeline: Unclear
Watch out for: "[[A better quantum algorithm]]"
tags:
  - usecase
  - sector/climate
players:
  - "IBM | ibm.com"
  - "Open Quantum Institute | open-quantum-institute.cern"
  - "QCentroid | qcentroid.xyz"
  - "ETH Zurich | ethz.ch"
---

# What and why
The primary job of CO2 capture sorbents and DAC materials is to remove carbon dioxide from the environment, with DAC materials addressing more diluted CO2 and CO2 capture sorbents being used for industrial point sources. For both concentrations, metal-organic frameworks (MOFs) are the most promising candidate, since their cage-like structure can be precisely tuned to vary selectivity and capacity depending on where they must be deployed. MOFs are essentially organic linkers bonded to metal ions, and their appeal over other solid sorbents is a customisable porous structure and large chemical selectivity. The challenge is finding MOF candidates that combine high CO2 selectivity with low regeneration energy, and the large variety of possible frameworks makes selecting the best candidate for a given application a serious computational problem. The idea is that quantum computing might identify good MOF candidates and clarify, at the electronic-structure level, how the choice of metal governs the interaction with CO2 and with competing atmospheric gases like H2O and N2.

# [[Methodology|Four gates of quantum advantage]]
## Theoretical quantum advantage
Quantum phase estimation might be used to estimate the ground-state energy of the gas-plus-binding-site system, and so predict adsorption energies more accurately than approximate classical methods. Unfortunately, CO2 uptake in a MOF like Mg-MOF-74 is dominated by physisorption, and the experimental binding energies are weak. Weak interactions, which are also clouded by dispersion effects and electrostatics, can already be modelled adequately by certain DFT techniques. There is a minority of open-shell transition-metal sites (an Fe centre, say) where multireference character makes the simulation harder, where quantum phase estimation might provide genuine advantage. Unfortunately even in this classically hard regime, there is the fact that exponential speedup is contingent on preparing an initial state with non-vanishing ground-state overlap, which is not guaranteed as the active space grows (Lee et al. 2023).

## Practical quantum advantage
Every hardware result to date is a proof of concept on a drastically simplified model, not a MOF. Barroca et al. reduce Mg-MOF-74 to a single Mg²⁺ metal centre and compute the potential energy surface for CO2, N2 and H2O using qubit-ADAPT-VQE within a four-qubit active space (three electrons in four orbitals) on IBM hardware, with twirled readout-error mitigation (T-REx) and no explicit noise model in the simulation. The method reaches chemical accuracy against a UCCSD-VQE benchmark while staying hardware-efficient, which is a positive result about the ansatz, but the single-ion approximation overestimates the CO2 binding energy by roughly a factor of six against experiment. Rocca et al. go further, treating periodic Fe-MOF-74 with a 28-qubit symmetry-preserving ansatz executed via sample-based quantum diagonalisation to keep circuit depth down, using DFT as the validation tool. These are the state of the art, and they are still small active spaces validated against, not beating, classical methods.
## Economic quantum advantage
The Open DAC 2023 effort (Meta FAIR and Georgia Tech), which serves as the best classical baseline, ran DFT across about 8,000 MOFs to generate roughly 176,000 adsorption-energy calculations from around 38 million single-point evaluations, then trained machine-learning interatomic potentials such as EquiformerV2 on the result (Sriram et al. 2024). That pipeline screens candidate materials at a marginal cost per structure that a quantum computation of a single metal centre does not yet compare with, and the machine-learned models for simulation are getting cheaper and more accurate each year. Against a cost-equivalent classical machine there is no economic case. 

## Deployment and ecosystem considerations
Open Quantum Institute at CERN, with QCentroid and ETH Zurich, is exploring quantum generative models (GANs) to propose MOF candidates across the vast configuration space. But nothing is deployed, the demonstrations are single-site models. Nonetheless, given this is a usecase that contributes directly to clean energy, it has drawn considerable interest. 

# References
1. Barroca et al., qubit-ADAPT-VQE simulation of CO2, N2 and H2O adsorption at the Mg²⁺ site of Mg-MOF-74 on IBM hardware — proof-of-concept study (source of the 39-47 kJ/mol binding-energy discussion and the ~6× single-ion overestimate).
2. Rocca, R. et al., "Quantum simulation of carbon capture in periodic metal-organic frameworks," *Digital Discovery* (RSC), vol. 5, 1388 (2024). https://pubs.rsc.org/dd/article/5/3/1388
3. Sriram, A. et al. (Meta FAIR & Georgia Tech), "The Open DAC 2023 Dataset and Challenges for Sorbent Discovery in Direct Air Capture," *ACS Central Science* 10(2): 409–421 (2024). DOI:10.1021/acscentsci.3c01629
4. Lee, S., Lee, J., Zhai, H. et al., "Evaluating the evidence for exponential quantum advantage in ground-state quantum chemistry," *Nature Communications* 14: 1952 (2023). arXiv:2208.02199
5. Reiher, M., Wiebe, N., Svore, K.M., Wecker, D., Troyer, M., "Elucidating reaction mechanisms on quantum computers," *PNAS* 114(29): 7555–7560 (2017). arXiv:1605.03590
6. Open Quantum Institute (CERN), with QCentroid and ETH Zurich, "Carbon capture" use-case project. https://open-quantum-institute.cern/carbon-capture/
