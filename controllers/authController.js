const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

// REGISTER USER
const registerUser = async (req, res) => {
  console.log("REGISTER REQUEST RECEIVED");
  console.log(req.body);

  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.users.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

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

    const foundUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

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

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  console.log("FORGOT PASSWORD REQUEST RECEIVED");
  console.log(req.body);

  try {
    const { email } = req.body;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    res.json({
      message: "Password reset request received",
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:");
    console.log(error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  console.log("UPDATE PROFILE REQUEST");

  try {
    const { id, name, phone, occupation } = req.body;

    const user = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        phone,
        occupation,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR");
    console.error(err.message);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};


// EXPORT CONTROLLERS
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  updateProfile,
};