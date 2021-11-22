const multer = require('multer')
const { resolve } = require('path')
const { existsSync, unlink } = require('fs')

const diskStorage = multer.diskStorage({
	destination: (req, file, done) => {
		if (!file) return done(new Error('Upload file error'), null)

		const fileExits = existsSync(resolve(process.cwd(), `uploads/${file.originalname}`))
		if (!fileExits) return done(null, resolve(process.cwd(), 'uploads'))

		unlink(resolve(process.cwd(), `uploads/${file.originalname}`), (error) => {
			if (error) return done(error)
			return done(null, resolve(process.cwd(), 'uploads'))
		})
	},
	fileFilter: (req, file, callback) => {
		let { mimetype } = file;
		if (mimetype.startsWith('image')) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	}
})

const fileUpload = multer({ storage: diskStorage, limits: 1000000 })

module.exports = fileUpload