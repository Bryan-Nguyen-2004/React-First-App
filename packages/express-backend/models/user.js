import mongoose from "mongoose";

/* The trim option removes whitespace from the beginning and end of the string,
The job field also has a custom validator function (as a method of the job field 
object using the shorthand syntax for defining methods in JavaScript object literals),
The {collection: "users_list"} option specifies the name of the MongoDB collection 
that will store the documents that conform to this schema. */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    job: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
  },
  { collection: "users_list" }
);

/* "User": name of database, UserSchema: schema to use for the users_list collection */
const User = mongoose.model("User", UserSchema);

export default User;