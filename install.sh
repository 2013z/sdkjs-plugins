#!/bin/bash
red='\033[0;31m'
plain='\033[0m'

#Ĭ�ϰ�װĿ¼
dir=/var/www/onlyoffice/documentserver

cd /opt

curl -sSL https://github.com/eysp/sdkjs-plugins/archive/refs/tags/sdkjs-plugins.tar.gz | tar xz
    if [[ ! -n "sdkjs-plugins-sdkjs-plugins" ]]; then
    echo "���غ����ļ�ʧ�ܣ���������" && exit 1
    fi
mv sdkjs-plugins-sdkjs-plugins sdkjs-plugins
echo -e "���뺺���ļ���װĿ¼��${red} \n��docker��ֱ�ӻس���Ĭ��Ŀ¼$dir��\n"
read -p "ֱ�ӻس���apt�ȷ�ʽ��װ���Լ�����Ŀ¼����" webdir
echo -e "${red}"
    if [[ ! -n "$webdir" ]]; then
        webdir=$dir
    fi
cp -rf  sdkjs-plugins $webdir

echo -e "${plain}"
    if [[ ! -n "$webdir/sdkjs-plugins/README.md" ]]; then
        echo "${red}�����ɹ��������������漴�ɿ���onlyoffice��������ĵ���"
    else
        echo "ʹ�ޣ�����ʧ����${plain}"
    fi