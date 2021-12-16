const express = require('express')
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB =require("./database/database")

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use("/gradients",require("./routes/api/gradient"))

// post linten
app.listen(PORT, () => {
  console.log(`Server running port: ${PORT}`)
})