const pool = require("../databaseConfig/db");


const getAllEmployees = async () => {
  const result = await pool.query("SELECT * FROM employees WHERE is_deleted = false");
  return result.rows;
};


const getEmployeeById = async (id) => {
  const result = await pool.query("SELECT * FROM employees WHERE id = $1 AND is_deleted = false", [id]);
  return result.rows[0];
};


const addEmployee = async (name, email, department) => {
  const result = await pool.query(
    "INSERT INTO employees (name, email, department) VALUES ($1, $2, $3) RETURNING *",
    [name, email, department]
  );
  return result.rows[0];
};


const updateEmployee = async (id, name, email, department) => {
  const result = await pool.query(
    "UPDATE employees SET name = $1, email = $2, department = $3 WHERE id = $4 RETURNING *",
    [name, email, department, id]
  );
  return result.rows[0];
};


const softDeleteEmployee = async (id) => {
  await pool.query("UPDATE employees SET is_deleted = true WHERE id = $1", [id]);
  return { message: "Employee deleted" };
};


module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  softDeleteEmployee,
};
