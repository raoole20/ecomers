const express = require('express');
const router = express.Router();

const { createProducts, getAll, getById, getFeatured, getCount, updateProducts, deleteProducts } = require('../controllers/productsControllers')

/**
 * get all products
 */
router.get('/', getAll);

/**
 * get count products 
 */
router.get('/count', getCount);

/**
 * get only featured equal true
 */
router.get('/fratured', getFeatured);

/**
 * get products by Id
 */
router.get('/:id', getById);

/**
 * create products
 */
router.post('/create', createProducts );

/**
 * update products
 */
router.put('/update/:id', updateProducts);

/**
 * delete products 
 */
router.delete('/delete/:id', deleteProducts);

module.exports = router;