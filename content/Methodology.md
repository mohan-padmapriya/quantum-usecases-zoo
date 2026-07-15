Roughly, I use a 3-4 step process in evaluating each usecase for [[Quantum Advantage FAQ | quantum advantage]]. First, I start by looking at theoretical advantage, which typically requires looking at asymptotics . Then move onto practical advantage, which includes considerations of wall-clock time performance and error correction overhead. And then finally economic advantage, which includes considerations of costs and timelines. 

### Theoretical
There is likely to be a theoretical quantum advantage if, at the core of the usecase, the problem -  
- [ ] is naturally about quantum evolution/interference (simulation, period-finding)
- [ ] does not require loading large classical datasets or reading out large solution vectors.
- [ ] has a super-quadratic (ideally exponential) speedup over the best known classical algorithm.
- [ ] has a speedup that does not vanish when the classical competitor is granted analogous sampling access.
- [ ] is classically hard in a robust sense (not just currently unoptimised).

Consequently, red flags include - 
- [ ] NISQ heuristics 
- [ ] Advantage demonstrated only in a toy model or a oracle/query model without a concrete instantiation.
- [ ] Speedup proven against a weak or outdated classical baseline.
- [ ] Big data problems with large classical data input
- [ ] Low rank linear algebra problems where sampling is easy
- [ ] Quadratic speedup only
- [ ] Reliance on QRAM/efficient state-preparation assumptions that are themselves unproven or expensive.

# Practical
Beyond theoretical considerations, practical quantum advantage is likely possible only when - 
- [ ] Fault-tolerant resource estimate exists and is modest and improving (physical qubit count, runtime, T/Toffoli count).
- [ ] Wins in wall-clock after factoring for slow quantum clock-speeds
- [ ] The "crossover point" is at a problem size that is meaningful


Consequently, red flags include - 
- [ ] problems where the advantage is only asymptotic
- [ ] crossover size of a problem is huge
- [ ] resource estimates keep worsening over time


# Economic
Based on Neil Thompson's work, the main factors are that - 
- [ ] running the usecase on a quantum computer beats a cost-equivalent classical machine
- [ ] advantage date remains unchanged across assumptions (hardware slowdown, physical-to-logical ratio, roadmap)

And, consequently, one red flag - 
- [ ] Small to moderate size problems


And after all this, there are broader ecosystem considerations I take into account. For instance, considerations of supply chain, software stack, workforce, the integration of classical-quantum-HPC, dual-use concerns etc. This is not easy to quantify, but is nonetheless relevant especially in usecases that are considered highly strategic (eg. cryptanalysis)