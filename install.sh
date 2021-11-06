#!/bin/bash

red='\033[0;31m'
plain='\033[0m'
#内网ip地址获取
ip=$(ifconfig | grep "inet addr" | awk '{ print $2}' | awk -F: '{print $2}' | awk 'NR==1')
if [[ ! -n "$ip" ]]; then
    ip="你的路由器IP"
fi
#默认安装目录/var/www/onlyoffice/documentserver
name=/var/www/onlyoffice/documentserver

clear
# check root
[[ $EUID -ne 0 ]] && echo -e "${red}错误: ${plain} 必须使用root用户运行此脚本！\n" && exit 1

cd /opt

echo -e "输入汉化文件安装目录\n"
read -p "输入目录名（留空默认：$name）: " webdir
echo -e "${plain}"
    if [[ ! -n "$webdir" ]]; then
        webdir=$name
    fi

curl -sL https://github.com/eysp/sdkjs-plugins/archive/refs/tags/sdkjs-plugins.tar.gz | tar xz

cp -rf sdkjs-plugins-sdkjs-plugins sdkjs-plugins

#    if [[ ! -n "$webdir/sdkjs-plugins/README.md" ]]; then
#        echo "${red}汉化成功，清空浏览器缓存即可看到onlyoffice插件是中文到了"
#    else
#       echo "痛哭，汉化失败了${plain}"
#    fi