#!/bin/sh
echo "build and deploy"
cd build; gulp build; gulp deploy;
echo "start server"
cd ..; npm run serve;
