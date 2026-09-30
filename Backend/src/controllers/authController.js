const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Send OTP
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ message: 'Please provide a phone number' });
  }

  try {
    // Generate 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ phone });

    if (!user) {
      // Register minimal user
      user = await User.create({ phone, name: 'User' });
    }

    user.otp = { code: otp, expiresAt };
    await user.save();

    // In a real app, send OTP via Twilio here
    // await twilioClient.messages.create({ ... })

    res.status(200).json({ success: true, message: 'OTP sent successfully', devOtp: otp });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user || !user.otp || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP
    user.otp = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Google Sign In
exports.googleSignIn = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { email, name, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Google authentication failed', error: error.message });
  }
};
