const { getAll, getDetail, insertBook, editBook, deleteBook, searchBook } = require("../models/Book")
const helper = require("../helpers/message")

module.exports = {
	getAllBook: async (req, res) => {
        const show = req.query.show
        const page = req.query.page
        const sort = (req.query.sort == 'latest') ? 'DESC' : ''
        const search = req.query.search
        let thisPage = (show * page) - show
		try {
            const result = await getAll(show, thisPage, sort, search)
            if(result.length > 0){
                return helper.response(res, 'success' , result, 200)
            }
            return helper.response(res, 'failed' , 'Data not found', 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},

	detailBook: async (req, res) => {
        const id = req.params.id
		try {
            const result = await getDetail(id)
            if(result.length > 0){
                return helper.response(res, 'success' , result, 200)
            }
            return helper.response(res, 'failed' , 'Data not found', 200)
        } catch (error) {
            console.log(error)
                return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},


	createBook: async (req, res) => {
		const setData = req.body
        try {
            const result =  await insertBook(setData)
            const data = await getDetail(result.id)
            return helper.response(res, 'success' , data, 201)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    editBook : async (req, res) => {
        const setData = req.body
        const id = req.params.id
        try {
            const result = await editBook(setData, id)
            const data = await getDetail(id)
            if(result.affectedRows == 1){
                return helper.response(res, 'success' , data, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    deleteBook : async (req, res) => {
        const id = req.params.id
        try {
            const result = await deleteBook(id)
            if(result.affectedRows == 1){
                return helper.response(res, 'success' , `Data id ${id} berhasil di hapus`, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
            
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},
	
	searchBook : async (req, res) => {
        const keyword = req.query.keyword
        try {
            const result = await searchBook(keyword)
            if(result.length  > 0){
                return helper.response(res, 'success', result, 200)
            }
            return helper.response(res, 'failed', 'Data not found', 404)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	}
};
