import multer from "multer";

export const upload = multer({ dest: '/usr/src/app/images' }).single("image");