#!/bin/bash
# 배포 스크립트가 있는 곳으로 디렉터리를 이동하고 실행한다는 의미
cd /home/ubuntu/docker-image
./deploy.sh > /dev/null 2> /dev/null < /dev/null &
