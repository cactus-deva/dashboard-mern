import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    avatar: {type: String, require: true},
    allProperties: [{type: mongoose.Schema.Types.ObjectId, ref: "Property"}],
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel