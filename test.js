const express = require('express');
const sessionMiddleware = require('../session');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.use(sessionMiddleware);

router.post('/login', usersController.authenticateUser);
router.post('/logout', usersController.logoutUser);

router.get('/client', (req, res) => {
  if (req.session.user && req.session.user.role === 'client') {
    res.send('Client page accessed successfully.');
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/tenant', (req, res) => {
  if (req.session.user && req.session.user.role === 'tenant') {
    res.send('Tenant page accessed successfully.');
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/admin', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    res.send('Admin page accessed successfully.');
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/landlord', (req, res) => {
  if (req.session.user && req.session.user.role === 'landlord') {
    res.send('Landlord page accessed successfully.');
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
