const { Op } = require('sequelize')

const getFilterQuery = async (query) => {
    if (query.search && query.search !== '') {
        query[Op.or] = query.searchColumns?.map((column) => {
            return {
                [column]: {
                    [Op.iLike]: `%${query.search.trim()}%`,
                },
                // [column]: {
                //   $regex: query.search
                //     ?.replace(/[-[\]{}()*+?.,\\/^$|#]/g, "\\$&")
                //     .trim(),
                //   $options: "i",
                // },
            }
        })
    }
    delete query.search
    delete query.searchColumns
    return query
}

module.exports = {
    getFilterQuery,
}
