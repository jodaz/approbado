#!/bin/bash

password="`cat $(dirname $(realpath $0))/password.txt`"

packages_dir="$(dirname $(dirname $(realpath $0)) )/packages"

sshpass -p "$password" scp -r "$packages_dir/admin/build/" root@198.199.86.4:/var/www/approbado/packages/admin
echo "...ADMIN APP DEPLOYED..."
sshpass -p "$password" scp -r "$packages_dir/app/build/" root@198.199.86.4:/var/www/approbado/packages/app
echo "...USERS APP DEPLOYED..."
sshpass -p "$password" scp -r "$packages_dir/frames/build/" root@198.199.86.4:/var/www/approbado/packages/frames
echo "...FRAMES DIRECTORY DEPLOYED..."
