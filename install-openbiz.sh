#!/bin/sh
#clone openbiz server side framework into your project
#git submodule add -f https://github.com/openbiz/openbiz.git  node_modules/openbiz 

#clone openbiz client side framework into your project
#git submodule add -f https://github.com/openbiz/openbiz-ui.git  node_modules/openbiz-ui 

#clone openbiz client side application platform into your project
#git submodule add -f https://github.com/openbiz/openbiz-cubi.git  node_modules/openbiz-cubi

#clone openbiz application builder into your project
#git submodule add -f https://github.com/openbiz/openbiz-appbuilder.git  node_modules/openbiz-appbuilder

git submodule init
git submodule update

#install appbuilder tools to local project
ln -s  `pwd`/node_modules/openbiz-appbuilder/bin/appbuilder ./appbuilder

#install appbuilder tools to system bin folder
#ln -s  `pwd`node_modules/openbiz-appbuilder/bin/appbuilder /usr/local/bin/appbuilder

#install other libs dependencied by typical openbiz application
npm install 