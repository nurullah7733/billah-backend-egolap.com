const fs = require("fs");

// Load data
const divisions = JSON.parse(
  fs.readFileSync(__dirname + "/jsonFiles/divisions.json", "utf8")
);
const districts = JSON.parse(
  fs.readFileSync(__dirname + "/jsonFiles/districts.json", "utf8")
);
const upazilas = JSON.parse(
  fs.readFileSync(__dirname + "/jsonFiles/upazilas.json", "utf8")
);

// Get all divisions
exports.getAllDivisionsController = async (req, res) => {
  return res.status(200).json({ status: "success", data: divisions });
};
// Get districts by division ID
exports.getDistrictsController = async (req, res) => {
  const divisionId = req.params.id;
  const divisionDistricts = districts.filter(
    (district) => district.division_id === divisionId
  );

  if (divisionDistricts.length > 0) {
    return res.status(200).json({ status: "success", data: divisionDistricts });
  } else {
    return res
      .status(400)
      .json({ status: "fail", data: "Districts not found!" });
  }
};
// Get upazilas by districts ID
exports.getUpazilasController = async (req, res) => {
  const districtId = req.params.id;
  const districtUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === districtId
  );

  if (districtUpazilas.length > 0) {
    return res.status(200).json({ status: "success", data: districtUpazilas });
  } else {
    return res
      .status(400)
      .json({ status: "fail", data: "Upazilas not found!" });
  }
};
