const express = require('express');
const router = express.Router();

const { createOrder, getAll, updateOrder, deleteOrder } = require('../controllers/orderControllers')

/**
 * get all Order
 */
router.get('/', getAll);

/**
 * create Order
 */
router.post('/', createOrder );

/**
 * update Order
 */
router.put('/update/${id}', updateOrder);

/**
 * delete Order 
 */
router.delete('/delete/${id}', deleteOrder);

module.exports = router;