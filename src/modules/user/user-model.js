import mongoose from "mongoose";
const Schema = mongoose.Schema
//@ts-ignore
const userSchema = new Schema({
  firstName : String,
  lastName : String,
  email : String,
  password:String,
  DOB: String,
  Gender: String,
  Biography: String,
  profilePicture: {
    type: String,
    default:
      "https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg",
  },
  coverPicture: {
    type: String,
    default:
      "https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: { type: Array, default: [] },
  city: { type: String, max: 50, default: "" },
  from: { type: String, max: 50, default: "" },
  relationShip: { type: String, default: "Single" },
  
});

const user = mongoose.model("user", userSchema);
export { user };