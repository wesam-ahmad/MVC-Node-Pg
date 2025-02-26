const employeeModel = require("../models/employeeModel");


const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.getEmployeeById(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const employee = await employeeModel.addEmployee(name, email, department);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department } = req.body;
    const updatedEmployee = await employeeModel.updateEmployee(id, name, email, department);
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await employeeModel.softDeleteEmployee(id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };
