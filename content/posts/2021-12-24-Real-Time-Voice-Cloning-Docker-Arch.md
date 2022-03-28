---
layout: post
title: "Running the Real Time Voice Cloning in Docker on Arch Linux"
date: 2021-12-24
author: rushi
categories: ["deep learning", "pytorch"]
tags: ["voice", "clone", "docker", "CorentinJ"]
---

I came across this awesome project called Real Time Voice Cloning by Corentin Jemine and I wanted to give it a shot. I’m currently working on a Arch linux machine with GPU, that could easily run the toolbox, but I wanted an easy way to get everything setup. Docker would do the trick as far as getting it setup, and then through forwarding the X Window System via SSH, I could view and control the program locally as it ran remotely. Note that these steps should be more or less compatible with Linux or macOS, but maybe on Windows with the WSL.

**Step 0: You should probably have access to a machine with a CUDA-compatible GPU, and docker installed on Arch linux**

**Step 1: We don't have nvidia-docker, arch wiki recommends nvidia-container-toolkit**

```{bash}
yay -S nvidia-container-toolkit
```

**Step 2: Clone the Real-Time-Voice-Cloning project and download pretrained models**

I’ll assume that you’re working from your home directory, and we’ll make a directory called voice for our project to sit in and clone the GitHub repo:

```{bash}
cd ~
mkdir voice && cd voice
git clone https://github.com/CorentinJ/Real-Time-Voice-Cloning.git
```

Next, download the pretrained models as described here: https://github.com/CorentinJ/Real-Time-Voice-Cloning/wiki/Pretrained-models. Note that you’re expected to merge the contents with the project root directory.

**Step 3: Copy the Dockerfile**

Create a new file called `Dockerfile` in `~/voice` and insert the following:

```{bash}
FROM pytorch/pytorch

WORKDIR "/workspace"
RUN apt-get clean \
        && apt-get update \
        && apt-get install -y ffmpeg libportaudio2 openssh-server python3-pyqt5 xauth gcc build-essential git unzip curl python3-opencv \
        && apt-get -y autoremove \
        && mkdir /var/run/sshd \
        && mkdir /root/.ssh \
        && chmod 700 /root/.ssh \
        && echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config \
        && echo "X11Forwarding yes" >> /etc/ssh/sshd_config \
        && echo "PermitRootLogin yes" >> /etc/ssh/sshd_config \
        && echo "X11UseLocalhost yes" >> /etc/ssh/sshd_config
RUN echo "root:root" | chpasswd
# I have commented these requirements.txt as I plan to manually install them 
# through SSH
# ADD requirements.txt /workspace
# RUN pip install -r requirements.txt
# pip install opencv-python jupyterlab
# RUN jupyter nbextension enable --py widgetsnbextension
RUN echo "export PATH=/opt/conda/bin:$PATH" >> /root/.profile
ENTRYPOINT ["sh", "-c", "/usr/sbin/sshd && bash"]
CMD ["bash"]
```

A rough summary of the above is that we:

