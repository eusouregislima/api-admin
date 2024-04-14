const Administrator = require("../../schemas/Adm");

const MongoClient = require("mongodb").MongoClient;

let mongooseURLClient = new MongoClient(
  "mongodb+srv://userdev:devuser@cluster0.9awztpf.mongodb.net/dbIndicaLeads",
  {
    useNewUrlParser: true,
  }
);

class ListAllCustomersController {
  async index(req, res) {
    let adminId = JSON.parse(req.adminId);

    const adminInCollection = await Administrator.findById({ _id: adminId });

    if (!adminInCollection) {
      return res.status(404).json({ message: "Admin not found" });
    }

    try {
      const mongooseCustomerCollection = await mongooseURLClient
        .db("dbIndicaLeads")
        .collection("customers")
        .find({})
        .toArray();

      function sortCustomersByAlphabeticOrder(firstName, secondName) {
        const clientA = firstName.name.toUpperCase();
        const clientB = secondName.name.toUpperCase();

        if (clientA < clientB) {
          return -1;
        }

        if (clientA > clientB) {
          return 1;
        }
        return 0;
      }

     mongooseCustomerCollection.sort(sortCustomersByAlphabeticOrder);

      return res.status(200).json(mongooseCustomerCollection);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ListAllCustomersController();
