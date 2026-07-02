---
Authors: QCTRL
Institutions:
  - Q-CTRL
Aim: ' L=60 (120-qubit) quench evolution to time t=6 "in under three minutes," claiming (verbatim, per the rebuttal) "a 3000× speedup over classical Time-Dependent Variational Principle (TDVP) simulation at bond dimension χ=4096."'
Main quantities: Quench dynamics observables of the full wavefunction.
Inputs: " IBM Heron; 120 qubits; QPU time ~2 min 46 s."
Outputs: Time-evolved observables to t=6.
Methods/Notes:
Hardware/Simulation: IBM Heron
Results vs baseline: Q-CTRL's own benchmark "required over 160 hours on a CPU cluster, failed to converge in the high-entanglement regime t∈[5.2,6]." Rausch et al. certified the full experimental window including that regime, extended the classical frontier to t=7 (beyond the hardware), and, at bond dimension comparable to Q-CTRL's best run, "completes in ∼100 min," directly reducing the claimed 3000× advantage to "∼36×" against bare QPU time.
Implication:
Remarks:
tags:
  - 
Image:
---
