---
title: Fraud & Anomaly Detection
sector: Finance
verdict: "[[Algorithm-limited]]"
timeline: Unclear
tags:
  - usecase
  - sector/finance
players:
  - HSBC | hsbc.com
  - Quantinuum | quantinuum.com
  - World Economic Forum | weforum.org
  - Accenture | accenture.com
  - CERN | home.cern
  - Intesa Sanpaolo | intesasanpaolo.com
  - QuTech | qutech.nl
---
## What and why
The aim is to catch the rare fraudulent transactions hidden among millions of legitimate ones, fast enough to act in near-real time. Quantum machine learning claims it can spot subtler patterns by mapping data into the much richer Hilbert space. But every demonstration so far shrinks the data down drastically just to fit on small quantum hardware, and feeding millions of transactions per second into a quantum computer is not realistic. Also, quantum versions of these pattern-matching methods tend to either stop working as data grows or turn out to be copyable by ordinary computers. Classical tools like gradient-boosted trees and graph neural networks remain well ahead.

# [[Methodology|Four gates of quantum advantage]]
## Theoretical quantum advantage
While a mathematically rigorous speedup has been proven for quantum machine learning, it currently only applies to highly specific data structures built from the discrete logarithm problem, but unfortunately, nothing suggests transaction data from which anomalies need to be detected has that structure. Further, research shows that generic quantum kernels suffer from exponential concentration as more qubits are added. This means that as the system grows, the model's predictions become inaccurate and independent of the actual input data, making it impossible to learn from with a moderate amount of measurements. And further, many QML models that are easy to train can be mimiced by a classical ML algorithm. There's also a whole bunch of problems with QML in general, like barren plateaus, the tradeoff between trainability and dequantisation, and so on, that fraud detection solutions inevitably inherit. All in all, while the theory allows for a "win," no structured path to a practical application has been demonstrated.

## Practical quantum advantage
The most cited results (by Grossi et al. at CERN) on real-world data are limited to simulations and small datasets. For instance, on a sample of 2.4 million transactions reduced to just 7 features and a few hundred rows, a hybrid quantum model reached 81.0% accuracy compared to 78.1% for a classical model on the same tiny sample. However, the classical models using the full dataset reached 99.8% accuracy. When hardware noise was factored in, the quantum model's performance dropped significantly. Regarding the practical advantage of QML in general, a large-scale study earlier this year, involving 970 experiments and 29 different comparisons, found no statistically significant advantage for quantum methods over classical baselines. Furthermore, the only quantum configuration that were competitive required roughly 2,000 times more computing power than the classical version. 

So in terms of practical quantum advantage, we're not three yet. 


## Economic quantum advantage
Given the previous two gates have failed, it is trivial to look at economic advantage. Nonetheless, it is worth noting that production fraud scoring typically runs in milliseconds on streams of millions of transactions per second. The amount of time required to load data into cloud-based quantum computers are much slower; in fact, the measured compute premium for quantum kernels is roughly 2,000x (Kakavand et al., 2026). 

## Deployment and ecosystem considerations
Regulated deployment of quantum algorithms for fraud detection requires interpretability that quantum kernels do not provide currently. Otherwise, there is a lot of activity from big players in this area, including from the UK Govt, the HSBC-Quantinuum and the WEF-Accenture collaborations among others. 