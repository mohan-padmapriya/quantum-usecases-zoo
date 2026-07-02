---
title: RSA/ECC Factoring
sector: Security
verdict: "[[Hardware-limited]]"
timeline: Fault-tolerant era
tags:
  - usecase
  - sector/cryptography
Watch out for: Better quantum hardware
---
# What and why
RSA and elliptic-curve cryptography secure most internet traffic and, in theory, can be broken by Shor's algorithm. The speedup is mathematically proven, but the largest number factored by genuine Shor is 21 and resource estimates require ~1 million physical qubits.