const amqp = require('amqplib/callback_api');
const fs = require('fs');

// Connect to RabbitMQ
amqp.connect('amqp://rabbitmq', (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'loginFailures';

    // Assert queue exists
    channel.assertQueue(queue, {
      durable: false
    });

    console.log("Waiting for messages in %s", queue);

    // Consume messages from the queue
    channel.consume(queue, (msg) => {
      console.log("Received: %s", msg.content.toString());

      // Log message to a file for compliance
      const logMessage = `Login failure: ${msg.content.toString()} at ${new Date().toISOString()}
`;
      fs.appendFile('./logs/audit.log', logMessage, (err) => {
        if (err) throw err;
        console.log('Logged login failure to audit.log');
      });
    }, {
      noAck: true
    });
  });
});
