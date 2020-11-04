const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  User.findOne({email: req.body.email})
  .exec((error, user) => {
    if(user) return res.status(400).json({
                    message: `User already registered with ${req.body.email}`
                    })
    });

    //create an account
    const {firstName, lastName, email, password, role } = req.body;

    if(role === 'user' || role === undefined){
      const _user  = new User({
        firstName,
        lastName,
        email,
        password,
        userName: `${firstName}.${lastName}`,
        role: 'customer'
      });
      saveAccount(_user, res, role);
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
      saveAccount(_user, res, role);
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

exports.signin = (req, res) => {
  User.findOne({email: req.body.email})
  .exec((error, user) => {
    if(!user) return res.status(400).json({message: `Sorry!, this email doesn't exists`})

    if(user){
      if(user.authenticate(req.body.password)){
        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRETE, {expiresIn: '1hr'});

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
