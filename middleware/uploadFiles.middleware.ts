let 
    multer = require('multer'),
    uuidv4 = require('uuid/v4');
const DIR = './public';

// uploading files


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log(file);
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
});

export default upload
