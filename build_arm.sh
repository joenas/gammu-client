########################################################################
#!/bin/bash
# Build the armv6 image and save it to tar
#
# Pass a hostname to transfer the file as well like:
#
# $ ./build_arm.sh -d host:/home/pi
#
# With npm installed locally you can build the client and fetch node_modules
# then copy them into the image
#
# $ ./build_arm.sh -l
#
########################################################################


# OPTIONS
# From https://stackoverflow.com/a/14203146
# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
destination=""
local_npm=0

while getopts "ld:" opt; do
    case "$opt" in
    l)  local_npm=1
        ;;
    d)  destination=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

# SETUP
TAG="gammu-client:armv6"
TAR="gammu-client-armv6.tar"

if [ $local_npm -eq 0 ]
  then
    DOCKERFILE="Dockerfile.armv6"
  else
    DOCKERFILE="Dockerfile.armv6.local_npm"
    npm install --production
    cd client && npm run build && cd ..
fi

# Build and save the image
printf "\n--- Building $TAG from $DOCKERFILE\n\n"
docker build -t $TAG -f $DOCKERFILE . #1> /dev/null

printf "\n--- Saving $TAG to '$TAR'\n"
docker save -o $TAR $TAG

# Transfer it
if [ ! -z "$destination" ]
  then
    printf "\n--- Uploading $TAR to $destination\n"
    scp "$TAR" $destination
fi
