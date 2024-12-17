import mongoose from "mongoose";
const { Schema, Types: { ObjectId } } = mongoose;


await mongoose.connect("mongodb+srv://shreyashdeep20:tflPUrug0pfD57ra@cluster0.zzydh.mongodb.net/course-selling-app-database");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});


const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

// Define the purchase schema
const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

// Create models from the schemas
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

// Export the models
export {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
