const exp = require("express");
const app = exp();
const path = require("path");

//connect angular build with nodejs server
app.use(exp.static(path.join(__dirname, "./dist/samplewebapp")));

//get MongoClient
const mClient = require("mongodb").MongoClient;
//connect to DB server
mClient
  .connect("mongodb://127.0.0.1:27017/ca003db")
  .then((client) => {
    //get DB obj
    const ca003db = client.db("ca003db");
    //get collection obj
    const userCollection = ca003db.collection("users");
    const productCollection = ca003db.collection("products");
    //share user collection obj
    app.set("userCollection", userCollection);
    app.set("productCollection", productCollection);

    console.log("DB connection success");
  })
  .catch((err) => console.log("err in DB connect", err));

//import userApp
const userApp = require("./apis/userApi");
const productApp = require("./apis/productsApi");

//execute userApp when path starts with 'user'
app.use("/user-api", userApp);
app.use("/product-api", productApp);

//assign port
app.listen(3000, () => {
  console.log("server listening on port 3000...");
});
