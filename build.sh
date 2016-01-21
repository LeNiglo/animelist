#!/usr/bin/env sh
git pull
sudo meteor update
sudo meteor build .
sudo mv animelist.tar.gz /opt/animelist/.
cd /opt/animelist/
sudo rm -rf bundle/
sudo tar -xzf animelist.tar.gz
sudo rm -f animelist.tar.gz
cd bundle/programs/server/
sudo npm install
cd /opt/animelist
sudo chown animelist -R /opt/animelist
sudo service animelist restart
