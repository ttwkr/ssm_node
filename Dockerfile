FROM node:14.15.2

MAINTAINER ttwkr <devttwkr@gmail.com>
VOLUME /deploy/ssm_node

COPY ./start-server.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
CMD ["start-server.sh"]
