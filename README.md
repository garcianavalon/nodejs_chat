# nodejs_chat
Simple chat using nodejs, express and websockets through socket.io

## System requirements
Tested on Ubuntu 12 and Ubuntu 14, but any platform compatible with nodejs should be suported.

Tested for nodejs v5.1.1.

## Instalation
Download de code locally
`git clone https://github.com/garcianavalon/nodejs_chat`

Install dependencies
`npm install`

## Using Vagrant
A Vagrant file is provided to recreate a working environment. If you want to use it, run:
`vagrant up`

Once installed and provisined, log into the VM and installit as normal.
`$ vagrant ssh`
`vagrant@precise32:~$ cd /vagrant/`

## Run the app
Development mode:
`$ DEBUG=nodejs_chat:* npm start`

For debugging there is a custom command
`$ DEBUG=nodejs_chat:* npm run debug`

Production mode:
`npm start`
