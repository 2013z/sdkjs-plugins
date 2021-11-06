#!/bin/bash
red='\033[0;31m'
plain='\033[0m'
#Ĭ�ϰ�װĿ¼
name=/var/www/onlyoffice/documentserver
#Ĭ������Ŀ¼
down=/opt

[[ $EUID -ne 0 ]] && echo -e "${red}����: ${plain} ����ʹ��root�û����д˽ű���\n" && exit 1
echo -e "${plain}"
cd $down

curl -sL https://github.com/eysp/sdkjs-plugins/archive/refs/tags/sdkjs-plugins.tar.gz | tar xz       
mv sdkjs-plugins-sdkjs-plugins sdkjs-plugins
echo -e "��װĿ¼��${red} \n��docker��ֱ�ӻس���Ĭ��Ŀ¼$name��\n"
read -p "ֱ�ӻس���apt�ȷ�ʽ��װ���Լ�����Ŀ¼����${plain}" webdir
read -p "����Ŀ¼�� ����Ĭ�ϣ�$name" webdir

    if [[ ! -n "$webdir" ]]; then
        webdir=$name
    fi
cp -rf  sdkjs-plugins $webdir

    if [[ ! -n "$webdir/sdkjs-plugins/README.md" ]]; then
        echo "${red}�����ɹ��������������漴�ɿ���onlyoffice��������ĵ���"
    else
       echo "ʹ�ޣ�����ʧ����${plain}"
    fi