import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongo db connected successfully `)
    }catch(e){
        console.log(`ERROR : ${e}`);
    }
}



export default connectDB;