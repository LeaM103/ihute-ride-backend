const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

// REGISTER USER
const registerUser = async (req, res) => {
  console.log("REGISTER REQUEST RECEIVED");
  console.log(req.body);

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await prisma.users.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Remove password before sending response
    const { password: _, ...user } = newUser;

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error("REGISTER ERROR:");
    console.error(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  console.log("LOGIN REQUEST RECEIVED");
  console.log(req.body);

  try {
    const { email, password } = req.body;

    // Find user
    const foundUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in .env");
    }

    // Generate token
    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:");
    console.error(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};