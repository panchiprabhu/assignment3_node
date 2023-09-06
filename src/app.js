const express = require("express");
const app = express();
const User = require("./model/user");
const logger = require("./logger/log");
require("./db/connect");
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hi there!</h1>");
});

//create a new user
app.post("/create", (req, res) => {
  console.log(req.body);
  logger.info("Inside the post request");
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      logger.info("Data saved successfully");
      res.status(201).send(user);
    })
    .catch((err) => {
      logger.error("Error creating user")
      res.status(400).send(err);
    });
});

//read users
app.get("/read", async (req, res) => {
  try {
    const data = await User.find();
    if(data.length === 0) {
        logger.info("No users found");
        res.send("No users found");
    }else{
        logger.info("Data retrieved successfully");
        res.send(data);
    }
  } catch (err) {
    logger.error("Error fetching users");
    res.send(err);
  }
});

//get one user using email address
app.get("/read/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await User.findOne({ email: email });
    console.log(data);
    if (!data) {
        logger.info("No users found");
      return res.status(404).send();
    } else {
        logger.info("Data retrieved successfully");
      res.send(data);
    }
  } catch (err) {
    logger.error("Error fetching users");
    res.status(500).send(err);
  }
});

//update user without specifying email
app.patch("/update/", async (req,res) => {
  logger.error("Error updating user, need email address");
  res.status(400).send();});

//update by email address
app.patch("/update/:email", async (req, res) => {
  try {
    const em = req.params.email;
    const data = await User.findOneAndUpdate({ email: em }, req.body, {
      new: true,
    });
    console.log(data);
    if(data==null){
      throw new Error
    }
    logger.info("Updated user data successfully");
    res.status(201).send(data);
  } catch (error) {
    logger.error("Error updating user data: Email maybe invalid");
    res.status(404).send(error);
  }
});

//delete user without specifying email
app.delete("/delete/", async (req,res) => {
  logger.error("Error deleting user, need email address");
  res.status(400).send();});

//delete user by email address
app.delete("/delete/:email", async (req, res) => {
  try {
    const em = req.params.email;
      const data = await User.findOneAndDelete({ email: em });
      if(data==null){
        throw new Error
      }
      logger.info("User deleted successfully");
      console.log(data);
      res.send(data);
  } catch (error) {
    logger.error("Error deleting user data: Email maybe invalid");
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});

module.exports = app;