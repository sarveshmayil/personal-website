## Overview
This project attempts to use a neural implicit representation for deformable object state-estimation, specifically the [Soft Bubble Gripper](https://www.tri.global/news/sensing-believing-more-capable-robot-hands-soft-bubble-gripper), which can be seen below. This was accomplished through recent advances in this task, [VIRDO](https://arxiv.org/abs/2202.00868) and [VIRDO++](https://openreview.net/pdf?id=GS8xD_elvgC).

<img src="/images/virdo/tri_soft_gripper.jpg" width="400" style="display: block; margin: 0 auto" />

Modelling the dynamics and having functional state-estimation for a deformable tactile sensor is important for general understanding of the sensor and making better grasping decisions as well as a number of downstream tasks. However, creating a model to accomplish this is challenging due to the complexity of the membrane dynamics as well as a lack of data. This study demonstrates that the structure of VIRDO++ is able to capture this model through a neural implicit representation using visual (pointcloud) and tactile (wrench) data.

## Implicit Representation of Membrane Dynamics
In this work, we explore two different approaches to representing membrane geometry and dynamics: VIRDO and VIRDO++. VIRDO directly encodes the membrane's contact formation observed from the bubble sensor's depth map through a PointNet architecture to represent deformed membrane geometry. VIRDO provides latent states of the membrane useful for downstream tasks. VIRDO++ extends VIRDO to represent the dynamics of deformable objects for downstream planning and control tasks. To achieve this, it adopts an Action Module that consumes the current latent state of the membrane and the action of end-effector.

The figure below shows the overall model architecture of VIRDO++, with four main modules: Force Module, Action Module, Deformation Module, and the Object Module.

<img src="/images/virdo/virdopp_diagram.png" width="400" style="display: block; margin: 0 auto" />

### Deformable Object Dynamics
VIRDO++ uses a latent object code $\alpha$, force code $z_t$, and contact embedding $c_t$ to represent the deformable object state, each encoding different information. The object code encodes relevant information about the specific object, which is then used to recover a signed-distance field (SDF). The force code encodes boundary conditions relevant to the object's current state. The contact embedding encodes relevant contact information, specific to an object's state.

The Force Module takes in a reaction wrench $f_t \in \mathbb{R}^6$ and the robot's end-effector pose $p_t \in \mathbb{R}^{d_p}$ and produces the force code $z_t$.

The Action Module takes in the force code $z_t$, object code $\alpha$, contact embedding $c_t$, and the robot's end-effector action $a_t \in \mathbb{R}^{d_a}$ and predicts the reaction wrench after taking the action $\hat{f}_{t+1}$ as well as the change in the contact latent vector $\Delta \hat{c}_t \in \mathbb{R}^{d_c}$. This allows for a model rollout to predict future states based on a trajectory of actions.

### Geometry Representation
The geometrical representation of the deformable object is handled by two separate modules. 

The Deformation Module is a hyper-network, who's weights are conditioned on the object code $\alpha$, force code $z_t$, and contact embedding $c_t$. The hyper network $\Psi_D(\alpha, z_t, c_t)$ predicts the weights for the Deformation Module, which takes in a set of query points $\overrightarrow{x} \in \mathbb{R}^3$ and predicts a point-wise deformation field $\Delta \overrightarrow{x}$, which when summed with the original query points results in the deformed object's nominal shape $\overrightarrow{x^{\prime}}$.

The Object Module is also a hyper-network conditioned on the object code $\Psi_O(\alpha)$ and is a neural implicit representation of the signed-distance field of the nominal shape. It predicts a signed-distance $s$ for each query point. This module, and the learnable object code are formulated similarly to DeepSDF, using an auto-decoder approach.

## Data
Setting up the data for model training and inference was critical to achieving good performance in model prediction. In particular, this was challenging for this project because VIRDO and VIRDO++ are designed to handle representation of deformable objects held in an end-effector. However, for this project, we attempt to perform this same representation for an "object" that is the end-effector. Therefore, some choices had to be made in regards to handling the data such that it is still relevant to the formulation of VIRDO.

The data provided by the bubble sensors are depth images, which are filtered to reduce noise and then projected using camera intrinsics to obtain a pointcloud of the bubble surface. Due to the bubble surface being a surface and not an enclosed object as formulated in other neural SDF representations, here the signed-distance value for a point is corresponding to the signed distance of the point from the nominal surface along the camera axis. However, as further figures show, the approximated SDF values were good enough for training the Object Module and it is able to represent the bubble surface relatively well.

For training the VIRDO model, the contact patch $Q$ is found by comparing the deformed depth image to a nominal reference depth image and filtering points with a depth imprint greater than a threshold value $\varepsilon$. Where $Q := \{ p \in P \in \mathbb{R}^3 : \vert p-nom \vert > \varepsilon \}$

The dataset used for training and testing of the VIRDO and VIRDO++ models was a series of grasps by the Soft Bubble Grippers on a 10 mm diameter cylindrical rod. It consisted of 35 total trajectories, each of which having a length of 10 timesteps. 30 of the trajectories were used for training and the remainder were held out and used for testing.

## Results
Training of the Object Module shows that we are able to learn a good model of the nominal bubble surface shape as seen in the figure below, which shows the predict SDF along two different cross-sections of the membrane.

<img src="/images/virdo/virdo_pretrain.png" width="600" style="display: block; margin: 0 auto" />

Additionally, the Deformation Module is able to learn the deformation field that corrects the deformed shape to the nominal shape.

The model is able to accurately predict wrenches given the current state and action to be taken. The figure below demonstrates the predicted wrenches for a single trajectory, where forces are shown on the left and torques on the right. We observe that overall, the model performs well in making predictions and is able to follow the general trends of the wrist wrench.

<img src="/images/virdo/virdopp_wrench_pred.png" width="600" style="display: block; margin: 0 auto" />

Additionally, the trained VIRDO++ model is evaluated on a state estimation task, where the contact embedding is learned through a particle-filter like process (in the inference case, the contact embedding at the initial state would be unknown). Here, the $n$ contact embedding samples are randomly initialized and propagated through the trained VIRDO++ model. Based on the calculated losses, backpropagation is performed to update the contact embeddings. Using the L1 loss between the predicted and ground truth wrench, weights are given to each contact embedding sample and used to re-sample with some added noise. The contact embedding with the highest weight is used for state estimation.

The figure below shows the results of this filtering-based state estimation for a single trajectory. We see that the model is able to learn how the deformations in the bubble surface change given only knowledge of the current state and the action to be taken. The model performs well in predicting how the deformation will change given knowledge of the current contact embedding and wrench because the Action Module is able to accurately use the action to predict the contact embedding and wrench prediction at the next timestep. This allows the Deformation and Object Modules to reconstruct the predicted deformed shape.

<img src="/images/virdo/state_est.png" width="800" style="display: block; margin: 0 auto" />

## Discussion
Overall, this project found that it is possible to model the behavior of the soft bubble gripper implicitly through a neural network and that VIRDO++ succeeds in capturing the dynamics of the bubble as well as its geometrical representation. 

The full report for this work can be found [here](https://sarveshmayil.github.io/files/bubble_virdo_report.pdf)