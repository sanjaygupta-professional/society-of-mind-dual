---
title: "Chapter 18: Reasoning"
chapter: 18
slug: "18-reasoning"
---

# Reasoning

## Chains of Reasoning

How do we reason? The classical view holds that reasoning is a logical process — a chain of deductions leading from premises to conclusions. Minsky acknowledges that logical reasoning is important but argues that it is only one of many reasoning strategies used by the society of mind, and not even the most common one. Most everyday reasoning is not logical at all — it relies on analogies, heuristics, pattern matching, and common sense.

Even when we do reason logically, the process is not as clean as the textbooks suggest. Each step in a logical chain requires agents that recognize which rules apply, agents that check whether the premises are satisfied, and agents that verify the conclusions. These agents are fallible — they can misapply rules, overlook relevant premises, or accept false conclusions. Logical reasoning in human minds is an approximation, not a proof procedure.

> "Logic is a wonderful tool — but it is only one tool among many. Most of the time, our minds use methods that would horrify a logician but that work surprisingly well in the real world."

## Common Sense Reasoning

Most of our reasoning is common sense reasoning — drawing conclusions based on vast amounts of everyday knowledge about how the world works. You know that if you drop a glass, it will probably break. You know that if someone smiles, they are probably happy. You know that if it is raining, the ground will be wet. None of these conclusions is logically certain — there are exceptions to all of them. But they are reliable enough for everyday purposes.

Common sense reasoning is enormously difficult to formalize, which is why artificial intelligence has struggled with it for decades. The problem is not that common sense rules are complex, but that there are so many of them, they interact in complex ways, and they all have exceptions. The mind manages this complexity by using frame-like structures (Chapter 24) that bundle common sense knowledge about typical situations, providing default expectations that can be overridden when necessary.

## Analogical Reasoning

One of the mind's most powerful reasoning strategies is analogy — recognizing that the current situation is similar to a previous one and transferring knowledge from the old situation to the new one. Analogical reasoning connects to Chapter 23's discussion of comparisons and to Chapter 14's discussion of reformulation. When you say "this problem is like that problem," you are using an analogy to import a solution strategy from one domain to another.

Analogical reasoning is powerful but risky. The analogy may be misleading — the situations may be similar in some respects but crucially different in others. Skilled reasoners learn to check analogies against the facts and to recognize when an analogy is breaking down. This requires agents that can compare the structures of two situations, identify the correspondences, and evaluate whether the correspondences are relevant.

## The Role of Failure in Reasoning

Minsky emphasizes that reasoning is not just about finding correct conclusions — it is also about detecting and recovering from errors. When a line of reasoning leads to a contradiction or an implausible conclusion, the mind needs agents that can backtrack, identify the faulty step, and try a different approach.

This error-detection ability is closely related to the censors described in Chapter 27. Censors are agents that recognize and suppress bad reasoning steps before they lead to trouble. A well-developed censor system allows the mind to reason efficiently by pruning unpromising lines of thought early, saving the computational resources of the agent society for more productive directions.

Reasoning, in Minsky's account, is not a single, unified process but a collection of strategies — logical, analogical, heuristic — coordinated by agents that select the most promising approach for each situation and monitor the results for errors.
