git pull
meteor update
meteor build .
sudo mv animelist.tar.gz /home/animelist/.
cd /home/animelist/
sudo tar -xvzf animelist.tar.gz
sudo rm -rf bundle/
sudo tar -xvzf animelist.tar.gz
cd bundle/programs/server/
sudo npm install
cd ../../..
sudo chown animelist -R *
sudo service animelist restart
