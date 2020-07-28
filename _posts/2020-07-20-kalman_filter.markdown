---
layout: post
title: "Kalman filter"
tags: [control engineering, autonomous driving]
categories: [Tech]
toc: true
comments: true
#excerpt: "Kalman Filter"
date: 2020-07-20T17:51:18+02:00
---
Kalman fiter is one of the most important and widely used estimation algorithms. When taking the [Self-Driving Cars](https://www.coursera.org/specializations/self-driving-cars) courses on [Coursera](https://www.coursera.org), I find the introduction of the Kalman filter in the course a bit brief. So I decided to write this post to provide more information on it. 
<!--more-->

From a control perspective, the Kalman filter is similar to a state observer. It uses both prediction and the measurement to provide an optimal estimate of the states amid the uncertainties/sensors in the model and measurements. 

# State Observer 
Let us start with a short introduction to state observer. 
For a dynamical system, it is not always to obtain information on all state variables in practice. In this case, a state observer is designed to estimate the states of the system and then will be used for control design. 


Consider a linear time invariant system, represented in the state space form as below 

$$
\begin{equation}
\begin{aligned}
x_k &=Ax_{k-1}+Bu_k, \\
y_k &=Cx_k,
\end{aligned}
\label{equ:discrete_time_system}
\end{equation}
$$

where $x_k\in\mathcal{R}^n$, $u_k\in\mathcal{R}^m$, $y_k\in\mathcal{R}^p$ are the state, input and output of the system at time step $k$. 

Given the model ($A,B,C$) and the measurements ($y_k$), a state observer is given by the following equations 

$$
\begin{equation}
\begin{aligned}
\hat{x}_k &= A\hat{x}_{k-1}+Bu_{k-1}+K(y_k-\hat{y}_k),\\
\hat{y}_k &= C\hat{x}_k,
\end{aligned}
\label{equ:observer}
\end{equation}
$$

where $$\hat{x}_{k}$$ is the estimate of the state $x_k$, and $K$ is gain of the observer to be designed. 

The left-hand side of the first equation in \eqref{equ:observer} can be divided into:
- a prediction part $$A\hat{x}_{k-1}+Bu_{k-1}$$ calculated based on the state estimate and input at the previous step,
- a correction part $K(y_k-\hat{y}_k)$ calculated based on the difference of the measured and predicted outputs. 


The configuration of a state observer is shown in the following figure.

![Observer block diagram\label{fig:observer_block_diagram}](/assets/img/posts/observer_block_diagram.svg "observer block diagram")

The goal of the state observer is to provide an accurate estimate of the state, which is done by choosing a proper observer $K$ such that the estimation error $e_k=x_k-\hat{x}_k$ converges to zero. 

It follows from \eqref{equ:discrete_time_system} and \eqref{equ:observer} that 

$$
\begin{equation}
e_{k}=(I-KC)e_{k-1}.
\label{equ:error}
\end{equation}
$$

Then the observer gain $K$ should be chosen such that the system \eqref{equ:error} is stable. 



# Kalman filter
However, in reality, we will need to consider the noises/uncertainties in the model and the measurement sensors. The Kalman filter is designed to handle this situation. 

Taking into the noises into account, the system \eqref{equ:discrete_time_system} is transformed into:

$$
\begin{equation}
\begin{aligned}
x_k &=x_{k-1}+Bu_{k-1}+w_{k-1}\\
y_k &=Cx_k+v_k,
\end{aligned}
\label{equ:discrete_time_system_noise}
\end{equation}
$$

where $w_k\sim \mathcal{N}(0,Q)$ is the process noise, and $v_k\sim \mathcal{N}(0,R)$ is the measurement noise. These noises are assumed to be independent (of each other), white and noramally distributed. 

The Kalman filter is given by 

$$
\begin{equation}
\begin{aligned}
\hat{x}_k &=A\hat{x}_{k-1}+Bu_{k-1}+K(y_k-\hat{y})\\
\hat{y}_k &=C(A\hat{x}_{k-1}+Bu_{k-1})
\end{aligned}
\label{equ:kalman_filter}
\end{equation}
$$

The configuration of the Kalman filter is shown below. 

![Kalman filter block diagram](/assets/img/posts/filter_block_diagram.svg "Kalman filter block diagram")

Now let us introduce some concepts in the context of Kalman filter. 

 - Priori estimate: $$\hat{x}_k^-=A\hat{x}_{k-1}+Bu_{k-1}$$.
 - Posterior estimate: $$\hat{x}_k=A\hat{x}_{k-1}+Bu_{k-1}+K(y_k-\hat{y}_k)=\hat{x}_k^-+K(y_k-C\hat{x}_k^-)$$.
 - Priori estimate error: $e_k^-=x_k-\hat{x}^-$.
 - Posterior estimate error: $e_k = x_k -\hat{x}$.
 - Priori estimate error covariance: $P_k^-=E[e_k^-e_k^{-\top}]$
 - Posterior estimate error covariance: $P_k=E[e_ke_k^\top]$

The Kalman filter choose a $K$ known as the Kalman filter gain such that the posteriori estimate $\hat{x}_k$ is optimal in sense that the variance of the posteriori estimate error is minimal. In addition, the posteriori estimate $\hat{x}_k$ is an unbiased estimate of $x_k$.  

## Unbiased estimate 
The expected value of the posteriori estimate is given by 

$$
\begin{equation}
\begin{aligned}
E[\hat{x}_k]&=E[\hat{x}_k^- +K(y_k-C\hat{x}_k^-)]\\
            &=E[\hat{x}_k^-]+K(E[Cx_k]+E[v_k]-E[C\hat{x}_k^-])\\
            &=E[\hat{x}_k^-]+KC(E(x_k)-E[\hat{x}_k^-]).
\end{aligned}
\end{equation}
$$

Setting the initial estimate to be the initial value leads to 

$$
E[\hat{x}_k^-]=E[x_k], 
$$ 

which indicates 

$$
E[\hat{x}_k]=E[x_k].
$$

So the Kalman filter always provides an unbiased estimate of the states regardless of the Kalman filter gain.

## Minimum variance 

The Kalman filter gain $K$ is chosen such that the variance of the posteriori error $e_k$ is minimal. 

From \eqref{equ:kalman_filter}, we have 

$$
\begin{equation}
e_k=x_k-\hat{x}_k=x_k-\hat{x}_k^- - K(Cx_k+v_k-C\hat{x}_k^-).
\end{equation}
$$

Take the covariance of $e_k$, yields  

$$
\begin{equation}
P_k=E[e_ke_k^\top]=(I-KC)P_k^- (I-KC)^\top + KRK^\top.
\end{equation}
$$

That is 

$$
\begin{equation}
P_k=P_k^- -KCP_k^- - P_k^- C^\top K^\top + K(CP_k^-C+R)K^\top.
\label{equ:Pk_Pk_minus}
\end{equation}
$$

Then the Kalman filter design problem become an optimal problem 

$$
\begin{equation}
\min_{K}\mathrm{tr} (P_k)
\end{equation}
$$

Note that for any matrix $$M$$ and a symmetric matrix $N$, 

$$
\begin{equation*}
\frac{\partial \mathrm{tr}(MNM^\top)}{\partial M}=2MN.
\end{equation*}
$$

Then differentiating $\mathrm{tr} (P_k)$ with respect to $K$ and settting to zero, yields
$$
\begin{equation}
\frac{\partial \mathrm{tr} (P_k)}{\partial K}=-2(P_k^-C^\top)+2K(CP_k^-C^\top+R)=0.
\label{equ:trP}
\end{equation}
$$

Solving the equation above for $K$, we have 

$$
\begin{equation}
K=P_k^-C^\top(CP_k^-C^\top+R)^{-1}.
\label{equ:kalman_filter_gain}
\end{equation}
$$

Substitute \eqref{equ:kalman_filter_gain} into \eqref{equ:Pk_Pk_minus}, yields 

$$
\begin{equation}
P_k=(I-KC)P_k^-.
\end{equation}
$$

For $P_k^-$, we have 

$$
\begin{equation}
\begin{aligned}
P_k^-&=E[e^-_k e_k^{- \top}]=E[(x_k-x_k^-)(x_k-x_k^-)^\top]\\
     &=E[(Ae_{k-1}+w_{k-1})(Ae_{k-1}+w_{k-1})^\top]\\
     &=AP_{k-1}A^\top+Q.
\end{aligned}
\end{equation}
$$ 

## Kalman filter process 
Now, let us put everything together to form the Kalman filter algorithm. The algorithm consists of two parts: 

- Predict 
    - Project the state ahead 
    - Project the error covariance ahead 
- Update 
    - Compute the Kalman filter gain 
    - Update estimate with measurement 
    - Update the error covariance 

![Kalman filter process](/assets/img/posts/kalman_filter_process.svg " Kalman filter process")
