const amqp = require('amqplib/callback_api');

const rabbitmqUrl = 'amqp://rabbitmq';

const sendLoginFailureToRabbitMQ = (message) => {
  amqp.connect(rabbitmqUrl, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = 'loginFailures';
      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(message));
      console.log('Sent login failure to RabbitMQ:', message);
    });
  });
};

// Simulating login failure for a user
const username = 'user1';
sendLoginFailureToRabbitMQ(`Login failed for user: ${username}`);
