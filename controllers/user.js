// const express = require("express");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { default: mongoose } = require("mongoose");
const { myuser } = require("../models/userModel");

const secretkey = "secret";
const { v4: uuidv4 } = require("uuid");

// async function signuproute(req, res) {
//   // console.log("hi");
//   const email = req.body.email;

//   console.log(req.body);

//   if (await myuser.findOne({ email: `${email}` })) {
//     console.log("email already exist");

//     res.send("already exist email");
//   } else {
//     hashedpass = await bcrypt.hash(req.body.password, 10);
//     console.log(hashedpass);

//     async function generateUniqueId() {
//       let id;
//       let exists = true;

//       while (exists) {
//         id = uuidv4();
//         exists = await myuser.exists({ servId: id });
//       }

//       return id;
//     }
//     const uniqueid = await generateUniqueId();

//     // signuser = {
//     //   username: req.body.username,
//     //   email: req.body.email,
//     //   password: hashedpass,
//     // };

//     await myuser.create({
//       username: req.body.username,
//       uid: uniqueid,
//       email: req.body.email,
//       password: hashedpass,
//     });

//     res.send({ msg: "done" });
//   }
// }

// async function loginroute(req, res) {
//   try {
//     email = req.body.email;

//     console.log(req.body.email);
//     userdata = await myuser.findOne({ email });

//     // console.log(userdata);
//     if (!userdata) {
//       return res.status(404).json({ message: "user not found " });
//     }
//     checkHash = await bcrypt.compare(req.body.password, userdata.password);

//     console.log(checkHash);

//     if (checkHash && req.body.email == userdata.email) {
//       jwt.sign(
//         { email: req.body.email },
//         secretkey,
//         { expiresIn: "800min" },
//         (err, token) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res.json({
//               message: "successfully logged in ",
//               email: req.body.email,

//               token,
//               userdata,
//             });
//           }
//         }
//       );
//     } else {
//       res.status(401).json({ message: "invalid password" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).json({ message: "error" });
//   }
// }

async function signuproute(req, res) {
  const email = req.body.email;
  console.log(req.body);

  if (await myuser.findOne({ email: `${email}` })) {
    console.log("email already exists");
    res.send("email already exists");
  } else {
    async function generateUniqueId() {
      let id;
      let exists = true;

      while (exists) {
        id = uuidv4();
        exists = await myuser.exists({ servId: id });
      }

      return id;
    }
    const uniqueid = await generateUniqueId();

    await myuser.create({
      username: req.body.username,
      uid: uniqueid,
      email: req.body.email,
      password: req.body.password,
    });

    res.send({ msg: "done" });
  }
}

async function loginroute(req, res) {
  try {
    const email = req.body.email;
    console.log(req.body.email);

    const userdata = await myuser.findOne({ email });

    if (!userdata) {
      return res.status(404).json({ message: "user not found" });
    }

    if (req.body.password === userdata.password) {
      res.json({
        message: "successfully logged in",
        email: req.body.email,
        userdata,
      });
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "error" });
  }
}

async function protectedroute(req, res) {
  verifytoken(req, res);
  //   res.send({ message: "valid token" });
}

function verifytoken(req, res) {
  //   console.log("ji");
  const bearerheader = req.headers["authorization"];

  if (bearerheader !== undefined) {
    const bearer = bearerheader.split(" ");
    const token = bearer[1];
    req.token = token;

    jwt.verify(req.token, secretkey, (err, authdata) => {
      if (err) {
        console.log("error", err);
        res.send("something went wrong");
      } else {
        res.json({
          message: "accessed",
          authdata,
        });
      }

      console.log("ji");
    });
    // next();
  } else {
    res.send({ message: "invalid token" });
  }
}

//NEW ADDED
// async function getUser(req, res) {
//   try {
//     const body = req.body;
//     const user = await myuser.findOne({ email: body.email });

//     res.json(user);
//   } catch (err) {
//     console.log("USER NOT FOUND", err);
//     res.send(err);
//   }
// }

async function getUser(req, res) {
  try {
    const body = req.body;
    const user = await myuser.findOne({ email: body.email });

    if (!user) {
      throw new Error("User not found");
    }

    res.json(user); // Send user data as JSON response
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: err.message }); // Send error message as JSON
  }
}

// async function updateUser(req, res) {
//   try {
//     const updatedUserData = await myuser.findOneAndUpdate(
//       { email: req.body.email },
//       {
//         providedServices: req.body.providedServices,
//         username: req.body.username,

//         email: req.body.email,
//       },
//       { new: true }
//     );
//     console.log(req.body, updatedUserData);
//     console.log("hiiiiiiii", req.body.providedServices);
//     res.json(updatedUserData);
//   } catch (err) {
//     console.log("catch", req.body.providedServices);

//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

async function updateUser(req, res) {
  const { email, servId } = req.body;
  console.log(email, servId);
  try {
    // Find user by email
    const user = await myuser.findOne({ email });
    console.log(user);

    if (!user) {
      console.log("user not found");

      return res.status(404).json({ error: "User not found" });
    }

    // console.log("i am here 1");

    // Add servId to providedServices array (if not already present)
    if (!user.providedServices.includes(servId)) {
      // console.log("i am here 2");

      user.providedServices.push(servId);
      console.log(user.providedServices);
    }
    // console.log("i am here 3");

    // Save updated user document
    await user.save();
    // console.log("i am here 5");

    // Respond with updated user document (optional)
    res.json(user);
  } catch (error) {
    console.log("i err");

    console.error("Error updating provided services:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  signuproute,
  loginroute,
  protectedroute,
  getUser,
  updateUser,
};
