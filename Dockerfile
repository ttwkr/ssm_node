FROM node:14.15.2

MAINTAINER ttwkr <devttwkr@gmail.com>
# 도커 컨테이너 호스트와 공유할 디렉터리 지정
VOLUME /deploy/ssm_node

COPY ./start-server.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
CMD ["start-server.sh"]
