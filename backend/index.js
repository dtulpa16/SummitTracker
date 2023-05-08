const express = require('express');
const app = express();
const connectDb = require("./startup/db")
const summit = require("./routes/summit")

connectDb()
app.use(express.json());
app.use('/api/summit', summit)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});