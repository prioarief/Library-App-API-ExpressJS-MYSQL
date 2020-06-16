const expresss = require("express")
const router = expresss.Router()
const tokenvalidation = require("../middleware/checkToken")
const authorRoute = require("./author")
const genreRoute = require("./genre")
const authRoute = require("./auth")
const bookRoute = require("./book")
const roleRoute = require("./role")


router.use('/api/authors', tokenvalidation,  authorRoute)
router.use('/api/genres', tokenvalidation,  genreRoute)
router.use('/api/books', tokenvalidation,  bookRoute)
router.use('/api/roles',  roleRoute)
router.use('/api/auth', authRoute)

module.exports = router
