#!/bin/bash

red='\033[0;31m'
plain='\033[0m'

#Ĭ�ϰ�װĿ¼/var/www/onlyoffice/documentserver
name=/var/www/onlyoffice/documentserver

clear
# check root
[[ $EUID -ne 0 ]] && echo -e "${red}����: ${plain} ����ʹ��root�û����д˽ű���\n" && exit 1

cd /opt

echo -e "���뺺���ļ���װĿ¼\n"
read -p "����Ŀ¼��������Ĭ�ϣ�$name��: " webdir
echo -e "${plain}"
    if [[ ! -n "$webdir" ]]; then
        webdir=$name
    fi

curl -sL https://github.com/eysp/sdkjs-plugins/archive/refs/tags/sdkjs-plugins.tar.gz | tar xz

cp -rf sdkjs-plugins-sdkjs-plugins sdkjs-plugins

