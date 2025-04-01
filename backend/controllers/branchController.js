const BranchDao = require("../dao/BranchDao");

// Get all branches
const getAllBranches = async (req, res) => {
    try {
        const branches = await BranchDao.getAllBranches();
        res.status(200).json({
            success: true,
            data: branches,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a single branch by ID
const getBranchById = async (req, res) => {
    try {
        const branch = await BranchDao.getBranchById(req.params.id);
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: 'Branch not found',
            });
        }
        res.status(200).json({
            success: true,
            data: branch,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Create a new branch
const createBranch = async (req, res) => {
    try {
        const branch = await BranchDao.createBranch(req.body);
        res.status(201).json({
            success: true,
            data: branch,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid data',
        });
    }
};

// Update a branch by ID
const updateBranch = async (req, res) => {
    try {
        const branch = await BranchDao.updateBranch(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: 'Branch not found',
            });
        }
        res.status(200).json({
            success: true,
            data: branch,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid data',
        });
    }
};

// Delete a branch by ID
const deleteBranch = async (req, res) => {
    try {
        const branch = await BranchDao.deleteBranch(req.params.id);
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: 'Branch not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Branch deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Delete multiple branches by IDs
const deleteMultipleBranches = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of branch IDs in the request body
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or empty IDs array',
            });
        }
        const result = await BranchDao.deleteMultipleBranches(ids);
        res.status(200).json({
            success: true,
            message: `${result} branches deleted successfully`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + e.message,
        });
    }
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
    deleteMultipleBranches,
};