
const chartQuery = {
    kills: './sql/players/charts/chart_kills.sql'
}

const chartPlayerQuery = {
    assists: './sql/players/charts/player_chart_assists.sql',
    dbnos: './sql/players/charts/player_chart_kills.sql',
    kills: './sql/players/charts/player_chart_dbnos.sql',
    revives: './sql/players/charts/player_chart_revives.sql'
}

const maplayers = {
    deaths: './sql/map/death_location_by_mode_map.sql',
    kills: './sql/map/kill_location_by_mode_map.sql'
}


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

const multiQueryExecute = (options) => {
    let {pool, queries, params, extra} = options
    let result = {}
    return new Promise((resolve, reject) => {
        (async () => {
            const client = await pool.connect()
            try {
                for (let key in queries) {
                    let response = await client.query(queries[key], params[key])
                    result[key] = (extra) ? response : response.rows
                }
                resolve(result)
            } catch(error) {
                reject(error)
            } finally {
                client.release()
            }
        })().catch(error => reject(error))
    })
}

const getChartQuery = (type) => {
    return chartQuery[type]
}

const getMapLayerQuery = (type) => {
    return maplayers[type]
}

const getPlayerChartQuery = (type) => {
    return chartPlayerQuery[type]
}

const convertLevel = (level) => {
    let newLevel
    switch (level) {
        case '0':
            newLevel = '256'
            break;
        case '1':
            newLevel = '512'
            break;
        case '2':
            newLevel = '1024'
            break;
        case '3':
            newLevel = '2048'
            break;
        case '4':
            newLevel = '4096'
            break;
        case '5':
            newLevel = '8192'
            break;
        default:
            newLevel = level
            break;
    }
    return newLevel
}

const convertNumber = (level) => {
    return (level < 10) ? `0${level}` : level
}
const _reduceCoordinate = ({x,y}) => {
    return [x/3200, -y/3200]
}

const geojson = (rows) => {
    const features = rows.map(item => {
        return {
            'geometry': {
                'coordinates': _reduceCoordinate(item),
                'type': 'Point'
            },
            'properties': item,
            'type': 'Feature'
        }
    })
    return {
        features,
        'type': 'FeatureCollection'
    }
}

const heat = (rows) => {
    return rows.map(item => {
        return [-item.y/3200, item.x/3200, 0.9]
    })
}

Object.assign(exports, {
    convertLevel,
    convertNumber,
    geojson,
    getChartQuery,
    getMapLayerQuery,
    getPlayerChartQuery,
    heat,
    multiQueryExecute,
    queryExecute
})