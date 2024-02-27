const axios = require("axios");
exports.getDivisions = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://bdapi.p.rapidapi.com/v1.1/divisions",
    headers: {
      "X-RapidAPI-Key": "e77880614cmshdcdda9cbe1b9106p16b5d3jsn351c289b4821",
      "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      status: "success",
      data: response.data?.data,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getDistrictsByDivisions = async (req, res) => {
  let district = req.params.district;
  const options = {
    method: "GET",
    url: `https://bdapi.p.rapidapi.com/v1.1/division/${district}`,
    headers: {
      "X-RapidAPI-Key": "e77880614cmshdcdda9cbe1b9106p16b5d3jsn351c289b4821",
      "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      status: "success",
      data: response.data?.data,
    });
  } catch (error) {
    console.error(error);
  }
};
