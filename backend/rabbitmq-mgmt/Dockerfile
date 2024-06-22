FROM rabbitmq:3.13.3-alpine

VOLUME ["/data"]

COPY rabbitmq.config /etc/rabbitmq/

RUN rabbitmq-plugins enable --offline rabbitmq_management

CMD ["rabbitmq-server"]

EXPOSE 5672 15672