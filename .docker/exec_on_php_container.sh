#!/bin/bash 

#Sample usage: 
#./exec_on_php_container.sh gpg --list-keys
#./exec_on_php_container.sh composer fix-style


docker-compose run --rm --user www-data php $*