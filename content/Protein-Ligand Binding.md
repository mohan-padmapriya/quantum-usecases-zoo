---
title: Protein–Ligand Binding for Drug Discovery
sector: Life Sciences
verdict: "[[Contested]]"
timeline: Fault-tolerant era
Watch out for: "[[A better quantum algorithm]]"
tags:
  - usecase
  - sector/life-sciences
players:
  - "Boehringer Ingelheim | boehringer-ingelheim.com"
  - "Google Quantum AI | quantumai.google"
  - "PsiQuantum | psiquantum.com"
  - "Qubit Pharmaceuticals | qubit-pharmaceuticals.com"
  - "Pasqal | pasqal.com"
  - "IBM | ibm.com"
  - "Roche | roche.com"
---
# What and why

Structure-based drug discovery is largely a search for small-molecule ligands that bind a target protein tightly and selectively. The quantitative goal is to predict the binding free energy (affinity) to roughly chemical accuracy (~1 kcal/mol), since about 1.4 kcal/mol corresponds to a tenfold change in binding strength. Getting this right early lets chemists rank candidate molecules before synthesising them. The recurring pitch is that a quantum computer can simulate molecular interactions "exactly," and so will predict binding where classical approximations fail.

The anti-hype reality has two layers, and they pull in different directions.

First, a **problem mismatch**. Binding affinity is not primarily an electronic-structure quantity. It is a statistical-mechanical average over thousands of atoms, dominated by conformational sampling of the protein, the reorganisation of ordered water in the pocket, and entropy. Quantum computers accelerate *electronic-structure* problems, not free-energy sampling. Even a perfect quantum-chemistry oracle for the binding site would leave the actual bottleneck (thermodynamic sampling over many configurations) untouched, because no efficient quantum algorithm is known for that sampling problem as it occurs in practice.

Second, a **narrow genuine niche**. There is a minority of pharmaceutically relevant cases where strong electronic correlation really is the hard part: transition-metal active sites of metalloenzymes (the heme iron of cytochrome P450 is the canonical example), radical intermediates, and some covalent or metallodrug chemistry. Here a quantum computer could in principle help, but the case inherits every difficulty of the [[FeMoco Nitrogen Fixation|FeMoco]] story: overlap-limited state preparation, fault-tolerant-era resource costs, and strong classical multireference competitors.

# [[Methodology|Four gates of quantum advantage]]

## Theoretical quantum advantage
The exponential-speedup argument is the standard one for quantum chemistry: quantum phase estimation of the ground- and excited-state energies of a correlated active space, encoded directly onto qubits. It is subject to exactly the conditionality flagged for FeMoco: it needs an initial state with non-negligible ground-state overlap, and that overlap generically decays as the active space grows.

Two further points weaken the case specifically for drug discovery. Most drug-like ligands are organic, closed-shell, weakly correlated molecules for which classical DFT is already adequate, so there is no advantage even in theory for the bulk of a screening campaign; the correlation-hard cases are the exception, not the rule. And the headline deliverable, the binding free energy, has no known quantum speedup at all: it is a sampling and thermodynamic-integration problem. Proposals to instead use QAOA to "screen interaction space" or quantum kernels to predict affinity inherit the generic quantum-machine-learning failure modes: dequantisation (Tang 2019), barren plateaus (McClean et al. 2018), and the cost of loading large classical datasets onto the device in the first place.

## Practical quantum advantage
No hardware demonstration computes a real protein–ligand binding affinity to chemical accuracy. Existing demonstrations reduce the problem to toy fragments or coarse-grained lattice models, for example IBM's resource-efficient protein-folding demonstration on peptides of around ten residues on a simplified lattice, which is a proof of principle rather than a binding calculation.

For the flagship "hard" instance, cytochrome P450, the Google Quantum AI / Boehringer Ingelheim resource study (Goings et al., 2022) put the correlated active-site simulation on a FeMoco-like footing: on the order of billions of Toffoli gates and roughly a day of runtime on a fault-tolerant machine with millions of physical qubits. Subsequent algorithmic and architectural work by industry groups (PsiQuantum among them) has reported meaningful resource reductions for the heme electronic structure, but the target remains firmly in the fault-tolerant era.

