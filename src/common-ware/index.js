const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRETE)
    req.user = user;
    next();
  }
  else {
    res.status(400).json({Access_Denied: "You must signin first"})
  }
}

//middleware to instersect the categories creation to only the admin
exports.adminMiddleware = (req, res, next) => {
  if(req.user && req.user.role !== 'admin'){
    return res.status(400).json({message: "only Admin, or business-owner can add categories"})
  }
  next();
}

exports.userMiddleware = (req, res, next) => {
  if(req.user.role !== 'customer'){
    return res.status(400).json({message: "User cannot create category"})
  }
  next();
}