const express = require("express");
const cors = require("cors");
const user = require("./controllers/user");
const product = require("./controllers/product");
const connectDb = require("./connection");
const multer = require("multer");
const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "*",
  methods: "GET, POST, DELETE, PATCH, PUT, HEAD",
  // credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static("upload"));
connectDb(
  "mongodb+srv://sumitdhonde0:OP3ZFh4RtwEm1RdJ@cluster100.recamce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster100"
);

//multer
let imgName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    imgName = `${Date.now()}-${file.originalname}`;
    cb(null, imgName);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("productImage"), (req, res) => {
  console.log(req.body);

  console.log(req.file);

  return res.send("uploaded");
});

// console.log(user.signuproute);
app.post("/signup", user.signuproute);

app.post("/login", user.loginroute);

app.get("/protected", user.protectedroute);

app.post("/getUser", user.getUser);

app.patch("/updateUser", user.updateUser);

//product

app.post("/uploadProduct", product.uploadProduct);

app.patch("/updateProduct", product.updateProduct);

app.delete("/deleteProd", product.deleteProd);

app.get("/getProduct", product.getProduct);

app.get("/getOneProd", product.getOneProd);

app.listen(PORT, () => {
  console.log(`${PORT} is on `);
});
