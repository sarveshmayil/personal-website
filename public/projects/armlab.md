### Overview

This group project involved developing autonomous capabilities for a 5-DOF robotic arm from the ground up given base hardware and a skeleton software system to accomplish several tasks in sorting and stacking colored blocks. This included a wide range of tasks ranging from integrating forward/inverse kinematics to a full perception system capable of identfying block poses.

The robotic arm is a ReactorX 200 Robot Arm with 5 DOF and is equipped with 7 Dynamixel servo motors. It also has a gripper attached at the end for picking up blocks.

The functionality of the robotic arm can be broken down into control and perception stacks.

### Control

The control portion of the arm handles three main tasks: forward kinematics, inverse kinematics, and path planning.

Forward kinematics allows the system to have knowledge of the end effector's position in 3D space based only on the knowledge of the joint angles, which we accomplish this through the use of screw vectors. An evaluation of the forward kinematics accuracy showed that generally the pose estimate was most accurate near the arm's base and higher further away from the base due to small errors being compounded through the individual joints.

Inverse kinematics is crucial to determining the joint angles that will result in a provided position and orientation of the end effector. This complex problem is solved by first simplifying the problem from 3D to 2D by evaluating the arm in a 2D plane characterized by the arm's rotation about the base. The problem is then decomposed into a 3-link arm with 3 unknown joint angles to solve for as shown in the figure below.

<img src="/images/armlab/Armlab-ik.png" width=500 style="display: block; margin: 0 auto" >

Path planning for the robotic arm falls under two categories of block pickup and block placement. For block pickup, we perform a series of motions that mitigate error in the end effector position. The system tests for a range of different pickup angles with higher priority for picking up the block from directly above, which is most accurate. Block placement follows a similar order of operations and finds the safest and most accurate series of motions in order to place the block at the intended position.

The full report for the control portion of this work can be found [here](https://sarveshmayil.github.io/files/armlab_control_report.pdf)

### Perception

The perception stack of the arm uses a RGB-D Realsense camera mounted above the workspace to detect blocks and determine their 3D pose.

This begins with an accurate calibration system, which was first used to find an accurate intrinsic calibration (mapping pixel coordinates to camera coordinates). In order to obtain an accurate extrinsic calibration (mapping camera coordinates to world coordinates), several AprilTags were placed on the workspace surface and OpenCV was used to solved for the optimal transformation. Additionally, we found that the RGB and Depth images were not aligned well, and therefore developed a method to compare corresponding points between the two images and determine an affine transformation that aligns the points. The methodology and resulting aligned calibration are shown below.

<img src="/images/armlab/align_depth_and_rbg_horizontal.png" width=600 style="display: block; margin: 0 auto" >

<img src="/images/armlab/calibrated_depth.png" width=600 style="display: block; margin: 0 auto" >

Three different methods for block detection were tested for the perception system. 

(1) The first method leverages pure color segmentation. The RGB images are converted into HSV, which can then be used for color segmentation. We then use OpenCV tools to obtain bounding boxes for each block, which are shown in cyan in the figure below.

(2) The second method incorporates depth information. Under the assumption that the center of the desired color segmentation is on the top surface of the block, we set an upper and lower bound on the depth value. Therefore, by extracting the surface pointed upward, we can determine the center of the top surface. The results for this method are shown in orange below.

(3) The third method employs a color refinement strategy, which is based off the premise that the top surface of the blocks have a slightly different color to the sides. Therefore, setting both an upper and lower bound on the HSV value in the segmentation allows us to extract just the top surface of the block. The results of this method are shown in purple in the figure below.

<img src="/images/armlab/detection.png" width=500 style="display: block; margin: 0 auto" >

We find that the third method of color refinement provided the best results both quantitatively and qualitatively. The depth refinement method showed a 58% error improvement over the pure color segmentation approach while the color refinement method that we ultimately moved forward with showed a 70% error improvement.

These systems combined together provided extremely accurate pose estimation and color detection of the blocks, which aided in more consistent and accurate autonomy.

The full report for the perception portion of this work can be found [here](https://sarveshmayil.github.io/files/armlab_cv_report.pdf)