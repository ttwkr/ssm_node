# 도커 이미지 만들때 실행되는 스크립트

FROM node:14.15.2

MAINTAINER ttwkr <devttwkr@gmail.com>
# 도커 컨테이너 호스트와 공유할 디렉터리 지정
# 컨테이너 외부에 파일시스템을 마운트 할 때 사용
VOLUME /deploy/ssm_node

COPY ./start-server.sh /usr/local/bin
# 그냥 명령어 실행
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
# 도커 컨테이너 안에서 실행
CMD ["start-server.sh"]

