const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes for managing members (Librarian and Member actions)
router.get('/view', auth, roleCheck('LIBRARIAN'), MemberController.viewMembers); // View all members (Librarian only)
router.put('/update/:id', auth, roleCheck('LIBRARIAN'), MemberController.updateMember); // Update member details (Librarian only)
router.delete('/remove/:id', auth, roleCheck('LIBRARIAN'), MemberController.removeMember); // Remove a member (Librarian only)
router.delete('/me', auth, roleCheck('MEMBER'), MemberController.deleteMyAccount); // Member deletes their own account

module.exports = router;