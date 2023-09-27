const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const jwt = require('../config/JWT.js');
const storage = require("../config/multer.js");

// router.post('/register', userController.registerUser);
// router.post('/login', userController.login);
// router.post('/createUser',storage.single('image'), jwt.validateAdmin, userController.createUser);
// router.put('/:id', jwt.validateToken, userController.editUser);
// router.delete('/:id',jwt.validateAdmin, userController.deleteUser);
// router.get('/', userController.getAllUsers);
// router.get('/profile', userController.getProfile); 
// router.get('/:name', userController.searchUser);
// router.post('/get-verification-code', userController.getVerificationCode);
// router.post('/verifiy-code', userController.verifyCode);
// router.put('/update-password/:userId', userController.updatePassword);

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/createUser',storage.single('image'),userController.createUser);
router.put('/:id',userController.editUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/profile', userController.getProfile); 
router.get('/:name', userController.searchUser);
router.post('/get-verification-code', userController.getVerificationCode);
router.post('/verifiy-code', userController.verifyCode);
router.put('/update-password/:userId', userController.updatePassword);
  
module.exports = router;