The most concrete on-hardware result is the Pasqal / Qubit Pharmaceuticals hydration-water placement work (neutral-atom Orion device, ~100 qubits, 2024–25), which uses a hybrid quantum-classical heuristic to position ordered water in a protein pocket. It is a real device running on a real sub-task, but it is a heuristic on one component of the pipeline, not a validated binding-affinity result that beats a classical method.

## Economic quantum advantage
The classical baseline is both strong and improving quickly, which is what makes the economic gate hard to clear. Physics-based free-energy perturbation (Schrödinger's FEP+) already reaches roughly 1 kcal/mol median accuracy in prospective drug programmes today. In parallel, machine-learning interatomic potentials and co-folding models (AlphaFold3, Boltz, Chai) have transformed structure-based design at negligible marginal cost. Against a cost-equivalent classical machine, a quantum solution requiring millions of physical qubits and days of runtime for a single active-site energy has no economic path, and this is before accounting for the sampling problem the quantum computer does not address at all.

## Deployment and ecosystem considerations
Investment and framing are heavy: Boehringer Ingelheim runs an in-house quantum team, and Roche, AstraZeneca and others have quantum partnerships. But the activity is explicitly long-horizon R&D; nothing is in production, and no approved drug has been designed by a quantum computer. The "curing disease" framing that appears in marketing should be read as motivation, not delivered capability.

# Verdict
Quantum computers target the electronic structure of a small pocket, while the quantity pharma actually needs, binding free energy, is dominated by classical sampling, solvation and entropy that no quantum algorithm speeds up. The narrow niche where electronic correlation is genuinely the bottleneck (metalloenzyme active sites like P450) is real but is contested against converged classical DMRG and coupled-cluster methods, exactly as for FeMoco. UPGRADE trigger: a fault-tolerant hardware demonstration computing a correlated active-site quantity (e.g. a P450 spin-gap) beyond converged classical multireference methods and feeding a validated affinity prediction. DOWNGRADE trigger (already underway): FEP plus machine-learning potentials consolidating chemical accuracy across the correlated cases too, erasing the remaining niche.

## Responsible quantum
Health and "curing disease" framing is among the most emotionally potent marketing in quantum computing; benefit claims should be treated as motivation, not capability, and read against a classical baseline that is currently winning. Any realised benefit would accrue first to well-resourced pharmaceutical incumbents. Dual-use risk is low.

# References
1. Goings, J.J., White, A., Lee, J. et al., "Reliably assessing the electronic structure of cytochrome P450 on today's classical computers and tomorrow's quantum computers," *PNAS* 119(38): e2203533119 (2022). arXiv:2202.01244
2. Robert, A., Barkoutsos, P.K., Woerner, S., Tavernelli, I., "Resource-efficient quantum algorithm for protein folding," *npj Quantum Information* 7: 38 (2021). DOI:10.1038/s41534-021-00368-4
3. Lee, S., Lee, J., Zhai, H. et al., "Evaluating the evidence for exponential quantum advantage in ground-state quantum chemistry," *Nature Communications* 14: 1952 (2023). arXiv:2208.02199
4. Reiher, M., Wiebe, N., Svore, K.M., Wecker, D., Troyer, M., "Elucidating reaction mechanisms on quantum computers," *PNAS* 114(29): 7555–7560 (2017). arXiv:1605.03590
5. Wang, L., Wu, Y., Deng, Y. et al., "Accurate and reliable prediction of relative ligand binding potency in prospective drug discovery by way of a modern free-energy calculation protocol and force field," *Journal of the American Chemical Society* 137(7): 2695–2703 (2015). DOI:10.1021/ja512751q
6. Abramson, J., Adler, J., Dunger, J. et al., "Accurate structure prediction of biomolecular interactions with AlphaFold 3," *Nature* 630: 493–500 (2024). DOI:10.1038/s41586-024-07487-w
7. Aaronson, S., "Read the fine print," *Nature Physics* 11: 291–293 (2015). DOI:10.1038/nphys3272
8. Tang, E., "A quantum-inspired classical algorithm for recommendation systems," *Proc. 51st ACM STOC*: 217–228 (2019). arXiv:1807.04271
9. McClean, J.R., Boixo, S., Smelyanskiy, V.N., Babbush, R., Neven, H., "Barren plateaus in quantum neural network training landscapes," *Nature Communications* 9: 4812 (2018). arXiv:1803.11173
10. Qubit Pharmaceuticals & Pasqal, company communications on neutral-atom simulation of protein hydration sites (2024). https://www.qubit-pharmaceuticals.com
