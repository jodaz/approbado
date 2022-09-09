export const paginatedQueryResponse = async (query, req, res) => {
    const { page, perPage } = req.query

    const {
        total,
        results: data
    } = await query.page(parseInt(page), parseInt(perPage))

    return res.status(200).json({
        data,
        total
    })
}

