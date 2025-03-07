---
layout: post
title: Streamlining ROS2 Development with Docker and VSCode
tags:
  - ROS2
  - Docker
  - VSCode
  - Robotics
categories:
  - Tech
math: true
toc: true
comments: true
date: 2025-03-07 11:10 +0100
---

Tired of "Works on My Machine" nightmares? Let's transform your robotics workflow with a bulletproof development setup!

In this post, I will walk you through how to streamline your ROS2 development with Docker and VSCode.

## Why ROS2 and Docker? 🤖🐳

Docker offers significant advantages in compatibility, replicability, and isolation, enabling developers to work with multiple ROS distributions, ensure consistent environments, and prevent dependency conflicts.

### Key Advantages

| Feature               | Benefit                                         |
| --------------------- | ----------------------------------------------- |
| **Multi-ROS Support** | Run Humble, Galactic, and Foxy side-by-side     |
| **CI/CD Ready**       | Identical environments from dev to production   |
| **Collaboration**     | Share reproducible workspaces via Docker images |
| **Legacy Support**    | Maintain older ROS versions effortlessly        |

## Why Visual Studio Code? 💻

Visual Studio Code (VSCode) offers excellent integration with Docker, making it an ideal choice for a ROS2 development environment. Key benefits include:

- 🐋 Built-in Docker integration via Remote Containers
- 🔧 ROS2-specific extensions (launch files, package.xml support)
- 🐞 Visual debugging for ROS nodes
- 📦 50+ robotics-related extensions

In the next section, I will show you how to set up the development environment for ROS2 and Docker with VSCode.

## Setup Guide 🛠️

### Installation

#### Docker

1 .Install Docker Desktop or Docker Engine as you prefer.

2. For Linux users, follow the post-installation instructions [here](https://docs.docker.com/engine/install/linux-postinstall/) to enable non-root execution.

#### Visual Studio Code

1. Install Visual Studio Code from the official website [here](https://code.visualstudio.com/).

2. Install the following extensions:

   - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
   - [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### Configuration

#### Add your ROS2 workspace

Add a workspace in order to build and open them in a container

```shell
cd ~/
mkdir -p project_ws/src
```

Now create a `.devcontainer` folder inside the root of your workspace and create a `devcontainter.json` and `Dockerfile` inside `.devcontainer` folder.
The workspace should look like this:

```
project_ws
├── .devcontainer
│   ├── devcontainer.json
│   └── Dockerfile
|
├── src
    ├── package1
    └── package2
```

#### Edit `devcontainer.json`

Add the following to the `devcontainer.json` file:

```json
{
  "name": "ROS 2 Development Container",
  "privileged": true,
  "remoteUser": "ubuntu",
  "build": {
    "dockerfile": "Dockerfile",
    "args": {
      "USERNAME": "ubuntu"
    }
  },
  "workspaceFolder": "/home/ubuntu/ws",
  "workspaceMount": "source=${localWorkspaceFolder},target=/home/ubuntu/ws,type=bind",
  "customizations": {
    "vscode": {
      "extensions": [
        "althack.ament-task-provider",
        "ms-vscode.cpptools",
        "ms-vscode.cpptools-themes",
        "twxs.cmake",
        "donjayamanne.python-extension-pack",
        "eamodio.gitlens",
        "ms-iot.vscode-ros",
        "ms-python.python",
        "betwo.b2-catkin-tools",
        "DotJoshJohnson.xml",
        "ms-azuretools.vscode-docker",
        "redhat.vscode-yaml",
        "smilerobotics.urdf",
        "streetsidesoftware.code-spell-checker",
        "yzhang.markdown-all-in-one",
        "zachflower.uncrustify"
      ]
    }
  },
  "features": {
    "ghcr.io/devcontainers/features/desktop-lite:1": {
      "password": "ubuntu",
      "webPort": "6080",
      "vncPort": "5901"
    }
  },
  "forwardPorts": [6080, 5901],
  "portsAttributes": {
    "6080": {
      "label": "desktop"
    }
  },
  "containerEnv": {
    "ROS_AUTOMATIC_DISCOVERY_RANGE": "LOCALHOST",
    "ROS_DOMAIN_ID": "42"
  },
  "runArgs": ["--net=host", "--pid=host", "--ipc=host", "--shm-size=512M"],
  "postCreateCommand": "sudo chown -R $(whoami) /home/ubuntu/ws/"
}
```

#### Edit `Dockerfile`

Open the Dockerfile and add the following contents:

```Dockerfile
FROM osrf/ros:humble-desktop-full

ARG USERNAME=ubuntu
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Delete user if it exists in container
RUN if id -u $USER_UID ; then userdel `id -un $USER_UID` ; fi

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:jonathonf/vim -y
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y python3-pip vim \
    && rm -rf /var/lib/apt/lists/*
RUN echo "source /opt/ros/humble/setup.bash" >> /home/$USERNAME/.bashrc
ENV SHELL /bin/bash
# ********************************************************
# * Anything else you wnat to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root
USER $USERNAME
CMD ["/bin/bash"]
```

In `.devcontainer.json` and `Dockerfile`, we use `ubuntu` as the username and `humble` as the ROS2 distro. You can change them to your own preference.

## Usage 🚀

### Open the workspace in VSCode

1. Open **VSCode** and navigate to your `project_ws` directory.

2. When prompted, select **"Reopen in Container"** to build and enter the development container.

3. If the popup doesn't appear, click the blue icon at the bottom left and select **"Reopen in Container"** manually.

### Running GUI Applications (RViZ, etc.)

To use graphical tools like RViZ, access the GUI via VNC:

1. Open a browser and go to [http://localhost:6080](http://localhost:6080)
2. Click on **"Connect"** on the `NoVNC` page.

This method is preferred over X11 forwarding for better performance.

## What's Next? 🔜

Coming soon:

- Linting & Debugging Setup
- CI/CD Pipeline Configuration
- Multi-robot Simulation Guide

Stay tuned!

## References 📚

This post is based on the following resources.

1. [Docker for Robotics with the Robot Operating System (ROS/ROS2)](https://github.com/2b-t/docker-for-robotics)
2. [VSCode, Docker, and ROS2](https://www.allisonthackston.com/articles/vscode-docker-ros2.html)
3. [Setup ROS 2 with VSCode and Docker](https://docs.ros.org/en/humble/How-To-Guides/Setup-ROS-2-with-VSCode-and-Docker-Container.html)
