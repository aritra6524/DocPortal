//create mini-express app(Separate route)
const exp = require("express");
const userApp = exp.Router();
const verifyToken = require("./middlewares/verifyToken");
const bcryptjs = require("bcryptjs");

//body parser
userApp.use(exp.json());

//CREATE USER API

//get all users
userApp.get("/users", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get users
  let user = await userCollection.find({ status: true }).toArray();
  //send res
  res.send({ message: "all users", payload: user });
});

//get a user by username
userApp.get("/users/:username", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get username from url
  let usernameOfUrl = req.params.username;
  //find user
  let user = await userCollection.findOne({
    username: usernameOfUrl,
    status: true,
  });
  //send res
  res.send({ message: "One user", payload: user });
});

//create register user
userApp.post("/users", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get newUser from client
  const newUser = req.body;
  //check for the username which already taken by someone
  let user = await userCollection.findOne({ username: newUser.username });
  //if user existed with that username
  if (user != null) {
    res.send({ message: "Username has already taken. Choose another one" });
  } else {
    //add status
    newUser.status = true;
    //hash password
    let hashedPassword = await bcryptjs.hash(newUser.password, 5);
    //replace plain password with hashed password
    newUser.password = hashedPassword;
    //save new user
    await userCollection.insertOne(newUser);
    res.status(201).send({ message: "created" });
  }
});

//user login
userApp.post("/user-login", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get user cred
  let userCred = req.body;
  //verify username
  let user = await userCollection.findOne({ username: userCred.username });
  //if user not found
  if (user == null) {
    res.send({ message: "Invalid username" });
  }
  //if user found
  else {
    //compare passwords
    let result = await bcryptjs.compare(userCred.password, user.password);
    //if passwords not matched
    if (result == false) {
      res.send({ message: "Invalid password" });
    }
    //if passwords matched
    else {
      //create token
      let signedToken = jwt.sign({ username: user.username }, "abcdef", {
        expiresIn: 100,
      });
      //send token in res
      res.send({
        message: "Login success",
        token: signedToken,
        currentUser: user,
      });
    }
  }
});

//update user by username
userApp.put("/users", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get modified user from client
  const modifiedUser = req.body;
  //modify
  await userCollection.updateOne(
    { username: modifiedUser.username },
    { $set: { ...modifiedUser } }
  );
  //send res
  res.send({ message: "User modified" });
});

//delete user by username
userApp.delete("/users/:username", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get username from url
  let usernameOfUrl = req.params.username;
  //update user status to false
  await userCollection.updateOne(
    { username: usernameOfUrl },
    { $set: { status: false } }
  );
  //send res
  res.send({ message: "User deleted" });
});

//restore user by username
userApp.get("/user-restore/:username", async (req, res) => {
  //get userCollection
  const userCollection = req.app.get("userCollection");
  //get username from url
  let usernameOfUrl = req.params.username;
  //update user status to false
  await userCollection.updateOne(
    { username: usernameOfUrl },
    { $set: { status: true } }
  );
  //send res
  res.send({ message: "User restored" });
});

//private route
userApp.get("/test-private", verifyToken, (req, res) => {
  res.send({ message: "This is private info" });
});
//export userApp
module.exports = userApp;
