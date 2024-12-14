const express = require('express')
const { sequelize } = require('./database/models')
app = express()
app.use(express.json())

app.use('/movie', require('./routes/moviesRouter'))
app.use('/showtime', require('./routes/showtimeRouter'))

app.listen(3002, async () => {
   console.log('Server is running')
   await sequelize.authenticate()
   console.log('Database connected \n')
   await sequelize.sync({ alter: false })
   console.log('Database synced \n')
})
