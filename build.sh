git pull
meteor update
meteor build .
sudo mv animelist.tar.gz /opt/animelist/.
cd /opt/animelist/
sudo rm -rf bundle/
sudo tar -xvzf animelist.tar.gz
cd bundle/programs/server/
sudo npm install
cd /opt/animelist
sudo chown animelist -R /opt/animelist
sudo service animelist restart
