const User = require("./user.model");
const jwt = require("jsonwebtoken");
const uuid = require("uuid-random");

async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const user = await User.create({
      profile_id: uuid(),
      firstName,
      lastName,
      email,
      password,
    });
    console.log("---User Created Successfully---");
    return res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.password || !user.validPassword(password)) {
      return res.status(400).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h", issuer: user.email }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    console.log("---User Login Successful---");
    return res.status(200).send(userResponse);
  } catch (err) {
    console.log("An Error Occured");
    return res.status(500).send("Internal Server Error");
  }
}

async function logOut(req, res) {
  try {
    res.clearCookie("access_token");
    return res.status(200).send("Logout Successfully");
  } catch (err) {
    console.log("An Error Occured while logging out");
    return res.status(500).send(err);
  }
}

async function findUser(id) {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (err) {
    console.log("Cannot find the user--->", err);
  }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.logOut = logOut;
module.exports.findUser = findUser;
