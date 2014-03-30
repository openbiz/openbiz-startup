Openbiz Startup
===============

What is it?
--------------------
The demo for how to start up with Openbiz framework. 
You can use it as a blank project template, and starts to build your own application based on it.
it is not a npm package, it an express based application

How to use it?
----------------------
You can clone the project and start to build and test your own module on it .

How to install (deploy)
-------------------------
```sh
#clone this project as your project's root folder
git clone https://github.com/openbiz/openbiz-startup.git

#go into the project folder
cd openbiz-startup

#install openbiz environment
./install-openbiz.sh

#now its ready to run!
node app
```

Open your browser to go to http://localhost:8080 .
if you have saw page loaded, means its running.

How to update openbiz libs
---------------------------
```sh
./update-openbiz.sh
```