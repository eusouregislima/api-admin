const Administrator = require("../../schemas/Adm/index");
const bcrypt = require("bcrypt");

class CreateAdministratorController {
  async store(req, res) {
    const { name, email, phone, isAdminMaster, password, isDeleted } = req.body;

    try {
      const isAdminExists = await Administrator.findOne({ email: email });

      if (isAdminExists) {
        return res.status(400).send({ error: "Email já existente." });
      }

      const password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const admin = await Administrator.create({
        name,
        email,
        phone,
        isAdminMaster,
        password_hash,
        isDeleted,
      });

      return res.status(200).json(admin);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new CreateAdministratorController();
