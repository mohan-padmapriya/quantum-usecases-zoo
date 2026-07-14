---
title: Credit Scoring & Credit-Risk Modeling
sector: Finance
verdict: "[[Contested]]"
timeline: Unclear
Watch out for: "[[A better quantum algorithm]]"
tags:
  - usecase
  - sector/finance
players:
  - "PASQAL | pasqal.com"
  - "IBM | ibm.com"
  - "CaixaBank | caixabank.com"
  - "Crédit Agricole CIB | ca-cib.com"
  - "Multiverse Computing | multiversecomputing.com"
---
# What and why
Involves judging how likely a borrower is to default, or similarly, estimating how much a whole loan portfolio could lose. A central focus within this application is the detection of "fallen angels," which refers to companies that experience a significant credit rating downgrade from investment-grade to sub-investment grade status. The process involves processing large, high-dimensional datasets containing tens of thousands of historical records and over a hundred distinct financial and market variables to train predictive models. 

 Classical machine learning models, which often function as "black boxes", struggle to provide the interpretability required for high-stakes financial decisions. Current classical benchmarks, such as Random Forest models, can be computationally expensive and difficult to optimise when dealing with the highly imbalanced datasets typical of the financial sector, where defaults are rare compared to stable instances. This is what motivates looking at quantum algorithms for this usecase. 

# Gates of quantum advantage
## Theoretical quantum advantage
The application of quantum machine learning to credit scoring currently lacks a proven mechanism for theoretical advantage, as quantum classifiers are either matched by classical methods, or run into algorithmic issues like barren plateaus. There are theoretical frameworks for economic capital requirements which suggest a quadratic speedup on paper via quantum amplitude estimation, but these results assume access to fault-tolerant hardware and efficient loading of loss distributions. The practical utility of these algorithms is also limited by massive per-operation constant gaps, estimated at a $10^{10}$ difference, which currently offset theoretical performance gains for commercially relevant specifications.

## Practical quantum advantage
A team from PASQAL designed a quantum-enhanced machine learning algorithm deployed on a 50-qubit neutral atom processor, achieved a precision of 27.9% against 28% which was the benchmark, while demonstrating superior interpretability by employing only 50 learners compared to the 1,200 decision trees used in the classical benchmark. And although simulations of 90-qubit systems suggest a potential path to beating these benchmarks by reducing false positives, results on IBM's superconducting hardware have shown significant degradation due to noise. Specifically, capital algorithms on real superconducting devices have been observed to converge toward a 50% default probability, which is effectively a coin flip, as circuit depth increases and qubit coherence times reduce. Also scoring models show performance loss as they scale. 


## Economic quantum advantage

The economic advantage of quantum solutions is currently hindered by the high efficiency of classical processes, which run in seconds at negligible cost. Even quantum algorithms run on simulators, that have shown reduced learner counts, would require substantial and costly QPU time for even small datasets, making them economically uncompetitive compared to existing high-performance computing resources. Consequently, the Bank for International Settlements concludes that initial gains remain modest, as most experimental use cases continue to address problems that are already effectively managed by classical machines. 


## Ecosystem considerations
Lending decisions legally have to be explainable and checkable for fairness; the output of a quantum model does not fit that requirement at the moment. Given the regulatory uncertainty of the field, the adoption of quantum solutions for credit scoring and risk modelling is likely to be difficult. 
