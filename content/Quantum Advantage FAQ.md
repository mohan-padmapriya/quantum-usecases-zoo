# 1. What does quantum advantage mean?
Albeit the definitions are ever evolving, generally, quantum advantage is a family of claims rather than one claim. What's most important is that there is a difference between - 
1. **theoretical or asymptotic speed-ups**, often only available in an oracle/query toy model
2. **quantum supremacy**, in which quantum computer might beat a classical computer on some task, useful or not
3. **practical quantum advantage/quantum utility**, in which a useful problem is solved by a quantum computer faster in wall-clock time
4. **economic advantage**, where a quantum computer is faster on a cost-equivalent basis
5. 

Theoretical/computional advantage is based on complexity classes (BQP vs classical classes), and often, instead of relying on unconditional proofs, rests on conjectured classical hardness assumptions. This means that even Shor's exponential speed-up is conditional on the classical hardness of factoring, and that the supremacy arguments often proved for sampling problems rely on complexity-theoretic conjectures (e.g., non-collapse of the polynomial hierarchy). Nonetheless, sampling, and more so factoring, are quantum advantage favourites. From Aaronson, and Harrow and Montanaro, advantage, albeit theoretical requires complexity-theoretic assumptions (at minimum that quantum systems cannot be efficiently classically simulated),  a near-term-implementable quantum algorithm, and an efficient verification method. 

Hoefler, Haner, and Troyer define practical quantum advantage ("quantum practicality") as a meaningful application solved faster in practice on a quantum computer than a classical one, explicitly distinguishing it from quantum supremacy, which is "the demonstration of a quantum computer outperforming a classical one for an artificial problem." They stress that asymptotic speedup is necessary but not sufficient, and conclude that constants such as the crossover time and crossover problem size at which quantum overtakes classical (image below).

![[Pasted image 20260701093800.png]]


Economic quantum advantage is the hardest to define, what with all the non-technical aspects involved. Nonetheless, Neil Thompson's group at MIT recently introduced the Quantum Economic Advantage calculator. Now it's a question of whether it is more cost-effective to use a quantum computer, rather than if the quantum computer can beat the classical one. In "The Quantum Tortoise and the Classical Hare", Thompson's group describes a race between two mismatched runners, in which the classical hare is far faster per step (its chips do billions of operations in the time a quantum machine does one, a gap of many orders of magnitude), while the quantum tortoise runs a fundamentally shorter course (a better-scaling algorithm, ideally exponential). On short courses the hare always wins, because classical speed wins before the tortoise's efficiency can compound; quantum wins once the problem is large enough that the algorithmic shortcut outweighs the per-step speed deficit, and only when compared against a classical machine of equal cost, not just any single chip. The Quantum Advantage Calculator factors for qubit roadmap, the physical-to-logical overhead, the hardware slowdown, and the classical and quantum runtimes, and it computes the minimum problem size where quantum wins and the calendar year that size becomes reachable. 



