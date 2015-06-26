#!/bin/sh

apt-get update
apt-get install vim nodejs npm mongodb redis-server
echo "127.0.0.1 test.localhost" >> /etc/hosts
echo "127.0.0.1 myblog.localhost" >> /etc/hosts
echo "127.0.0.1 newblog.localhost" >> /etc/hosts
npm install -g bower forever
mkdir -p data/db
redis-server --daemonize yes
mongod mongod --fork --logpath ./mongodb.log --dbpath data/db
npm install
bower install
forever ./bin/www