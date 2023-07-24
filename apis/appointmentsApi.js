//create mini-express app(Separate route)
const exp = require("express");
const appointmentsApp = exp.Router();
const verifyToken = require("./middlewares/verifyToken");
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

//body parser
appointmentsApp.use(exp.json());

//CREATE USER API

//get all appointments
appointmentsApp.get(
  "/appointments",
  expressAsyncHandler(async (req, res) => {
    //get appointmentsCollection
    const appointmentsCollection = req.app.get("appointmentsCollection");
    //get appointments
    let appointments = await appointmentsCollection.find().toArray();
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

// // soft delete appointment by id
// appointmentsApp.delete(
//   "/appointments/:id",
//   expressAsyncHandler(async (req, res) => {
//     //get appointmentsCollection
//     const appointmentsCollection = req.app.get("appointmentsCollection");
//     //get email from url
//     let idOfUrl = req.params.id;
//     //update user status to false
//     // console.log("_id=" + _id);
//     // console.log("idOfUrl=" + idOfUrl);
//     const result = await appointmentsCollection.deleteOne({ _id: idOfUrl });

//     if (result.deletedCount === 1) {
//       res.send({ message: "Appointment deleted." });
//     } else {
//       res.status(404).json({ message: "Appointment not found." });
//     }

//     //send res
//     // res.send({ message: "appointment deleted" });
//   })
// );

// //restore appointment by email
// appointmentsApp.get(
//   "/appointment-restore/:docemail",
//   expressAsyncHandler(async (req, res) => {
//     //get appointmentsCollection
//     const appointmentsCollection = req.app.get("appointmentsCollection");
//     //get email from url
//     let emailOfUrl = req.params.email;
//     //update user status to false
//     await appointmentsCollection.updateOne(
//       { docemail: emailOfUrl },
//       { $set: { status: true } }
//     );
//     //send res
//     res.send({ message: "appointment restored" });
//   })
// );

//parmanently delete patient by _id
appointmentsApp.delete("/appointments-delete/:_id", async (req, res) => {
  //get appointmentsCollection
  const appointmentsCollection = req.app.get("appointmentsCollection");
  //get email from url
  let idOfUrl = req.params._id;
  var o_id = new ObjectId(idOfUrl);
  let appointment = await appointmentsCollection.findOne({
    _id: o_id,
  });
  if (appointment == null) {
    res.send({ message: "Appointment does not exist in DB" });
  } else {
    await appointmentsCollection.deleteOne({ _id: o_id });
    res.send({ message: "Appointment is deleted" });
  }
});

//private route
appointmentsApp.get("/test-private", verifyToken, (req, res) => {
  res.send({ message: "This is private info" });
});

//export appointmentsApp
module.exports = appointmentsApp;
