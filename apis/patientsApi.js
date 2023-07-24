//create mini-express app(Separate route)
const exp = require("express");
const patientsApp = exp.Router();
const verifyToken = require("./middlewares/verifyToken");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//body parser
patientsApp.use(exp.json());

//CREATE USER API

//get all patients
patientsApp.get("/patients", async (req, res) => {
  //get patientsCollection
  const patientsCollection = req.app.get("patientsCollection");
  //get users
  let patients = await patientsCollection.find({ status: true }).toArray();
  //send res
  res.send({ message: "all patients", payload: patients });
});

//get a patient by email
patientsApp.get("/patients/:email", async (req, res) => {
  //get patientsCollection
  const patientsCollection = req.app.get("patientsCollection");
  //get email from url
  let emailOfUrl = req.params.email;
  //find user
  let patient = await patientsCollection.findOne({
    email: emailOfUrl,
    status: true,
  });
  //send res
  res.send({ message: "One user", payload: patient });
});

//create register patient
patientsApp.post("/patients", async (req, res) => {
  //get patientsCollection
  const patientsCollection = req.app.get("patientsCollection");
  //get newpatient from client
  const newpatient = req.body;
  //check for the email which already taken by someone
  let patient = await patientsCollection.findOne({
    patemail: newpatient.patemail,
  });
  //if patient existed with that username
  if (patient != null) {
    res.send({ message: "Username has already taken. Choose another one" });
  } else {
    //add status
    newpatient.status = true;
    //hash password
    let hashedPassword = await bcryptjs.hash(newpatient.patpassword, 5);
    //replace plain password with hashed password
    newpatient.patpassword = hashedPassword;
    //save new user
    await patientsCollection.insertOne(newpatient);
    res.status(201).send({ message: "created" });
  }
});

//patient login
patientsApp.post("/patient-login", async (req, res) => {
  //get patientsCollection
  const patientsCollection = req.app.get("patientsCollection");
  //get patient cred
  let patientCred = req.body;
  //verify email
  let patient = await patientsCollection.findOne({
    patemail: patientCred.patemail,
  });
  //if patient not found
  if (patient == null) {
    res.send({ message: "Invalid username" });
  }
  //if patient found
  else {
    //compare passwords
    let result = await bcryptjs.compare(
      patientCred.patpassword,
      patient.patpassword
    );
    //if passwords not matched
    if (result == false) {
      res.send({ message: "Invalid password" });
    }
    //if passwords matched
    else {
      //create token
      let signedToken = jwt.sign({ patemail: patient.patemail }, "abcdef", {
        expiresIn: 100,
      });
      //send token in res
      res.send({
        message: "Login success",
        token: signedToken,
        currentPatient: patient,
      });
    }
  }
});

// //update patient by email
// patientsApp.put("/patients", async (req, res) => {
//   //get patientsCollection
//   const patientsCollection = req.app.get("patientsCollection");
//   //get modified patient from client
//   const modifiedpatient = req.body;
//   //modify
//   await patientsCollection.updateOne(
//     { email: modifiedpatient.username },
//     { $set: { ...modifiedpatient } }
//   );
//   //send res
//   res.send({ message: "User modified" });
// });

// //delete patient by email
// patientsApp.delete("/patients/:email", async (req, res) => {
//   //get patientsCollection
//   const patientsCollection = req.app.get("patientsCollection");
//   //get email from url
//   let emailOfUrl = req.params.email;
//   //update user status to false
//   await patientsCollection.updateOne(
//     { email: emailOfUrl },
//     { $set: { status: false } }
//   );
//   //send res
//   res.send({ message: "patient deleted" });
// });

// //restore patient by email
// patientsApp.get("/patient-restore/:email", async (req, res) => {
//   //get patientsCollection
//   const patientsCollection = req.app.get("patientsCollection");
//   //get email from url
//   let emailOfUrl = req.params.email;
//   //update user status to false
//   await patientsCollection.updateOne(
//     { email: emailOfUrl },
//     { $set: { status: true } }
//   );
//   //send res
//   res.send({ message: "patient restored" });
// });

// //private route
// userApp.get("/test-private", verifyToken, (req, res) => {
//   res.send({ message: "This is private info" });
// });
//export userApp
module.exports = patientsApp;
