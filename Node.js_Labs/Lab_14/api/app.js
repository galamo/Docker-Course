const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const amqp = require('amqplib/callback_api');

dotenv.config();

const app = express();
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// RabbitMQ connection
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

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Token is required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid or expired token');
    }
    req.user = user;
    next();
  });
};

// Route to handle user login and return JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (result.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }
      if (!isMatch) {
        sendLoginFailureToRabbitMQ(`Login failed for user: ${username}`);
        return res.status(400).send('Incorrect password');
      }

      const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Protected route requiring authentication
app.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
