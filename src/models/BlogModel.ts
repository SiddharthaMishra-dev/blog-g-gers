import mongoose from "mongoose";

const Schema=mongoose.Schema

const blogSchema=new Schema({
    title:String,
    hashtags:String,
    content:String
})

const Blog =mongoose.model('blog',blogSchema)

export default Blog