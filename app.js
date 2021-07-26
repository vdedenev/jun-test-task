const express =  require('express')
const config = require('config')

const app = express()

const PORT = config.get('port')

async function start(){
    try{
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    }
    catch (e) {
        throw e.message
    }
}

start()