---
layout: post
title: Today I Learned
tags:
- ROS
- Docker
- Python
- machine learning
- deep learning
categories:
- Tech
math: true
toc: true
comments: true
date: 2024-07-07 15:35 +0200
---
Today I Learned: collection of notes, tips, tricks and stuff I learn from day to day working with software, robotics and other stuff.
<!--more-->
## Python
- pytest
- Flask
- FastAPI
- Django

## ROS 
- [ROS with Docker](https://github.com/2b-t/docker-for-robotics)

## SLAM
- Special Orthogonal Group $SO(n)$
$$ 
\begin{equation}
SO(n) = \{\mathbf{R}\in \mathbb{R}^{n\times n} | \mathbf{R}\mathbf{R}^\top=\mathbf{I}, \det{\mathbf{R}=1}\}.
\end{equation}
$$
- Rotation Matrix $\mathbf{R}$ 
- Transfer matrix 
$$
T = 
\begin{bmatrix}
\mathbf{R} & \mathbf{t}\\
\mathbf{0}^\top & 1
\end{bmatrix}
$$
- Rodrigues's Formula
$$
\begin{equation}
\mathbf{R}=\cos\theta\mathbf{I}+(1-\cos\theta)\mathbf{n}\mathbf{n}^\top + \sin\theta \mathbf{n}^\wedge,
\end{equation}
$$
where $\mathbf{R}$ is the rotation matrix, $\mathbf{n}$ is the rotation vector and $\theta$ is the rotation angle.
- Optical Flow
    - [Tutorial](https://nanonets.com/blog/optical-flow/)
    - [Video](https://www.youtube.com/watch?v=lnXFcmLB7sM&ab_channel=FirstPrinciplesofComputerVision)

## C++
- [Smart pointers](https://medium.com/codex/everything-you-need-to-know-about-smart-pointers-in-c-3a92c9dcd532)
    - Unique pointers `unique_ptr`
    - Shared pointers `shared_ptr`
    - Weak pointers  `weak_ptr`
- CMake
    - Modern CMake
        - `cmake -S src -B build`
        - `cmake --build build`
        - `cmake --install build`

## Cloud
- Service Mesh
    - [Introduction](https://aws.amazon.com/what-is/service-mesh/#:~:text=Learn%20what%20a%20service%20mesh%20is,%20why%20you)
    - [Istio](https://istio.io/): An open-source service mesh project
- Cloud Native Architecture
    - [Priciples for CNA](https://cloud.google.com/blog/products/application-development/5-principles-for-cloud-native-architecture-what-it-is-and-how-to-master-it)
