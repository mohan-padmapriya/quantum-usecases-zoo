---
title: Protein–Ligand Binding for Drug Discovery
sector: Life Sciences
verdict: "[[Contested]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/life-sciences
players:
  - Boehringer Ingelheim | boehringer-ingelheim.com
  - Google Quantum AI | quantumai.google
  - PsiQuantum | psiquantum.com
  - Qubit Pharmaceuticals | qubit-pharmaceuticals.com
  - Pasqal | pasqal.com
  - IBM | ibm.com
  - Roche | roche.com
signal: 4
---
# What and why
Structure-based drug discovery is largely a search for small-molecule ligands that bind a target protein tightly and selectively. The goal is to predict the binding free energy (affinity) to roughly chemical accuracy (~1 kcal/mol), since about 1.4 kcal/mol corresponds to a tenfold change in binding strength. Getting this right early lets chemists rank candidate molecules before synthesising them. It should be noted that binding affinity is not primarily an electronic-structure quantity. It is a statistical-mechanical average over thousands of atoms, influenced by conformational sampling of the protein, entropy, and other factors. Quantum computers can potentially accelerate electronic-structure problems, not free-energy sampling. Even a perfect quantum-chemistry oracle for the binding site would not address the actual bottleneck (thermodynamic sampling over many configurations), because no efficient quantum algorithm is known for that sampling problem. 

Moreober, there is a minority of pharmaceutically relevant cases where strong electronic correlation really is hard for classical computers. Some such problems include transition-metal active sites of metalloenzymes (the heme iron of cytochrome P450 is a popular example), radical intermediates, and some covalent or metallodrug chemistry. Here a quantum computer could in principle help, but the practical implementation is not straightforward. 

# [[Methodology|Four gates of quantum advantage]]
## Theoretical quantum advantage
Quantum phase estimation of the ground- and excited-state energies of a correlated active space, encoded directly onto qubits, could in principle produce an exponential speed-up. However, for this to work, it needs an initial state with non-negligible ground-state overlap, and that overlap generically decays as the active space grows.

Particular to this usecase is the fact that most drug-like ligands are organic, closed-shell, weakly correlated molecules for which classical DFT is already adequate. For problems of binding free energy, there is no known quantum speedup since it is a sampling and thermodynamic-integration problem. Proposals to instead use QAOA to "screen interaction space" or quantum kernels to predict affinity are a different approach, but these methods are ailed by the failures common to most QML algorithms, including dequantisation (Tang 2019), barren plateaus (McClean et al. 2018), and the cost of loading large classical datasets onto the device in the first place.

## Practical quantum advantage
No hardware demonstration has so far been able to compute a real protein–ligand binding affinity to chemical accuracy. Existing demonstrations reduce the problem to toy or coarse-grained lattice models, for example IBM's resource-efficient protein-folding demonstration on peptides of around ten residues on a simplified lattice, which is a proof of principle.

 oogle Quantum AI / Boehringer Ingelheim studied cytochrome P450 (Goings et al., 2022) and concluded that the resource estimate was on the order of billions of Toffoli gates and roughly a day of runtime on a fault-tolerant machine with millions of physical qubits. Subsequent algorithmic and architectural work by industry groups (PsiQuantum among them) has reported meaningful resource reductions for the heme electronic structure, and conclude that this usecase needs fault tolerance.
 
Pasqal / Qubit Pharmaceuticals's paper on hydration-water placement on the neutral-atom Orion device, ~100 qubits, in 2024–25, which uses a hybrid quantum-classical heuristic to position ordered water in a protein pocket, is worth noting here.

## Economic quantum advantage
The classical baseline is both strong and improving quickly; physics-based free-energy perturbation (Schrödinger's FEP+) already reaches roughly 1 kcal/mol median accuracy in prospective drug programmes today. In parallel, machine-learning interatomic potentials and co-folding models (AlphaFold3, Boltz, Chai) have transformed structure-based design at negligible marginal cost. Against a cost-equivalent classical machine, a quantum solution requiring millions of physical qubits and days of runtime for a single active-site energy has no economic advantage today.

## Ecosystem considerations
Boehringer Ingelheim runs an in-house quantum team, and Roche, AstraZeneca and others have quantum partnerships. Lots of money in this usecase.

