const express = require("express");
const router = express.Router();
const { Chat } = require('../models');
const moment = require('moment');

//그 달 일기
router.get("/all", async (req, res) => {

  try{
      const date = req.query.date;
      const month = date.substring(4,6);
      const user_id = req.query.user_id;

      const content = await Chat.findAll({
          where: {user_id : user_id}
        })

      if (content.length != 0 ){
        const new_month = moment(content[0].createdAt).format('MM');
    
        if (new_month === month){
            res.send(content);
        }
        else {
          res.send("no diary this month")
        }

      }
      else {
        res.send("no diary with this user_id")
      }


  } catch(err){
      console.log(err);
  }
  
});

//url로 넘어온 date와 일치하는 일기를 보내준다.
router.get("/", async (req, res) => {

    try{
        const user_id = req.query.user_id;
        const date = req.query.date 

        const content = await Chat.findAll({
            where: {user_id : user_id}
          })

        if (content.length != 0 ){
          const new_date = moment(content[0].createdAt).format('YYYYMMDD');
        
          if (new_date === date){
              res.send(content);
          }
          else {
            res.send("no diary with this date")
          }

        }
        else {
          res.send("no diary with this user_id")
        }
  

    } catch(err){
        console.log(err);
    }
    
});


//사용자의 대답 저장
router.post('/', async (req, res) => {

    try {
        await Chat.create({
            user_id: req.body.id,
            content: req.body.content,
            question: req.body.question
        });

        res.send("saved successfully")

    } catch (error) {
      console.error(error);
    }
  });


module.exports = router;