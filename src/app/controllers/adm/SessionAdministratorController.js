const Administrator = require("../../schemas/Adm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class SessionAdministratorController {
  async store(req, res) {
    const { email, password } = req.body;

    const isEmailInCollection = await Administrator.findOne({ email: email });

    if (!isEmailInCollection) {
      return res.status(400).json({ error: "Email ou senha incorretos." });
    }

    const adminCollection = isEmailInCollection;

    const admin = {
      adminId: JSON.stringify(adminCollection._id),
      name: adminCollection.name,
      email: adminCollection.email,
      password: adminCollection.password_hash,
    };

    const isPasswordHashMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordHashMatch) {
      return res.status(400).json({ error: "Email ou senha incorretos." });
    }

    const adminToken = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        subject: admin.adminId,
        expiresIn: "30d",
      }
    );

    admin.adminToken = adminToken;

    return res.status(201).json(admin);
  }
}

module.exports = new SessionAdministratorController();
