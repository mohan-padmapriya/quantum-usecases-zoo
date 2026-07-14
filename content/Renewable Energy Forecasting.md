---
title: Renewable Energy Forecasting
sector: Energy
verdict: "[[Contested]]"
timeline: Unclear
tags:
  - usecase
  - sector/energy
Watch out for: "[[A better quantum algorithm]]"
players:
  - "Terra Quantum | terraquantum.swiss"
  - "Pasqal | pasqal.com"
  - "GENCI | genci.fr"
---
# What and why
Forecasting solar and wind output a few hours to days ahead lets operators balance supply and demand, which can save operators a claimed $100M annually. The best classical methods available to date are large-scale AI weather models such as Google’s GenCast and Microsoft’s Aurora. However, even these models struggle with accurately modelling high-dimensional, non-linear atmospheric dependencies that determine power output, and also generally with the computational intensity required for hyper-local 1km-resolution forecasts. 

Quantum machine learning methods are being explored as a way to deal with noisy and non-stationary, high-dimensional signals that are typical of renewable energy datasets. 

# Gates of quantum advantage
## Theoretical quantum advantage
There is currently no robust quantum mechanism for forecasting accuracy has been identified, and the models currently employed, primarily small quantum kernels and variational quantum circuits, are reportedly provably imitable by cheap classical tricks such as Random Fourier Features (RFF) dequantization. Also, forecasting requires continent-scale meteorological datasets, and at the moment, there is no proposed solution for efficiently loading such big data into a quantum machine. Techniques like amplitude encoding exist but require the number of usable logical qubits and data-encoding efficiency to increase by several orders of magnitude before they can have a significant commercial impact. 

## Practical quantum advantage
To date, the evidence base for quantum forecasting is entirely restricted to simulators running on classical hardware, typically at scales of only 2 to 12 qubits. Consequently, no actual quantum hardware has contributed to any reported performance gain. There have been some positive results, such as the 50% error reduction reported by Khan et al. (2024) and the 40% improvement claimed by Terra Quantum (2025), these gains are frequently benchmarked against weak, self-built classical networks rather than state-of-the-art weather models. Furthermore, one study found that training a quantum LSTM  took 12,600x longer per epoch than its classical counterpart (5,172 seconds vs. 0.41 seconds); the wall clock comparison is skewed starkly to favour classical algorithms.
## Economic quantum advantage
Renewable forecasting runs continuously and efficiently on cheap classical compute, and current quantum computers require hours of expensive simulation to match minutes of standard classical training. Moreover, the potential value pool (estimated at $100M annually in grid operating savings for a 10% accuracy gain) is already being captured by large-scale classical AI weather models like Google’s GenCast and Microsoft’s Aurora. 
## Ecosystem considerations
Currently, there is only one major vendor (Terra Quantum, which announced a $3.5B SPAC merger in 2026) and no deployed utility use for forecasting exists anywhere.
And while consultancy reviews from firms like PwC rate market readiness as "surprisingly high," they also simultaneously concede that every current application runs on simulators. 

