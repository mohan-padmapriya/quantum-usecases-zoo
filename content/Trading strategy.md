---
title: Trading-Strategy & Arbitrage Optimisation
sector: Finance
verdict: "[[Algorithm-limited]]"
timeline: Unclear
tags:
  - usecase
  - sector/finance
Watch out for: "[[A better classical baseline]]"
---
# What and why
Finding profitable trades, such as currency loops where converting through several currencies leaves you with more than you started. The trouble is that the core problem is already easy for ordinary computers. A standard algorithm finds these currency loops quickly, so the quantum version only looks interesting on artificially complicated setups. Further, high-frequency trading needs answers in less than a millionth of a second, while sending a problem to a quantum computer in the cloud and getting it back takes thousandths of a second or longer, which is far too slow. Demonstrations on quantum annealers are quicker but so far have not beaten fast classical methods at a useful scale.