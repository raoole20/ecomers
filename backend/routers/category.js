const express = require('express');
const router = express.Router();

const { createCategories, getAll,getId, updateCategories, deleteCategories } = require('../controllers/categoriesControllers')

/**
 * get all Categories
 */
router.get('/', getAll);

/**
 * get Categories by id
 */
router.get('/:id', getId);

/**
 * create Categories
 */
router.post('/create', createCategories );

/**
 * update Categories
 */
router.put('/update/:id', updateCategories);

/**
 * delete Categories 
 */
router.delete('/delete/:id', deleteCategories);

module.exports = router;