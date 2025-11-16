import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    }


},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
export default Product;