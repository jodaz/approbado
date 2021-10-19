#!/bin/bash

password="`cat $(dirname $(realpath $0))/password.txt`"

packages_dir="$(dirname $(dirname $(realpath $0)) )/packages"

sshpass -p "$password" scp -P 21098 -r "$packages_dir/admin/build/" villolzq@66.29.132.6:/home/villolzq/approbado-web/packages/admin
echo "...ADMIN APP DEPLOYED..."
sshpass -p "$password" scp -P 21098 -r "$packages_dir/app/build/" villolzq@66.29.132.6:/home/villolzq/approbado-web/packages/app
echo "...USERS APP DEPLOYED..."
sshpass -p "$password" scp -P 21098 -r "$packages_dir/frames/build/" villolzq@66.29.132.6:/home/villolzq/approbado-web/packages/frames
echo "...FRAMES DIRECTORY DEPLOYED..."
