const Administrator = require("../../schemas/Adm");

class ListAdministratorController {
  async show(req, res) {
    let adminId = JSON.parse(req.adminId);

    try {
      const admin = await Administrator.findById({ _id: adminId });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      return res.status(200).json(admin);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ListAdministratorController();
