const User = require("../models/user");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // Parsing the user input
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      return res.status(400).send("All input is required");
    }

    // Validate whether the user already exists in the database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists. Please login instead.");
    }

    // Encrypt the user password
    let encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create the user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    // Save the user token
    user.token = token;

    // Return the new user token
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    // Parse the user input
    const { email, password } = req.body;

    // Validate the user has provided necessary inputs
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // Validate if user exists in our database
    const user = await User.findOne({ email });

    // Perform login and create a new token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // Save the new user token
      user.token = token;

      // Return the token with a 200-status
      return res.status(200).json({ token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
