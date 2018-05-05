


const queryExecute = (options) => {
    let {pool, query, params, extra} = options
    return new Promise((resolve, reject) => {
        (async () => {
            const client = await pool.connect()
            try {
                const response = await client.query(query, params)
                resolve(
                    (extra) ? response : response.rows
                )
            } catch(error) {
                reject(error)
            } finally {
                client.release()
            }
        })().catch(error => reject(error))
    })
}


Object.assign(exports, {queryExecute})