#!/bin/sh

su
apt-get update
apt-get install vim nodejs npm mongodb redis-server
echo "127.0.0.1 test.localhost" >> /etc/hosts
echo "127.0.0.1 myblog.localhost" >> /etc/hosts
echo "127.0.0.1 newblog.localhost" >> /etc/hosts
npm install -g forever
redis-server --daemonize yes
mkdir -p data/db
mongod mongod --fork --logpath ./mongodb.log --dbpath data/db
npm install -g bower forever
npm install
bower install
forever ./bin/www