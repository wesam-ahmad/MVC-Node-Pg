const express = require("express");
const router = express.Router();
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");

router.get("/", getEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
