var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');

router.get('/', indexController.index);

router.get('/categories', categoryController.index);

router.get('/items', itemController.index);

// router.get('/users', userController.index);

module.exports = router;
