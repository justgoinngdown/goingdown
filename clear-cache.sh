#!/bin/bash

# 清除 PHP 缓存（如果使用了 PHP）
if command -v php > /dev/null; then
    if [ -f "/etc/php/7.4/fpm/php.ini" ]; then
        sudo service php7.4-fpm restart
    elif [ -f "/etc/php/8.0/fpm/php.ini" ]; then
        sudo service php8.0-fpm restart
    fi
fi

# 清除 Nginx 缓存（如果使用了 Nginx）
if command -v nginx > /dev/null; then
    sudo nginx -s reload
fi

# 清除 Apache 缓存（如果使用了 Apache）
if command -v apache2 > /dev/null; then
    sudo service apache2 restart
fi

# 清除应用程序缓存
if [ -d "cache" ]; then
    rm -rf cache/*
fi

if [ -d "tmp" ]; then
    rm -rf tmp/*
fi

echo "缓存清理完成" 