const User = require('../models/User');

// View all members (Librarian only)
exports.viewMembers = async (req, res) => {
  try {
    const members = await User.find({ role: 'MEMBER' });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update member details (Librarian only)
exports.updateMember = async (req, res) => {
  const { username, password } = req.body;

  try {
    const member = await User.findById(req.params.id);
    if (!member || member.role !== 'MEMBER') {
      return res.status(404).json({ message: 'Member not found' });
    }

    if (username) member.username = username;
    if (password) member.password = await bcrypt.hash(password, 10);

    await member.save();
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a member (Librarian only)
exports.removeMember = async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member || member.role !== 'MEMBER') {
      return res.status(404).json({ message: 'Member not found' });
    }

    await member.remove();
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Member deletes their own account
exports.deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    await user.remove();
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
