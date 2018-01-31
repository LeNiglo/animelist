#!/usr/bin/env bash

if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Not running as root"
    exit
fi

sudo meteor --allow-superuser build --server-only /home/animelist/.
cd /home/animelist/
sudo rm -rf bundle/
sudo tar -xzf animelist.tar.gz
sudo rm -f animelist.tar.gz
cd bundle/programs/server/
sudo npm install --production
sudo chown animelist:animelist -R /home/animelist
sudo pm2 restart /home/leniglo/ecosystem.config.js --only animelist
sudo pm2 show animelist
