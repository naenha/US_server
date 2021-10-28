const express = require('express')
const sequelize = require('sequelize')
const app = express()
const port = 8080


app.get('/', (req, res) => {
  res.send('Hello World!')
})


/* 
sequelize.sync({ force: false })
    .then(() => {
      console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
      console.error(err);
    });

*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


