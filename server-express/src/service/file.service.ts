import logger from '@/logger'
import fs from 'fs-extra'
import { UploadedFile } from 'express-fileupload'

const showLog = process.env.SHOW_LOG_WRITE_FILE || false

export const delFile = async (
  delPic: boolean,
  fileName: string,
  pathDir: string
): Promise<string> => {
  let name = fileName || ''
  if (delPic) {
    if (name && name.length > 2) {
      if (showLog) {
        logger.info('удаляем ' + name)
      }
      await fs.remove(pathDir + '/' + name)
      name = ''
    }
  }
  return name
}

export const saveFile = async (
  id: number,
  pathDir: string,
  file: UploadedFile,
  fileName: string,
  fileName2: string
): Promise<string> => {
  let name = ''
  if (file && file.name.length > 2) {
    await delFile(true, fileName, pathDir) // вдруг тип другой был
    const splitName = file.name.split('.') || ['']
    const extension = splitName[splitName.length - 1] || 'jpg'
    name = `${id}_${fileName2}.${extension}`
    if (showLog) {
      logger.info('сохраняем ' + name)
    }
    await file.mv(pathDir + '/' + name)
  } else if (fileName.split('.').length > 1) {
    name = fileName
  }
  return name
}
