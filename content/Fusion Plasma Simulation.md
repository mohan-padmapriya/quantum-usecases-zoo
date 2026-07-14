---
title: Fusion Plasma Simulation & Control
sector: Energy
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/energy
Watch out for: Better quantum hardware
players:
  - "Lawrence Livermore National Laboratory | llnl.gov"
  - "Princeton Plasma Physics Laboratory | pppl.gov"
  - "Georgia Tech | gatech.edu"
  - "University of Colorado | colorado.edu"
  - "Rigetti | rigetti.com"
  - "IBM | ibm.com"
---
# What and why
Simulating the turbulent plasma inside a fusion reactor is one of the hardest computations in physics. But understanding plasma behaviour is essential to design and operate fusion reactors. In fact, these simulations are among the top consumers of scientific computing, which would make any credible speedup to the field extremely valuable. 

According to the review by Joseph et al. (Phys. Plasmas 30, 010501, 2023), the most expensive problems in plasma physics are nonlinear, and "quantum computers can only efficiently perform linear operations on the quantum state". There are certain problems that admit linear form though; for which quantum computers might be useful. Nonetheless, most quantum methods that exist so far are only small demonstrations, and any real advantage requires fault-tolerant hardware.

# Four gates of quantum advantage
## Theoretical quantum advantage
There are certain linear plasma problems,  for example, linearised Vlasov equation allows $O(\textrm{poly}\log(N_v))$ grid scaling against $O(N_v)$ classically (Engel, Smith, Parker, PRA 100, 062315, 2019), and cold-plasma wave propagation can be be written as unitary evolution via Dyson maps (Novikau, Startsev, Dodin, PRA 105, 062444, 2022) which could plausible exponential separations in grid resolution. However, the speed-up is sometimes offset by the measurement overhead. 

For non-linear problems, there is a proven mathematical barrier. Very recent research in 2025 and 2026 is attempting to overcome this barrier by using new mathematical "embeddings," but we haven't seen a real-world plasma example proven with these methods yet, 

## Practical quantum advantage
Some teams have run experiments on quantum hardware, for instance in early 2026, researchers used a 9-qubit sublattice of Rigetti’s Ankaa-3 chip to simulate how plasma waves bounce around; it worked well but was strictly a "proof-of-principle" demo. Another team at Georgia Tech used a hybrid quantum-classical algorithm, and run the quantum subroutine that handled the pressure poisson equation on a 133 qubit IBM machine. Even with these approaches, it is currently very difficult and slow to feed complex plasma data into a quantum computer and read the results back out. Every hardware test so far has simply "matched" what a regular computer can already do; none have reached the level where they can solve something a normal supercomputer finds hard. 

## Economic quantum advantage
We cannot yet say if quantum computers will be "cheaper" or "better" for fusion because we don't have reliable resource estimates. What's worse is that classical compute is getting better by the day, with news such as DeepMind and EPFL controlling a tokamak setting more unreachable goalposts for quantum to compete against. 

## Deployment and ecosystem advantage
 The field consists of a small group of national labs (LLNL, PPPL), universities (Georgia Tech, Colorado), and hardware makers (Rigetti, IBM, etc), money for this research flows from government fusion and quantum programs, not from private companies. 