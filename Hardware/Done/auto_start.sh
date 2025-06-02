#!/bin/bash

# 1. 가상환경 활성화
source /home/dorosee/.dorosee/bin/activate

# 2. motion 실행
sudo motion -n > /dev/null 2>&1 &

# 3. app.py 실행
python /home/dorosee/app.py