# 2. Where is quantum advantage believed to exist
People generally believe this set of problems is where practical quantum advantage might emerge from. There are certain caveats, which I will talk about later. 
1. Problems with exponential speed-ups, like Shor/period-finding/hidden subgroup problem
2. Grover/amplitude amplification (quadratic, provable in the query model)
3. Hamiltonian simulation/simulating quantum systems (motivation of several physicists, including popularly, Feynman's)
4. Linear algebra (HHL) - with heavy caveats/dequantisation.
5. Quantum chemistry (ground-state energy estimation)
6. Sampling problems (random circuit sampling, boson sampling).

Several optimists and skeptics believe that the query/oracle model tends to overstate real-world advantage. An oracle separation is not a real-world speedup once the oracle must be instantiated with actual data and circuits.

Strongly correlated (multireference) systems, like FeMoco, the Hubbard model, quantum magnets, high-Tc materials, are typically stated as difficult for classical computers. However, as per Lee, Lee, Zhai, Chan et al., "Evaluating the evidence for exponential quantum advantage in ground-state quantum chemistry", the very property that makes the system classically hard is what makes the good-overlap starting state hard to prepare, and consequently, whenever you can cheaply prepare a good-overlap state heuristically, that same structure tends to mean classical heuristics also work. In any case, there is active work in the area of initial state preparation methods, and further, this is not a disadvantage when studying the dynamics of a correlated system (as opposed to the ground state)

Re Grover's, Aaronson's collision lower bound and the BBBV result show you cannot generically beat Grover, so no brute-force exponential speedup for NP-complete problems exists in the black-box setting.

In Babbush et al's "Focus beyond quadratic speedups for error-corrected quantum advantage", they conclude that "quadratic speedups will not enable quantum advantage on early generations of such fault-tolerant devices unless there is a significant improvement in how we would realise quantum error-correction". Similarly, Hoefler-Haner-Troyer, when comparing their hypothetical future quantum computer of 10,000 logical qubits, ~10 µs logical gate time, all-to-all connectivity against a single classical chip (NVIDIA A100-class GPU, ~54 billion transistors), demonstrate that the quantum device performs vastly fewer operations per second, so only super-quadratic speedups on small-data problems will be at all meaningful. Hence - 

 > 1. Quadratic speedups are likely insufficient for quantum advantage
 
In the same paper, Hoefler-Haner-Troyer also showed that the quantum I/O bandwidth (limited by gate/measurement rates, even with QRAM) is on the order of ~10,000× smaller than a classical chip's. Therefore "any problem that is limited by accessing classical data, such as search problems in databases, will be solved faster by classical computers," and "a potentially exponential quantum speedup in linear algebra problems vanishes when the matrix has to be loaded from classical data, or when the full solution vector should be read out." Hence - 

> 2. Quantum computers will be practical for "big compute" problems on small data, not big-data problems.

and, 

> 3. Low logical gate times (microseconds vs. sub-nanosecond classical) mean the asymptotic advantage must be very large to win in wall-clock time at feasible sizes.

Speaking of speed-ups in linear algebra problems in his 2015 "Read the fine print", Aaronson presents four main caveats required for HHL to be able to solve a problem in logarithmic time - 
1.  the input vector $b$ must be loadable quickly (via QRAM) and be relatively uniform;  "if preparing $\ket b$ already takes $n^c$ steps... the exponential speedup of HHL vanishes in the very first step";
2. the matrix must be sparse and simulable via $e^{(−iAt)}$; 
3. the matrix must be "robustly invertible," i.e., well-conditioned, with runtime growing nearly linearly in the condition number $\kappa$;
4. the output is a quantum state $\ket x$, not a classical vector, since "learning the value of any specific entry $x_i$ will, in general, require repeating the algorithm roughly $n$ times, which would once again kill the exponential speedup."

In most real applications, data must be loaded from classical storage, $\kappa$ grows with problem size, or the whole solution must be read out. Which means the exponential advantage collapses to polynomial or vanishes. 

On the brightside, these caveats show us which linear-algebra problems could benefit from HHL toward some quantum advantage, and, by contrast, why the overwhelming majority cannot. 

Such caveats also brought the downfall of other problems once believed to be strong candidates for provably exponential speedups in quantum machine learning. Tang and collaborators (and Gilyén, Chia, Lin, Wang, et al.) showed that many QML speedups depended on strong state-preparation assumptions (ℓ²-norm sampling/QRAM), and that a classical algorithm with analogous state preparation access would diminish the quantum advantage. 


> 3. With the given caveats, HHL/QML algorithms almost never give practical advantage.

Then there is also the danger of classical algorithms catching up. For instance, Google's 2019 Sycamore result claimed that it would take ~10,000 years for Summit, althought IBM argued Summit could do it in ~2.5 days by exploiting disk storage; Pan and Zhang used tensor-network methods to generate a million correlated bitstrings at XEB fidelity 0.739, far above Sycamore's ~0.2%. Alibaba's tensor-network estimate put the Sycamore task at ~19.3 days on the Summit cluster. For IBM's 2023 "utility" kicked-Ising experiment (127 qubits), multiple classical rebuttals appeared within months, including Tindall et al. (belief-propagation tensor networks) and Begušić–Chan reporting simulations "orders of magnitude faster than the quantum experiment" and "systematically converged beyond the experimental accuracy." Most strikingly, Aharonov, Gao, Landau, Liu, and Vazirani gave "strong evidence that, in the presence of a constant rate of noise per gate, random circuit sampling cannot be the basis of a scalable experimental violation of the extended Church–Turing thesis" (though their algorithm is not yet practical and does not address finite-size cases). Hence, 

> 4. Progress in classical computing could diminish quantum advantage claims. 

Last but not the least is the question of error correction overhead. Most practical quantum advantage claims, including the recent Google and Oratomic cryptanalysis claims rely on hardware that does not exist today. Physical-to-logical qubit ratios and magic-state distillation costs are enormous. Hence, 

 >5. current NISQ devices have not demonstrated practical, economically useful advantage; error correction is necessary for most valuable application.
 


