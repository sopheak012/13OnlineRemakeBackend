const {
  signup,
  login,
  getUsers,
  deleteAllUsers,
  getUsername,
} = require("../controllers/userControllers");

const express = require("express");

const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/signup", signup);
router.get("/:username", getUsername);

router.get("/DELETEALLUSERS", deleteAllUsers);

module.exports = router;
