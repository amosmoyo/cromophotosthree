
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, "This-String-Should-Be-Longer-Than-You-Think");

    req.decodedTokenData = {
      email: decodedToken.email,
      id: decodedToken.id,
      name: decodedToken.name
    }

    next();

  }catch(e){

    res.status(401).json({
      message:"Authetification failed"
    })

  }
}
