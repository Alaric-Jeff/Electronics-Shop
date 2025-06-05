import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Dynamic destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads';

    switch (file.fieldname) {
      case 'productImage':
        uploadPath = 'uploads/products';
        break;
      case 'profilePicture':
        uploadPath = 'uploads/users';
        break;
      case 'adminDoc':
        uploadPath = 'uploads/admin';
        break;
      default:
        uploadPath = 'uploads/others';
    }

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
  
});

export const upload = multer({ storage });
