Roughly, I use a three step process in evaluating each usecase for [[Quantum Advantage FAQ | quantum advantage]]. First one must establish the theoretical advantage. Then move onto practical advantage, which includes considerations of wall-clock time performance and error correction overhead. And then finally economic advantage, which includes considerations of costs and timelines. 

### Theoretical
There is likely to be a theoretical quantum advantage if, at the core of the usecase, the problem -  
1. is naturally about quantum evolution/interference (simulation, period-finding)
2.  does not require loading large classical datasets or reading out large solution vectors.
3. has a super-quadratic (ideally exponential) speedup over the best known classical algorithm.
4.  has a speedup that does not vanish when the classical competitor is granted analogous sampling access.
5. is classically hard in a robust sense (not just currently unoptimised).

Consequently, red flags include - 
1. NISQ heuristics 
2. Advantage demonstrated only in a toy model or a oracle/query model without a concrete instantiation.
3. Speedup proven against a weak or outdated classical baseline.
4. Big data problems with large classical data input
5. Low rank linear algebra problems where sampling is easy
6. Quadractic speedup only
7. Reliance on QRAM/efficient state-preparation assumptions that are themselves unproven or expensive.

# Practical
Beyond theoretical considerations, practical quantum advanatage is likely possible only when - 
1. Fault-tolerant resource estimate exists and is modest and improving (physical qubit count, runtime, T/Toffoli count).
2. Wins in wall-clock after factoring for slow quantum clock-speeds
3. The "crossover point" is at a problem size that is meaninful
4. 
Consequently, red flags include - 
4. problems where the advantage is only asymtotic
5. crossover size of a problem is huge
6. resource estimates keep worsening over time


# Economic
Based on Neil Thompson's work, the main factors are that - 
1. Running the usecase on a quantum computer beats a cost-equivalent classical machine
2. Advantage date remains unchanged across assumptions (hardware slowdown, physical-to-logical ratio, roadmap)

And, therefore, red flags - 
1. Small to moderate size problems


And after all this, there are broader ecosystem considerations I take into account. For instance, considerations of supply chain, software stack, workforce, the integration of classical-quantum-HPC, dual-use concerns etc. This is not easy to quantify, but is nonetheless relevant especially in usecases that are considered highly strategic (eg. cryptanalysis)