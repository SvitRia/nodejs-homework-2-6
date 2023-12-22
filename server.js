import mongoose from "mongoose";
import app from "./app.js";

// tefSQ8YDkWk9vBIL //mongodb parol
const DB_HOST = "mongodb+srv://SvitlanaRia:tefSQ8YDkWk9vBIL@cluster0.wzmpmfm.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
  })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
})


