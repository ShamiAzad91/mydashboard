import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
      let token = req.headers['authorization']; // lowercase key

    if (!token) {
        return res.status(401).json({
            err: "",
            msg: "Please add the token",
            status: "failed"
        });
    }

    token = token.split(" ")[1]; // Extract Bearer token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                err: "",
                msg: "Please provide a valid token",
                status: "failed"
            });
        }

        req.user = decoded; // attach user info (id, email, etc.)
        next();
    });
};

export default verifyToken;
