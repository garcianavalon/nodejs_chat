#!/usr/bin/env bash

apt-get update
apt-get install -y git vim

curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs
