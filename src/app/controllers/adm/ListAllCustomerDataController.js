const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

let mongooseURLClient = new MongoClient(
  "mongodb+srv://userdev:devuser@cluster0.9awztpf.mongodb.net/dbIndicaLeads",
  {
    useNewUrlParser: true,
  }
);

class ListAllCustomerDataController {
  async index(req, res) {
    const customerId = new ObjectId(req.params.id);

    if (!customerId) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const mongooseCustomerDataCollection = await mongooseURLClient
        .db("dbIndicaLeads")
        .collection("customers")
        .findOne({ _id: customerId });

      const mongooseCustomerCampaignsCollection = await mongooseURLClient
        .db("dbIndicaLeads")
        .collection("campaigns")
        .find({ customerId: req.params.id })
        .toArray();

      const campaignsIds = mongooseCustomerCampaignsCollection.map((campaign) =>
        campaign._id.toString()
      );

      const mongooseGetIndicatorsAffiliatedOnCustomerCampaign =
        await mongooseURLClient
          .db("dbIndicaLeads")
          .collection("indicators")
          .find({ affiliateCampaign: { $in: campaignsIds } })
          .toArray();

      const mongooseGetAllLeadsOfCampaigns = await mongooseURLClient
        .db("dbIndicaLeads")
        .collection("leads")
        .find({ campaignId: { $in: campaignsIds } })
        .toArray();

      const customerCredentials = [
        {
          id: mongooseCustomerDataCollection._id.toString(),
          name: mongooseCustomerDataCollection.name,
          cnpj: mongooseCustomerDataCollection.cnpj,
          email: mongooseCustomerDataCollection.email,
          phone: mongooseCustomerDataCollection.phone,
          isDeleted: mongooseCustomerDataCollection.isDeleted,
          createdAt: mongooseCustomerDataCollection.createdAt,
        },
      ];

      const customer = {
        credentials: customerCredentials,
        campaigns: mongooseCustomerCampaignsCollection,
        allIndicatorsOfCampaigns: mongooseGetIndicatorsAffiliatedOnCustomerCampaign,
        allLeadsOfCampaigns: mongooseGetAllLeadsOfCampaigns,
      };

      return res.status(200).json({ customer });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ListAllCustomerDataController();
