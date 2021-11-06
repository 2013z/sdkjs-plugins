#!/bin/bash
red='\033[0;31m'
plain='\033[0m'
#默认安装目录
dir=/var/www/onlyoffice/documentserver
#默认下载目录
down=/opt

[[ $EUID -ne 0 ]] && echo -e "${red}错误: ${plain} 必须使用root用户运行此脚本！\n" && exit 1

cd $down

curl -sL https://github.com/eysp/sdkjs-plugins/archive/refs/tags/sdkjs-plugins.tar.gz | tar xz       
mv sdkjs-plugins-sdkjs-plugins sdkjs-plugins
echo -e "输入汉化文件安装目录：${red} \n（docker版直接回车，默认目录$dir）\n"
read -p "直接回车，apt等方式安装的自己查找目录输入${plain}" webdir
    echo -e "$(plain)"
    if [[ ! -n "$webdir" ]]; then
        webdir=$dir
    fi
cp -rf  sdkjs-plugins $webdir

#    if [[ ! -n "$webdir/sdkjs-plugins/README.md" ]]; then
#        echo "${red}汉化成功，清空浏览器缓存即可看到onlyoffice插件是中文到了"
#    else
#       echo "痛哭，汉化失败了${plain}"
#    fi
