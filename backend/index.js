const express = require('express');
const app = express();
const connectDb = require("./startup/db")
const summit = require("./routes/summit")
const image = require("./routes/image")
const path = require("path")
const cors = require("cors");

app.use(cors());
connectDb()
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'routes', 'public')));
app.get('/', async(req, res) => { res.send('Hello from Express!')})
app.use('/api/summit', summit)
app.use('/api/image', image)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});