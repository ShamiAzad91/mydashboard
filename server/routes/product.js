import express from "express";
import verifyToken from "../middleware/token.js";
import { addProduct,updateProduct,getAllProduct,removeProduct,singleProductDetails} from "../controllers/product.js";

const router = express.Router();

router.post("/add",verifyToken,addProduct);

router.get("/all",getAllProduct);

router.get("/single/:id",singleProductDetails);
router.put("/update/:id",verifyToken,updateProduct);
router.delete("/remove/:id",verifyToken,removeProduct);



export default router