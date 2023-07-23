//create mini-express app(Separate route)
const exp = require("express");
const appointmentsApp = exp.Router();
const verifyToken = require("./middlewares/verifyToken");
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//body parser
appointmentsApp.use(exp.json());

//CREATE USER API

//get all appointments
appointmentsApp.get(
  "/appointments",
  expressAsyncHandler(async (req, res) => {
    //get appointmentsCollection
    const appointmentsCollection = req.app.get("appointmentsCollection");
    //get appointment
    let appointments = await appointmentsCollection
      .find({ status: true })
      .toArray();
    //send res
    res.send({ message: "all appointments", payload: appointments });
  })
);

// //get a appointment by email
// userApp.get("/appointments/:docemail", async (req, res) => {
//   //get appointmentsCollection
//   const appointmentsCollection = req.app.get("appointmentsCollection");
//   //get email from url
//   let emailOfUrl = req.params.docemail;
//   //find user
//   let appointment = await appointmentsCollection.findOne({
//     docemail: emailOfUrl,
//     status: true,
//   });
//   //send res
//   res.send({ message: "One user", payload: appointment });
// });

//new appointment
appointmentsApp.post(
  "/appointments",
  expressAsyncHandler(async (req, res) => {
    //get appointmentsCollection
    const appointmentsCollection = req.app.get("appointmentsCollection");
    //get newappointment from client
    const newappointment = req.body;
    //save new user
    await appointmentsCollection.insertOne(newappointment);
    res.status(201).send({ message: "created" });
  })
);

// //update appointment by email
// appointmentsApp.put(
//   "/appointments",
//   expressAsyncHandler(async (req, res) => {
//     //get appointmentsCollection
//     const appointmentsCollection = req.app.get("appointmentsCollection");
//     //get modified appointment from client
//     const modifiedappointment = req.body;
//     //modify
//     await appointmentsCollection.updateOne(
//       { docemail: modifiedappointment.username },
//       { $set: { ...modifiedappointment } }
//     );
//     //send res
//     res.send({ message: "User modified" });
//   })
// );

//delete appointment by email
appointmentsApp.delete(
  "/appointments/:docemail",
  expressAsyncHandler(async (req, res) => {
    //get appointmentsCollection
    const appointmentsCollection = req.app.get("appointmentsCollection");
    //get email from url
    let emailOfUrl = req.params.email;
    //update user status to false
    await appointmentsCollection.updateOne(
      { docemail: emailOfUrl },
      { $set: { status: false } }
    );
    //send res
    res.send({ message: "appointment deleted" });
  })
);

//restore appointment by email
appointmentsApp.get(
  "/appointment-restore/:docemail",
  expressAsyncHandler(async (req, res) => {
    //get appointmentsCollection
    const appointmentsCollection = req.app.get("appointmentsCollection");
    //get email from url
    let emailOfUrl = req.params.email;
    //update user status to false
    await appointmentsCollection.updateOne(
      { docemail: emailOfUrl },
      { $set: { status: true } }
    );
    //send res
    res.send({ message: "appointment restored" });
  })
);

//private route
appointmentsApp.get("/test-private", verifyToken, (req, res) => {
  res.send({ message: "This is private info" });
});

//export appointmentsApp
module.exports = appointmentsApp;
