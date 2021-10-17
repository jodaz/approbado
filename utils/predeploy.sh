#!/bin/bash

utils_dir="$(dirname $(dirname $(realpath $0)) )/utils"
packages_dir="$(dirname $(dirname $(realpath $0)) )/packages"

cp "$utils_dir/htaccess_file" "$packages_dir/admin/build/.htaccess"
cp "$utils_dir/htaccess_file" "$packages_dir/app/build/.htaccess"
cp "$utils_dir/htaccess_file" "$packages_dir/frames/build/.htaccess"

echo "PREDEPLOY SUCCESS!"
