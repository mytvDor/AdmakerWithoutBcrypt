const { myproduct } = require("../models/productModel");
const { v4: uuidv4 } = require("uuid");

async function generateUniqueId() {
  let id;
  let exists = true;

  while (exists) {
    id = uuidv4();
    exists = await myproduct.exists({ servId: id });
  }

  return id;
}

// const uploadProduct = async (req, res) => {
//   // const uniqueid = await generateUniqueId();
//   // const body = req.body;
//   console.log("from upload prod");
//   await myproduct.create({
//     title: req.body.title,

//     img: req.body.img,
//     price: req.body.price,
//     description: req.body.description,
//     category: req.body.category,
//     servId: req.body.servId,
//     uid: req.body.uid,
//     location: req.body.location,
//     phone: req.body.phone,
//     email: req.body.email,
//   });
//   console.log("done upload prod");

//   res.json("product added");
// };
const uploadProduct = async (req, res) => {
  // console.log(req.body);

  // const uniqueid = await generateUniqueId();

  console.log(req.body);
  try {
    await myproduct.create({
      title: req.body.title,
      img: req.body.img, // This should be a URL string
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      servId: req.body.servId,
      uid: req.body.uid,
      location: req.body.location,
      phone: req.body.phone,
      email: req.body.email,
    });
    console.log("done upload prod");
    res.json("product added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product", error });
  }
};

const updateProduct = async (req, res) => {
  // const body = req.body;

  try {
    await myproduct.findOneAndUpdate(
      { prodid: req.body.prodid },
      {
        title: req.body.title,

        img: req.body.img,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        servId: uniqueid,
        uid: "coming soon",
        location: "us",
        phone: "9999999999",
        email: "s@gmail.com",
      }
    );
    res.send("product updated");
  } catch (err) {
    console.log(err);
    res.send("product not updated");
  }
};

const deleteProd = async (req, res) => {
  try {
    await myproduct.findOneAndDelete({ servId: req.body.servId });
    res.send("product ddeleted");
  } catch (err) {
    console.log(err);
    res.send("product not deleted");
  }
};

const getProduct = async (req, res) => {
  try {
    const data = await myproduct.find();
    console.log(typeof data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("products not found");
  }
};

const getOneProd = async (req, res) => {
  try {
    const data = await myproduct.findOne({ servId: req.query.servId }); // Use req.query instead of req.body

    res.json(data);
  } catch (err) {
    console.log(err);
    res.send("Product not found");
  }
};
module.exports = {
  uploadProduct,
  updateProduct,
  deleteProd,
  getProduct,
  getOneProd,
};
