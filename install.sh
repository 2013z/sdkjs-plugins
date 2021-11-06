#!/bin/bash
#默认安装目录
name=/var/www/onlyoffice/documentserver
#默认下载目录
down=/opt
cd $down
curl -sL https://github.com/eysp/sdkjs-plugins/archive/refs/tags/sdkjs-plugins.tar.gz | tar xz       
mv sdkjs-plugins-sdkjs-plugins sdkjs-plugins
echo -e "安装目录,docker版直接回车，默认目录$name\n"
read -p "输入目录名（留空默认：$name）: " webdir
#echo -e "${plain}"
    if [[ ! -n "$webdir" ]]; then
        webdir=$name
    fi
cp -rf  sdkjs-plugins $webdir

#    if [[ ! -n "$webdir/sdkjs-plugins/README.md" ]]; then
#        echo "${red}汉化成功，清空浏览器缓存即可看到onlyoffice插件是中文到了"
#    else
#       echo "痛哭，汉化失败了${plain}"
#    fi
