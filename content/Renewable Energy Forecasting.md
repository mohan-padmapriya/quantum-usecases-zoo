---
title: Renewable Energy Forecasting
sector: Energy
verdict: "[[Contested]]"
timeline: Unclear
tags:
  - usecase
  - sector/energy
Watch out for: "[[A better quantum algorithm]]"
---
# What and why
Forecasting solar and wind output a few hours to days ahead lets operators balance supply and demand. Quantum machine learning (quantum LSTMs, quantum kernels) is claimed to forecast better, but the speedup disappears once the cost of loading weather data into the machine is counted, and the underlying linear-algebra methods have been dequantized, meaning classical algorithms match them. Reported accuracy gains are meaningless against a fair comparison with strong classical deep-learning baselines.