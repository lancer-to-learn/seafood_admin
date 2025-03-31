const { Account } = require("../models");
class AccountDao {
    async createAccount(account) {
        try {
            const newAccount = await Account.create(account);
            return newAccount;
        } catch (error) {
            throw new Error(`Unable to create account: ${error.message}`);
        }
    }

    async getAdminAccounts() {
        try {
            const adminAccounts = await Account.findAll({
                attributes: ['id', 'username', 'email'],
                where: {
                    role: ['admin', 'branch_admin']
                }
            });
            return adminAccounts;
        } catch (error) {
            throw new Error(`Unable to retrieve admin accounts: ${error.message}`);
        }
    }

    async getAccountById(accountId) {
        try {
            const account = await Account.findByPk(accountId);
            if (!account) {
                throw new Error('Account not found');
            }
            return account;
        } catch (error) {
            throw new Error(`Unable to retrieve account: ${error.message}`);
        }
    }

    async getAccountByUsername(username) {
        try {
            const account = await Account.findOne({ where: { username } });
            if (!account) {
                return null;
            }
            return account;
        } catch (error) {
            return null;
        }
    }

    async updateAccount(accountId, account) {
        try {
            const [updated] = await Account.update(account, {
                where: { id: accountId }
            });
            if (!updated) {
                throw new Error('Account not found');
            }
            return await this.getAccountById(accountId);
        } catch (error) {
            throw new Error(`Unable to update account: ${error.message}`);
        }
    }

    async deleteAccount(accountId) {
        try {
            const deleted = await Account.destroy({
                where: { id: accountId }
            });
            if (!deleted) {
                throw new Error('Account not found');
            }
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete account: ${error.message}`);
        }
    }
    async updateRefreshToken(username, refreshToken) {
        try {
            const account = await this.getAccountByUsername(username);
            account.refreshToken = refreshToken;
            await account.save();
            return account;
        } catch (error) {
            throw new Error(`Unable to update refresh token: ${error.message}`);
        }
    }

}

module.exports = new AccountDao();