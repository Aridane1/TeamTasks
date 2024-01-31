import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/images");
  },
  filename: (req, file, cb) => {
    let fileType = "";
    if (file.mimetype == "image/gif") fileType = "gif";
    if (file.mimetype == "image/png") fileType = "png";
    if (file.mimetype == "image/jpg") fileType = "jpg";
    if (file.mimetype == "image/svg") fileType = "svg";
    cb(null, "image-" + Date.now() + "." + fileType);
  },
});

export const multerUltis = multer({ storage: storage });
