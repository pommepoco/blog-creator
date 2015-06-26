#!/bin/sh

sudo apt-get update
sudo apt-get install vim nodejs npm mongodb redis-server
sudo echo "127.0.0.1 test.localhost" >> /etc/hosts
sudo echo "127.0.0.1 myblog.localhost" >> /etc/hosts
sudo echo "127.0.0.1 newblog.localhost" >> /etc/hosts
sudo npm install -g forever
redis-server --daemonize yes
mkdir -p data/db
mongod mongod --fork --logpath ./mongodb.log --dbpath data/db
sudo npm install -g bower forever
npm install
bower install
forever ./bin/www