import mongoose from "mongoose";

const DBConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));
};

export default DBConnect;
