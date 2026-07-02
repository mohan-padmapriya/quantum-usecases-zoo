---
Authors: Y. Kim, A. Eddins, S. Anand, K. X. Wei, E. van den Berg, S. Rosenblatt, H. Nayfeh, Y. Wu, M. Zaletel, K. Temme, A. Kandala
Institutions: IBM Quantum, UC Berkeley, RIKEN
Aim: Demonstrate that a noisy pre-fault-tolerant processor can produce accurate expectation values for circuits beyond brute-force classical simulation. This determines "utility".
Main quantities: Expectation values (single-site magnetisation, higher-weight observables) of a Trotterised 2D transverse-field/kicked-Ising model on the heavy-hex lattice.
Inputs: 127-qubit Eagle processor; Clifford ZZ rotations plus non-Clifford X rotations at various angles θ; deep circuits.
Outputs: " Zero-noise-extrapolated observables, validated against exactly-solvable Clifford points."
Methods/Notes: Probabilistic error cancellation/zero-noise extrapolation with detailed noise learning.
Hardware/Simulation: Real hardware - IBM Eagle, 127 superconducting qubits.
Results vs baseline: IBM argued leading approximations (matrix product states, isometric 2D tensor networks) broke down in the strong-entanglement regime.  But Tindall et al. reproduced the results more accurately with belief-propagation tensor networks; T. Begušić et al, showed classical sparse-Pauli-dynamics simulation on a single laptop core could reproduce and exceed the experiment, orders of magnitude faster.
Implication: The specific instance was NOT beyond classical reach; it became a benchmark that stimulated better classical methods. No durable advantage.
Remarks:
tags:
  - correlatedDynamics
Image: "[[Pasted image 20260702100633.png]]"
---
![[Pasted image 20260702100633.png]]