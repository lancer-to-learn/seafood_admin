const Account = require('../dao/AccountDao');

// Controller to handle account-related operations
const accountController = {
    // Get all accounts
    getAllAccounts: async (req, res) => {
        try {
            const accounts = await Account.find();
            res.status(200).json(accounts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching accounts', error });
        }
    },

    // Get a single account by ID
    getAccountById: async (req, res) => {
        try {
            const account = await Account.findById(req.params.id);
            if (!account) {
                return res.status(404).json({ message: 'Account not found' });
            }
            res.status(200).json(account);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching account', error });
        }
    },

    // Create a new account
    createAccount: async (req, res) => {
        try {
            const newAccount = new Account(req.body);
            const savedAccount = await newAccount.save();
            res.status(201).json(savedAccount);
        } catch (error) {
            res.status(400).json({ message: 'Error creating account', error });
        }
    },

    // Update an account by ID
    updateAccount: async (req, res) => {
        try {
            const updatedAccount = await Account.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedAccount) {
                return res.status(404).json({ message: 'Account not found' });
            }
            res.status(200).json(updatedAccount);
        } catch (error) {
            res.status(400).json({ message: 'Error updating account', error });
        }
    },

    // Delete an account by ID
    deleteAccount: async (req, res) => {
        try {
            const deletedAccount = await Account.findByIdAndDelete(req.params.id);
            if (!deletedAccount) {
                return res.status(404).json({ message: 'Account not found' });
            }
            res.status(200).json({ message: 'Account deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting account', error });
        }
    },

    // Get all admin accounts
    getAdminAccounts: async (req, res) => {
        try {
            const adminAccounts = await Account.getAdminAccounts();
            res.status(200).json(adminAccounts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching admin accounts', error });
        }
    }
};

module.exports = accountController;