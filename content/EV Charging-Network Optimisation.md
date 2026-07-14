---
title: EV Charging-Network Optimisation
sector: Energy
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/energy
Watch out for: "[[A better classical baseline]]"
players:
  - "Pasqal | pasqal.com"
  - "EDF | edf.fr"
  - "D-Wave | dwavequantum.com"
  - "Volkswagen Group | volkswagen-group.com"
  - "GENCI | genci.fr"
---
# What and why
Given a fleet of electric vehicles, a set of chargers and grid constraints, the challenge is to decide when and at what power each vehicle charges so you might anticipate when demand peaks, work within transformer limits, and have everyone's battery charged and ready in time. On a macro scale, this problem translates to - given a city and a budget, decide where to build charging stations to maximise coverage and utilisation. Both problems grow combinatorially with the number of vehicles and sites and are constrained, which means they can be mapped on to QAOA on gate-based hardware, or onto a quantum annealer.

# Gates of quantum advantage
## Theoretical quantum advantage
Smart charging and station siting are combinatorial optimisation problems for which strong classical appraoches already exists. The quantum approach, typically QAOA, in theory, could have a quadratic speedup over the best classical solver, but this is conditional. 
## Practical quantum advantage
Pasqal and EDF formulated EV smart-charging as a graph problem suited to neutral-atom hardware and found the quantum approach competitive with, but not superior to, classical methods on small instances (Dalyac et al. 2021). Volkswagen's earlier and much-publicised traffic-flow optimisation on a D-Wave annealer (Neukart et al. 2017) was also a proof of concept.  Real distribution grids and fleets are far larger than any of these instances, and operational charging control needs guaranteed sub-second responses, which noisy intermediate-scale hardware cannot promise. However, fault tolerant machines could, in the absence of errors and with efficient data-loading, show a quantum advantage. 

## Economic quantum advantage
Commercial MILP solvers (Gurobi, CPLEX) and tuned metaheuristics solve realistic charging-schedule and siting problems in seconds to minutes on ordinary hardware, and machine-learning-assisted dispatch is enhancing the performance further already. Against a cost-equivalent classical machine, a quantum method that needs specialised hardware and returns heuristic solutions on small instances has no meaningful contribution. H

## Ecosystem considerations
 EV-transition toward decarbonisation is motivating, and stakeholders include utilities (EDF), automakers (Volkswagen), quantum vendors (Pasqal, D-Wave) and national HPC providers (GENCI).

# References
1. Dalyac, C., Henriet, L., Jeandel, E. et al., "Qualifying quantum approaches for hard industrial optimization problems. A case study in the field of smart-charging of electric vehicles," *EPJ Quantum Technology* 8: 12 (2021). arXiv:2012.14859
2. Neukart, F., Compostella, G., Seidel, C., von Dollen, D., Yarkoni, S., Parney, B., "Traffic Flow Optimization Using a Quantum Annealer," *Frontiers in ICT* 4: 29 (2017). DOI:10.3389/fict.2017.00029
3. Farhi, E., Goldstone, J., Gutmann, S., "A Quantum Approximate Optimization Algorithm," (2014). arXiv:1411.4028
4. Abbas, A. et al., "Challenges and opportunities in quantum optimization," *Nature Reviews Physics* 6: 718–735 (2024). arXiv:2312.02279
5. Aaronson, S., "Read the fine print," *Nature Physics* 11: 291–293 (2015). DOI:10.1038/nphys3272
6. Sassi, O., Oulamara, A., "Electric vehicle scheduling and optimal charging problem: complexity, exact and heuristic approaches," *International Journal of Production Research* 55(2): 519–535 (2017). DOI:10.1080/00207543.2016.1192695
