var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');

router.get('/', indexController.index);

router.get('/categories', categoryController.index);
router.get('/categories/create', categoryController.create_get);
router.post('/categories/create', categoryController.create_post);
router.get('/categories/:id/update', categoryController.update_get);
router.post('/categories/:id/update', categoryController.update_post);
router.get('/categories/:id', categoryController.detail);

router.get('/items', itemController.index);
router.get('/items/create', itemController.create_get);
router.post('/items/create', itemController.create_post);
router.get('/items/:id/update', itemController.update_get);
router.post('/items/:id/update', itemController.update_post);
router.get('/items/:id', itemController.detail);

router.get('/users', userController.index);
router.get('/users/create', userController.create_get);
router.post('/users/create', userController.create_post);
router.get('/users/:id/update', userController.update_get);
router.post('/users/:id/update', userController.update_post);
router.get('/users/:id', userController.detail);

module.exports = router;
