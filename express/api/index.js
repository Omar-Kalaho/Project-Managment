const express = require("express");
const { connectToDb } = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const studentRouter = require("./routes/student");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");


    // Connect the client to the server	(optional starting in v4.7)
   connectToDb().then(()=>{
    

    //middlewar

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    app.use(express.static("public"));

    app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
    });

    //routes
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.use("/api/admin", adminRouter);
    app.use("/api/student", studentRouter);
    app.use("/api/user", userRouter);

    // Start the Express server
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  }
   ,(error)=>{console.error("Error connecting to MongoDB:", error);})
    // Send a ping to confirm a successful connection
     
module.exports = app;
