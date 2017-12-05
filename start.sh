#!/bin/sh
if read -p "start build and deploy task [Y/N]? " answer; then
    answer=${answer:-y}
    if [ $answer == "Y" ] || [ $answer == "y" ]
    then
        echo "build and deploy"
        cd build; gulp build; gulp deploy;
        cd ..
    else
        echo "start without build and deploy task"
    fi
fi
echo "start server"
read -p "different port?(default:8087)" port;
port=${port:-8087}
echo "your selected port is: $port"
npm run serve --port=$port;
