const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv')
dotenv.config();
const userRoutes = require("./routes/user")
const userfiles=require("./routes/upload")
const userpost=require("./routes/post")
const userReact = require("./routes/react")
app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
const options = {
    origin: "http://localhost:3000",
    useSucessStatus: 200
}
app.use(cors(options));

app.use(express.json())
mongoose.connect(process.env.DATABASE_STRING, {
    useNewUrlParser: true
})
    .then(() => console.log("sucessfully connected"))
    .catch((err) => console.log("not connected", err))
const PORT = process.env.PORT || 8000

app.use('/', userRoutes,userfiles,userpost,userReact)
app.listen(PORT, () => {
    console.log(`sever is running at ${PORT}....`)
})