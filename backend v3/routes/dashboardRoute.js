const express = require("express");
const {
  createIncome,
  createExpences,
  getIncome,
  getExpence,
} = require("../controllers/dashboardController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/income")
.get(isAuthenticatedUser, getIncome)
.post(isAuthenticatedUser, createIncome);

router
  .route("/expence")
  .get(isAuthenticatedUser, getExpence)
  .post(isAuthenticatedUser, createExpences);

module.exports = router;
