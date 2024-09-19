## Overview
We present Reshaping Viscoelastic-String Path-Planner (RVP) a path planner that reshapes a desired global plan for a robotic vehicle based on sensor observations of the environment. We model the path to be a viscoelastic string with shape preserving tendencies, approximated by a connected series of springs, masses, and dampers. The resultant path is then reshaped according to the forces emanating from the obstacles until an equilibrium is reached.

The full paper can be found [here](https://arxiv.org/abs/2303.00947)

## How it Works
The reshaped path from RVP remains close in shape to the original path because of anchor points that connect to the discrete masses through springs. The final path is the resultant equilibrium configuration of the Spring-Mass-Damper network. Two key concepts enable RVP (i) Virtual Obstacle Forces that push the Spring-Mass-Damper system away from the original path and (ii) Anchor points in conjunction with the Spring-Mass-Damper network that attempts to retain the path shape. We demonstrate the results in simulation and compare it’s performance with an existing Reshaping Local Planner (RLP) that also takes a global plan and reshapes it according to sensor based observations of the environment.

RVP represents the path as a set of discrete masses connected through a Spring-Mass-Damper system as shown below, where the path points are shown in blue and anchor points in red. The path points x<sub>i</sub> are a discrete representation of the local path and are connected to adjacent path points via a spring and damper while the anchor points x<sub>a,i</sub> are connected to their corresponding path point via a spring.

<img src="/images/rvp/system_diagram.png" width="400" style="display: block; margin: 0 auto" />

Forces emanating from obstacles result in virtual forces acting on these discrete points, pushing them into regions of safety. A visualization of the dynamically reshaped local path at various integration timesteps for a scenario is shown below. The original path is shown in dashed blue and the current state of the local path in solid magenta.

<img src="/images/rvp/breakdown.png" width="750" style="display: block; margin: 0 auto" />

Here are some additional examples of RVP:

<div style="display: flex; justify-content: center;">
    <img src='/images/rvp/scenario2.png' width='300'>
    <img src='/images/rvp/scenario3.png' width='300'>
</div>

Comparing the performance of RVP against RLP, we see that it is able to avoid all obstacles while maintaining a lower amount of deviation from the original path.

<img src="/images/rvp/comparison.png" width="750" style="display: block; margin: 0 auto" />

## Additional Work
One major downside to RVP is the large computational cost, which makes it unsuitable for real-time applications. A solution to this problem is to generate a dataset using RVP to train a NN to emulate RVP's performance.

To accomplish this, we needed to generate a dataset with a wide range of environments and paths. This is done by placing randomly shaped/sized objects (sampled from a tuned distribution of sizes and locations) in a 2D environment. Then, paths with random length and curvature and generated as initial paths for the model. An in-depth Monte Carlo analysis of these randomly generated data scenarios can be found [here](https://sarveshmayil.github.io/personal-website/files/projects/rvp-mlmc.pdf). Some examples of these paths can be seen below.

<img src="/images/rvp/rand_scenarios.png" width="400" style="display: block; margin: 0 auto" />

Some initial progress was made in training reinforcement learning models such as Soft Actor Critic models and Proximal Policy Optimization models with specialized reward functions to learn the ODE.