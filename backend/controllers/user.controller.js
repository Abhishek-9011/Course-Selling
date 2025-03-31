import User from '../models/User.js';
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password, // Storing password without hashing
      role: role || 'student' // Default to student if role not provided
    });

    // Remove password from response
    newUser.password = undefined;

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: newUser,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create account',
      error: error.message
    });
  }
};

/**
 * User signin controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with logged in user and token or error
 */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user with email and include password field
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches (direct comparison)
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Remove password from response
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to sign in',
      error: error.message
    });
  }
};