const express = require("express");
const router = express.Router();

const {
  createData,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
} = require("../controllers/dataController");

router.route("/").get(getAllData).post(createData);
router.route("/getSingleData").get(getSingleData);
router.route("/updateData").patch(updateData);
router.route("/deleteData").delete(deleteData);

module.exports = router;
