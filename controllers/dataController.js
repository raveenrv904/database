const { StatusCodes } = require("http-status-codes");
const { pool } = require("../db/connect");
const CustomAPIError = require("../errors");

const createData = async (req, res) => {
  const { empid, name, dob, experience, salary, dept, address } = req.body;

  if (!empid || !name || !dob || !experience || !salary || !dept || !address) {
    throw new CustomAPIError.NotFoundError(
      "Empid, Name, Date of Birth, Experience, Salary, Department, Address should be Address"
    );
  }

  const connection = await pool.getConnection();
  await connection.query(
    "INSERT INTO data (empid, name, dob, salary, experience, address, dept) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [empid, name, dob, salary, experience, address, dept]
  );
  connection.release();
  res.status(StatusCodes.CREATED).json({ msg: "Success" });
};

const getAllData = async (req, res) => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query("SELECT * FROM data");
  connection.release();
  res.status(StatusCodes.OK).json({ count: rows.length, rows });
};

const getSingleData = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    throw new CustomAPIError.NotFoundError("Id not Found");
  }

  const connection = await pool.getConnection();
  const [rows] = await connection.query(`SELECT * FROM data WHERE id=${id}`);

  if (!rows) {
    throw new CustomAPIError.BadRequestError(`No data with id: ${id}`);
  }

  connection.release();
  res.send({ rows });
};

const deleteData = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new CustomAPIError.NotFoundError("Id not Found");
  }
  const connection = await pool.getConnection();
  const [rows] = await connection.query(`DELETE FROM data WHERE id = ?`, [id]);
  if (!rows) {
    throw new CustomAPIError.BadRequestError(`No data with id: ${id}`);
  }
  connection.release();

  res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
};

module.exports = {
  createData,
  getAllData,
  getSingleData,
  deleteData,
};
