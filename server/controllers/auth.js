import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ err: "All fields are required" });
    }
    //check length of pass
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters" });
    }

    //step 2 check user already exist or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      // console.log("hii", userExist);

      return res.status(409).json({ err: "user already exist in DB" });
    }

    // Step 3: Save new user
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();
    // Step 4: Send success response

    res.status(201).json({
      message: "you are registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ err: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ err: "user not found!Please register" });
    }

    //  Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({ err: "Invalid credentials" });
    }

    const token = jwt.sign({id:userExist._id,email:userExist.email},process.env.JWT_SECRET,{expiresIn:'1d'})

    return res.status(200).json({
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
      token,
      message: "You are successfully login",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};
