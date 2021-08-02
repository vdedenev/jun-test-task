const express =  require('express')
const config = require('config')
const typeorm = require('typeorm')

const app = express()

app.use(express.json())
app.use('/', require('./routes/task'))
app.use('/auth/', require('./routes/auth'))
app.use('/user/', require('./routes/task'))


const PORT = config.get('port')

async function start(){
    try{
        await typeorm.createConnection()
        console.log("db connected")
    }
    catch (e) {
        throw e.message
    }
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
}

start()