- Use the [pytorch docker image](https://hub.docker.com/r/pytorch/pytorch/) as our base image
- Update the image repos
- Install some dependencies
	- ffmpeg as a backend for PortAudio
	- libportaudio2 for audio manipulation (?)
	- openssh-server to SSH into the container
	- python3-pyqt5 for the QT bindings (installing via pip didn't seem to work for me)
	- xauth for X forwarding
- Set up the container to allow you to SSH in. This may not be secure, so I don't advise using on any sort of public facing machine. Use at your discretion.
- Allow X forwarding with the SSH server within the container
- Add the repo's `requirements.txt` file
- Install those requirements
- Add the right Python interpreter to the root user's PATH
- Make sure the SSH server is running when the container starts

Note that if you plan on SSH'ing into the Docker host as well (like I did from my laptop to the docker host), you need to set `X11Forwarding` to `yes` in `/etc/ssh/sshd_config` on the docker host as well. Then reload and restart the SSH daemon (on Ubuntu this was `systemctl daemon-reload && systemctl restart sshd`).

#### Step 4: Modify your SSH config

Add the following to your SSH config at `~/.ssh/config` on the docker host (or create the file if it doesn't exists):

```
Host voice
    Hostname localhost
    Port 2150
    User root
    ForwardX11 yes
    ForwardX11Trusted yes
```

#### Step 5: Build the container

Run the following command to build the container:

```terminal
docker build -t voice-base .
```

You should be able to run the following to test:

```terminal
docker run -it --rm --init --runtime=nvidia \
	--ipc=host --volume="$PWD:/workspace" \
	-e NVIDIA_VISIBLE_DEVICES=0 -p 2150:22 \
	--device /dev/snd voice-base
nvidia-smi
cd /workspace/Real-Time-Voice-Cloning
python demo_cli.py
exit
```

#### Step 6: Start the container

```terminal
docker run -it --rm --init --gpus=all \
	--ipc=host --volume="$PWD:/workspace" \
	-e NVIDIA_VISIBLE_DEVICES=0 -p 2150:22 \
	--device /dev/snd voice-base
```

I usually use the same config file for my other pytorch projects

```{bash}
docker run -it --rm --init --gpus=all \
-e DISPLAY=${DISPLAY} --privileged \ 
above--ipc=host --volume="$PWD:/workspace" \
 -e NVIDIA_VISIBLE_DEVICES=0 -p 2150:22 \
 -p 8888:8888 -v /tmp/.X11-unix:/tmp/.X11-unix \
  --device /dev/snd voice-base 
```

I added -p 8888 to share jupyter notebook in the docker and `/tmp/.X11-unix:/tmp/.X11-unix` with `-e DISPLAY=${DISPLAY}` to open GUI apps.

The option `--device /dev/snd` should allow the container to pass sound to the docker host, though I wasn't able to get sound working going from laptop->docker_host->container. I modified the `Real-Time-Voice-Cloning` to save the output audio as a WAV file instead of playing within the application, and then copied the file locally to listen to the results.

At this point, the container should be running and will occupy that terminal, so open up a new terminal shell

#### Step 7: SSH into the container

From the docker host, this is done with:

```terminal 
ssh -X voice
```

`voice` refers to the name of the host we configured in Step 6. and default password would be `root` as configured.

#### Step 8: Run and play with the toolbox

Now that we have a terminal session that has X11 forwarding, we can navigate to the project directory and run the toolbox:

```terminal
cd /workspace/Real-Time-Voice-Cloning
python demo_cli.py
```

Make sure to give target voice no longer than **10 second** clip

The GUI version should also work with

```terminal
cd /workspace/Real-Time-Voice-Cloning
python demo_toolbox.py
```

Note that you'll need to provide audio in the form of the datasets discussed in the [README of the project](https://github.com/CorentinJ/Real-Time-Voice-Cloning#datasets), or upload your own audio samples to the container and then browse to them within the toolbox application. This should be straightforward, since the project directory on the docker host is mounted within the container.

I realize that some of the methods used here probably aren't best practice, but they worked for playing around with this great project over a holiday weekend and I hope they prove helpful to someone.

### My results:
**Target audio:**
<p>
  <audio class="player" controls preload="none">
    <source src="/img/2021-12-24-Real-Time-Voice-Cloning-Docker-Arch/testinput.mp3" type="audio/mp3">
  </audio>
</p>

**Synthesized output:**
<p>
  <audio class="player" controls preload="none">
    <source src="/img/2021-12-24-Real-Time-Voice-Cloning-Docker-Arch/demo_output_01.wav" type="audio/mp3">
  </audio>
</p>

**This article is modded for Arch linux from source: [https://sean.lane.sh/posts/2019/07/Running-the-Real-Time-Voice-Cloning-project-in-Docker/](https://sean.lane.sh/posts/2019/07/Running-the-Real-Time-Voice-Cloning-project-in-Docker/)**


### Future work:

- This doesn't work quite well for all the voices
- You need to finetune the downloaded pretrained models by training it with your own data 
- Some examples using this technique can be found at https://google.github.io/tacotron/publications/speaker_adaptation/index.html