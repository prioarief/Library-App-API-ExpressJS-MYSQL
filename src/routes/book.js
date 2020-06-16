const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload")
const checkRole = require("../middleware/checkRole")
const { getAllBook , createBook, detailBook, editBook, deleteBook, searchBook } = require("../controllers/BookController");
const transaction = require("../controllers/TransactionController");

router.get("/", getAllBook);
router.get("/search/", searchBook);
router.get("/borrowed/:id", transaction.borrowed);
router.get("/returned/:id", transaction.returned);
router.get("/:id", detailBook);
router.post("/", checkRole.checkRole, upload.single('image'), createBook);
router.put("/:id", checkRole.checkRole, upload.single('image'), editBook);
router.delete("/:id", checkRole.checkRole, deleteBook);

module.exports = router;
