---
layout: post
title: "Kalman filter"
tags: research autonomous driving
categories: [Research]
toc: true
comments: true
#excerpt: "Kalman Filter"
date: 2020-07-20T17:51:18+02:00
---
Kalman filter has numerous applications in technology. A common application is for guidance, navigation and control of vehicles.
<!--more-->

# State Observer 

A linear time invariant system 

$$
\begin{equation}
\begin{aligned}
\dot{x} &= Ax+Bu \\
y &= Cx
\end{aligned}
\label{equ:system}
\end{equation}
$$

where $x\in\mathbb{R}_n$ is the state, $u\in\mathbb{R}_m$ is the input, $y\in\mathbb{R}^p$ is the output. 

Observer 



$$
\begin{equation}
\begin{aligned}
\dot{\hat{x}} & = A\hat{x}+Bu+K(y-\hat{y})\\
\hat{y}& = C\hat{x}
\end{aligned}
\label{equ:observer_model}
\end{equation}
$$


$$
\begin{equation}
e=x-\hat{x}
\label{equ:error}
\end{equation}
$$ 

The error dynamics are 

$$
\begin{equation}
\dot{e}=(A-KC)e
\label{equ:error_dynamics}
\end{equation}
$$

The matrix $(A-KC)$ should be Hurwitz such that the error system \eqref{equ:error_dynamics} is stable.

# Discrete time system 
$$
\begin{equation}
\begin{aligned}
x_k &=x_{k-1}+Bu_k\\
y_k &=Cx_k
\end{aligned}
\label{equ:discrete_time_system}
\end{equation}
$$

By including the process noise and the measurement noise, the system \eqref{equ:discrete_time_system} is tranformed as 

$$
\begin{equation}
\begin{aligned}
x_k &=x_{k-1}+Bu_{k-1}+w_{k-1}\\
y_k &=Cx_k+v_k,
\end{aligned}
\label{equ:discrete_time_system_noise}
\end{equation}
$$

where $w_k\sim \mathcal{N}(0,Q)$ and $v_k\sim \mathcal{N}(0,R)$.

The Kalman filter will use both prediction and measurement to esitmate the state. 

$$
\begin{equation}
\hat{x}_k&=A\hat{x}_{k-1}+Bu_{k-1}+K(y_k-C\hat{y})\\
\hat{y}&=C\hat{x}_k
\end{equation}
$$

That is 

$$
\begin{equation}
\hat{x}_k=A\hat{x}_{k-1}+Bu_{k-1} + K(y_k-C(A\hat{x}_{k-1}+Bu_{k-1}))
\label{equ:observer_discrete}
\end{equation}
$$

Define the priori estimate $\hat{x}^{-}$ as 

$$
\begin{equation}
\hat{x}_k=A\hat{x}_{k-1}+Bu_k.
\label{equ:priori_estimate}
\end{equation}
$$

Substitute \eqref{equ:priori_estimate} into \eqref{equ:observer_discrete}, yields

$$
\hat{x}_k=\hat{x}^-_k + K (y-C\hat{x}^-_k), 
$$
which is called the posteriori estimate.

The Kalman filter choose a $K$ known as the Kalman gain to obtain the optimal estimate $\tilde{x}_k$. Roughly speaking, the Kalman gain is chosen based on the ratio of the prediction error and measurement error.   

Define the priori error and posteriori error as 

$$
\begin{aligned}
e_k^-&=x_k-\hat{x}_k^-\\
e_k &=x_k-\hat{x}_k
\end{aligned}
$$

$$
\begin{equation}
x_k-\hat{x}_k=x_k-\hat{x}_k^- - K(Cx_k+v_k-C\hat{x}_k^-)
\end{equation}
$$

i.e. 

$$
\begin{equation}
e_k=e_k^- - KCe_k^- - Kv_k
\end{equation}
$$

Take the covariance  

$$
\begin{equation}
P_k=E[e_k*e_k^\top]=(I-KC)P_k^- (I-KC)^\top + KRK^\top
\end{equation}
$$

That is 

$$
\begin{equation}
P_k=P_k^- -KCP_k^- - P_k^- C^\top K^\top + K(CP_k^-C+R)K^\top 
\end{equation}
$$

$$
\begin{equation}
\frac{\partial P_k}{\partial K}=-2(P_k^-C^\top)+2K(CP_k^-C^\top+R)=0
\end{equation}
$$

TBC
