const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { isRequestValidated } = require('../validators/auth');

module.exports.signup = (req, res) => {
  User.findOne({email: req.body.email})
  .exec((error, user) => {
    if(user) return res.status(400).json({
                    message: `User already registered with ${req.body.email}`
                    })
    });

    //create an account
    const {firstName, lastName, email, password, role } = req.body;
    const _user = new User();

    if(role === 'user' || role === undefined){
      const _user  = new User({
        firstName,
        lastName,
        email,
        password,
        userName: `${firstName}.${lastName}`,
        role: 'customer'
      });
      saveAccount(_user, res);
    }

    if(role === 'admin'){
      const _user  = new User({
        firstName,
        lastName,
        email,
        password,
        userName: `${firstName}.${lastName}`,
        role: 'admin'
      });
      saveAccount(_user, res);
    }

    if(role === 'owner'){
      const _user  = new User({
        firstName,
        lastName,
        email,
        password,
        userName: `${firstName}.${lastName}`,
        role: 'business-owner'
      });
      saveAccount(_user, res, role);
    }
}

const saveAccount = (_user, res, role) => {
  _user.save((error, data) => {
  if(error) return res.status(400).json({
    message: `something went wrong:${error}`
  })
  if(data) return res.status(201).json({
    message: `${role} is registered successfuly..!`
    })
  });
}

module.exports.signin = (req, res) => {
  User.findOne({email: req.body.email})
  .exec((error, user) => {
    if(!user) return res.status(400).json({message: `Sorry!, this email doesn't exists`})

    if(user){
      if(user.authenticate(req.body.password)){
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETE, {expiresIn: '1hr'});

        const {_id, userName, firstName, lastName, email, role, fullName} = user;
        res.status(200).json({
          token: token,
          user: {_id, userName, firstName, lastName, email, role, fullName}
        })
      }else {
        return res.status(400).json({message: "username or password is incorrect, try again!!!"})
      }
    }
  });
}

//verification
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRETE);
  req.user = user;
  next();
  // jwt.decode(token, process.env.JWT_SECRETE)
}