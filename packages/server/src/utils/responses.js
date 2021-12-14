export const paginatedQueryResponse = async (query, req, res) => {
    const { page, perPage } = req.query

    const {
        total,
        results: data
    } = await query.page(parseInt(page), parseInt(perPage))

    //console.log(await query.toKnexQuery().toSQL())

    return res.status(200).json({
        data,
        total
    })
}

