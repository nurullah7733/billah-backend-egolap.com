const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imgs");
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Unsupported file format", false);
    // cb(new Error("Wrong extension type"), false);
  }
};

exports.uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

exports.productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  req.files.map(async (file) => {
    try {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`${__dirname}/../public/images/${file.filename}`);
      // fs.unlinkSync(`../public/images/${file.filename}`);
    } catch (error) {
      console.log(error);
    }
  });

  next();
};
