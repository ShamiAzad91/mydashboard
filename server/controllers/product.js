import Product from "../model/Product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, userId, company } = req.body;
    // console.log("REQUEST BODY ===>", req.body);
    
    if (!name || !price || !category || !userId || !company) {
      return res
        .status(422)
        .json({ err: "", msg: "All fields are required", status: "failed" });
    }

    const existingProduct = await Product.findOne({name});
    if(existingProduct){
        return res.status(400).json({err:'',msg:'product already in DB',status:'failed'})
    }
    const product = new Product({name,price,category,userId,company});
   let result =   await product.save();

   return res.status(201).json({result,err:'',msg:'product created Successfully',status:true})


  } catch (err) {
    return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      });
  }
};

export const getAllProduct = async(req,res)=>{
  try {

 const products = await Product.find({}).sort({ createdAt: -1 });
    if(products.length === 0){
      return res.status(400).json({err:'',msg:'no product found in DB',status:'failed'})
    }
    return res.status(200).json({err:'',msg:'successfully fetched the product',product:products,status:'success'})
    
  } catch (err) {
      return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      });
  }
}




export const singleProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ 
        err: "Product not found", 
        status: "failed" 
      });
    }


    return res.status(200).json({
      msg: "Product fetched successfully",
      status: "success",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      err: error.message,
      status: "failed"
    });
  }
};

export const updateProduct = async(req,res)=>{
  try {
    const {id} = req.params;
     // Check empty body
    if (!Object.values(req.body).length) {
      return res.status(400).json({
        status: "failed",
        msg: "No data provided for update",
      });
    }
        const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // returns updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({
        status: "failed",
        msg: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "Product updated successfully",
      product: updatedProduct
    });
    
  } catch (err) {
     return res
      .status(500)
      .json({
        err: err.message,
        msg: "something went wrong",
        status: "failed",
      });
  }
}

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        err: "",
        msg: "No product found with this ID",
        status: "failed",
      });
    }

    // Delete product
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      err: "",
      msg: "Product deleted successfully",
      status: "success",
    });

  } catch (err) {
    return res.status(500).json({
      err: err.message,
      msg: "Something went wrong",
      status: "failed",
    });
  }
};
