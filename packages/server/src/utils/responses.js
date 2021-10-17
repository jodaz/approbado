export const paginatedQueryResponse = async (query, req, res) => {
    const { page, perPage } = req.query

    const { 
        total, 
        results: data 
    } = await query.page(page, perPage)

    return res.status(201).json({
        data,
        total
    })
}