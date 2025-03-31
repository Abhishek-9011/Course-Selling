import User from '../models/User.js';
import jwt from 'jsonwebtoken';



export const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new admin user
    const newAdmin = await User.create({
      firstName,
      lastName,
      email,
      password, // Storing password without hashing
      role: 'admin' // Force the role to be admin
    });

    // Remove password from response
    newAdmin.password = undefined;

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      data: {
        user: newAdmin,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create admin account',
      error: error.message
    });
  }
};

/**
 * Admin signin controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Response with logged in admin user and token or error
 */
export const adminSignin = async (req, res) => {
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

    // Verify this is an admin account
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin access required.'
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
      message: 'Admin logged in successfully',
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