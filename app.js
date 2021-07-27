const express =  require('express')
const config = require('config')
const typeorm = require('typeorm')

const app = express()

app.use('/login', require('./routes/auth'))
app.use('/', require('./routes/task'))
app.use('/:anything', function(req, res){
     res.redirect('/404')
 })

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
