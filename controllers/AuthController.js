const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');

// Sign-up (both Librarian and Member)
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    user = new User({
      username,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login and generate JWT token
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role); // Use the utility function to generate the token

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
