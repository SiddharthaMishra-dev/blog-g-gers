import mongoose from "mongoose";

const Schema=mongoose.Schema

const userSchema=new Schema({
    userName:String,
    password:String,
})

const User=mongoose.models.user || mongoose.model('user',userSchema)

export default User