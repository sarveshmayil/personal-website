### Overview

This group project involved building autonomous capabilities from the ground up given base hardware and a skeleton software system to eventually fully autonomously navigate and map an unknown environment. This included a wide range of tasks from designing wheel/velocity/motion controllers to a fully working SLAM system.

The MBot is equipped with a scanning 2D LiDAR and a MEMS 3-axis IMU along with two boards: a Raspberry Pi 4B and a Raspberry Pi Pico W. 

The functionality of our MBot can be broken down into three main categories: acting, perception, and reasoning.

### Acting

The controller and odometry blocks make up the acting portion of the MBot. The odometry is fundamental to determining the bot's current position. Given a goal point and current position, the controller is necessary to generate commands for the motors to move the bot to the goal position.

The control stack consists of 3 main parts: a motion controller, body frame controller, and wheel speed controller. The motion controller uses a rotation-translation-rotation (RTR) system to move from one point to another and has tuned PIDs for point-to-point movement as well as in-place rotation. The body frame controller manages the forward and rotating speed of the bot and generates left and right wheel speed controls. The wheel speed controllers are used to determine specific instrucitons for the motors using encoder values. Both the body frame and wheel speed controllers use tuned PID controllers.

The odometry system uses encoder measurements from the motors to update the robot's position estimate. Using a motion model, the odometry position estimate is updated at each timestep. Additionally, the gyro sensor is used for gyrodometry fusion where the gyro data is used to correct any incorrect odometry measurements based purely on encoder values.

### Perception

The perception portion of the MBot is primarily composed of a SLAM system, which can be broken down into Mapping and Localization as shown in the pose estimation pipeline below.

![](/images/botlab/slam_flowchart.png)

We use an occupancy grid to store the map, which is updated by using the LiDAR data. Each individual ray is used to update the map based on the bot's position estimate.

The localization system is a particle filter with 2 main parts: an action model and a sensor model. The action model propagates the particles (which represent the bot's position estimate) forward in time to get a new pose esimate for the particle. The sensor model provides the probability that a given lidar scan matches the pose of the propagated particle given the current state of the map and gives a likelihood for each particle. The particle filter then resamples the particles using low-variance sampling and computes an estimated SLAM pose using the posterior distribution of the particles.

The significant improvement of the SLAM pose over the pure odometry (encoder based) pose can be seen in the figure below.

![](/images/botlab/slam_vs_odom.png)

We see that the SLAM pose (blue) is almost identical to the true pose (green) as opposed to the pure odometry pose (light green), which experiences significant drift over time.

### Reasoning

The reasoning of the MBot is handled by the path planning and exploration system, which is able to autonomously generate waypoints for the bot in order to navigate the environment.

Path planning allows the bot to find waypoints to move from one location to another within the map in an efficient manner while avoiding objects. This is accomplished through an A* algorithm, which manages the distance cost as well as the 4-way Manhattan distance.

Exploration in the system is handled by identifying frontiers within the map, which are indications that the region beyond has not been explored yet. The bot plans a path to each frontier and eventually eliminates all frontiers, resulting in a fully explored map.

The full report for this work and results can be found [here](https://sarveshmayil.github.io/files/botlab_report.pdf)