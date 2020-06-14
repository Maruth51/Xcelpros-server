var express = require("express");
var router = express.Router();
const createError = require("http-errors");
const faker = require("faker");
const Credantial = require("../models/credential");
const User = require("../models/user");
const { compareHash } = require("../services/hashinServices");
const { createToken } = require("../services/jwtServices");
const createHttpError = require("http-errors");

/* GET home page. */
router
  .get("/", (req, res) => {
    res.send("home");
  })
  .get("/users", async (req, res,next) => {
    try{
      const users = await User.findAll({raw:true})
      res.json({users})
    }catch(e){
      next(createHttpError(500))
    }
  })
  .post("/signup", async (req, res, next) => {
    try {
      const isEmailexist = await User.findOne({
        where: { email: req.body.email },
        raw: true
      });
      console.log("email exist",isEmailexist)
      if (isEmailexist) {
        
        next(createHttpError(403,"Email Id exist already"))
      } else {
        await Credantial.create({
          email: req.body.email,
          password: req.body.password,
        });
        const user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          avatar: faker.image.business(),
        });
        console.log(user.toJSON());
        res.send(user.toJSON());
      }
    } catch (e) {
      console.log(e)
      next(createError(500, "Interal server error"));
    }
  })
  .post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const credential  = await Credantial.findOne({ where: { email: email },
        attributes: [["password", "hashPassword"]],raw:true
      });
      if (credential && compareHash(password, credential.hashPassword)) {
        const user = await User.findOne({ where: { email: email }, raw: true });
        const jwt = createToken({ email });
        res.status(200).send({ token: jwt, user });
      } else {
        //res.status(401).send("Incorrect username or password")
        next(createError(401, "Incorrect username or password"));
      }
    } catch (e) {
      console.log(e);
      next(createError(500, "Interal server error", e));
    }
  });

module.exports = router;
