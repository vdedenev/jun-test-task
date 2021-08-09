const express =  require('express')
const config = require('config')
const typeorm = require('typeorm')
const path = require("path");

const app = express()

app.use(express.json())
app.use('/', require('./routes/task'))
app.use('/auth/', require('./routes/auth'))
app.use('/user/', require('./routes/user'))

if (process.env.NODE_ENV === 'production') {
    console.log('123')
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


//const PORT = config.get('port')

async function start(){
    try{
        await typeorm.createConnection()
        console.log("db connected")
    }
    catch (e) {
        throw e.message
    }
    app.listen(process.env.PORT || 3000, () => console.log(`App has been started on port ${process.env.PORT || 3000}`))
}

start()
