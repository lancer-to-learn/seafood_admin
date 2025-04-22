const express = require('express');
const accountController = require("../controllers/accountController"); 

const router = express.Router();

// Define routes
router.get('/getAdmins', accountController.getAdminAccounts);

module.exports = router;