const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/', memberController.index);

router.post('/sign-up', memberController.signUpPost);
router.get('/sign-up', memberController.signUpGet);

router.post('/log-in', memberController.logIn);
router.get('/log-out', memberController.logOut);

router.post('/create-message-form', memberController.create_message_post)
router.get('/create-message-form', memberController.create_message_get)

router.post('/delete-message', memberController.delete_message)


module.exports = router;
