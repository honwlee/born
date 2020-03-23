#!/bin/sh
if read -p "start build and deploy task [Y/N]? " answer; then
    answer=${answer:-y}
    if [ $answer == "Y" ] || [ $answer == "y" ]
    then
        echo "build and deploy"
        if read -p "prod [Y/N]? " prod; then
            prod=${prod:-y}
            if [ $prod == "Y" ] || [ $prod == "y" ] 
            then
                cd build; ./node_modules/.bin/gulp build --prod; ./node_modules/.bin/gulp deploy;
                cd ..
            else
                cd build; ./node_modules/.bin/gulp build; ./node_modules/.bin/gulp deploy;
                cd ..
            fi
        fi
    else
        echo "start without build and deploy task"
    fi
fi
echo "start server"
read -p "different port?(default:8087)" port;
port=${port:-8087}
echo "your selected port is: $port"
npm run serve --port=$port;
