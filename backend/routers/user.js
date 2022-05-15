const express = require('express');
const router = express.Router();

const { register,login,getById, getAll, updateUser, deleteUser } = require('../controllers/userControllers')

/**
 * get all User
 */
router.get('/', getAll);
/**
 * get User by id
 */
router.get('/:id', getById);

/**
 * create User
 */
router.post('/register', register );

/**
 * login User
 */
router.post('/login', login );

/**
 * update User
 */
router.put('/update/:id', updateUser);

/**
 * delete User 
 */
router.delete('/delete/:id', deleteUser);

module.exports = router;