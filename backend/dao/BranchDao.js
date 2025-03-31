const { Branch, Account } = require("../models");

class BranchDao {
    async createBranch(branch) {
        try {
            const newBranch = await Branch.create(branch);
            return await this.getBranchById(newBranch.id);
        } catch (error) {
            throw new Error(`Unable to create branch: ${error.message}`);
        }
    }

    async getBranchById(branchId) {
        try {
            const branch = await Branch.findByPk(branchId, {
                include: [
                    {
                        model: Account,
                        as: "managerData", // Phải khớp với alias trong model
                        attributes: ["id", "username", "email"], // Chỉ lấy những gì cần thiết
                    },
                ],
            });
            if (!branch) {
                throw new Error('Branch not found');
            }
            return branch;
        } catch (error) {
            throw new Error(`Unable to retrieve branch: ${error.message}`);
        }
    }

    async getBranchByName(name) {
        try {
            const branch = await Branch.findOne({ where: { name }, include: [
                {
                  model: Account,
                  as: "managerData", // Alias để lấy thông tin đầy đủ của manager
                  attributes: ["id", "username", "email"], // Chỉ lấy các trường cần thiết
                },
              ], });
            if (!branch) {
                return null;
            }
            return branch;
        } catch (error) {
            return null;
        }
    }

    async getAllBranches() {
        try {
            const branches = await Branch.findAll({
                include: [
                  {
                    model: Account,
                    as: "managerData",
                    attributes: ["id", "username", "email"],
                  },
                ],
              });
            return branches;
        } catch (error) {
            throw new Error(`Unable to retrieve branches: ${error.message}`);
        }
    }

    async updateBranch(branchId, branch) {
        try {
            const [updated] = await Branch.update(branch, {
                where: { id: branchId }
            });
            if (!updated) {
                throw new Error('Branch not found');
            }
            return await this.getBranchById(branchId);
        } catch (error) {
            throw new Error(`Unable to update branch: ${error.message}`);
        }
    }

    async deleteBranch(branchId) {
        try {
            const deleted = await Branch.destroy({
                where: { id: branchId }
            });
            if (!deleted) {
                throw new Error('Branch not found');
            }
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete branch: ${error.message}`);
        }
    }
}

module.exports = new BranchDao();
