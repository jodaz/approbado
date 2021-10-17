#!/bin/bash

packages_dir="$(dirname $(dirname $(realpath $0)) )/packages"

scp -P 21098 -r "$packages_dir/admin/build/" villolzq@66.29.132.6:/home/villolzq/approbado-web/packages/admin
scp -P 21098 -r "$packages_dir/app/build/" villolzq@66.29.132.6:/home/villolzq/approbado-web/packages/app
scp -P 21098 -r "$packages_dir/frames/build/" villolzq@66.29.132.6:/home/villolzq/approbado-web/packages/frames
