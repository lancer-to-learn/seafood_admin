const express = require('express');
const { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch, deleteMultipleBranches} = require("../controllers/branchController"); 

const router = express.Router();

// Define routes
router.get('/getAll', getAllBranches);
router.get('/get/:id', getBranchById);
router.post('/create', createBranch);
router.put('/update/:id', updateBranch);
router.delete('/delete/:id', deleteBranch);
router.post('/deleteMultiple', deleteMultipleBranches);

module.exports = router;