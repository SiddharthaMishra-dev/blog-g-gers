// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   userName: String,
//   password: String,
// });

// const User = mongoose.models.user || mongoose.model("user", userSchema);

// export default User;

export interface Blog {
  content: string;
  hashtags: string;
  likes: string[];
  title: string;
  userId: string;
  _id: string;
  username: string;
}
