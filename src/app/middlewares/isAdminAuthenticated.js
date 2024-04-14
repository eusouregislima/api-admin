const jwt = require("jsonwebtoken");

class isAdminAuthenticated {
  async handleAuthentication(req, res, next) {
    const adminToken = req.headers.authorization;

    if (!adminToken) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = adminToken.split(" ");

    try {
      const { sub } = jwt.verify(token, process.env.JWT_SECRET);

      req.adminId = sub;

      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Token inválido" });
    }
  }
}

module.exports = new isAdminAuthenticated();
