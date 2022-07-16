import path from 'path'
import multer from 'multer'
import fs from 'fs-extra'

// type="multipart/form-data"
export default class FileMiddleware {
  // public static readonly memoryLoader = multer({
  //   storage: multer.memoryStorage(),
  //   limits: {
  //     fileSize: 2097152 // 2 MByte
  //   }
  // })
  public static readonly PicturesDiskLoader = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        const pathDir = path.join(__dirname, '../../static/products_pic')
        fs.mkdirsSync(pathDir)
        callback(null, pathDir)
      }
    }),
    limits: {
      fileSize: 30108864 // 26 MByte
    }
  })
}
