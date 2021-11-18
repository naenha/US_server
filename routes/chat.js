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
          where: {user_id : user_id},
          attributes: ["createdAt"]
        })

      const date_list = []; 
      const data = [];

      //해당 id가 쓴 일기가 존재하면
      if (content.length != 0 ){
          for (var i = 0; i < content.length; i++){
            var new_month = moment(content[i].createdAt).format('MM');
            if (new_month === month){
              date_list.push(content[i].createdAt);
            }
          }
          
          // 그 달에 쓴 일기가 있는 경우
          if (date_list.length != 0){
            for (var i = 0; i < date_list.length; i++){
              var date_formatted = moment(date_list[i]).format('YYYYMMDD');
              data.push(date_formatted);
            }
            
            //중복 제거
            const set = Array.from(new Set(data));
            res.send(set);
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
            user_id: req.body.user_id,
            content: req.body.content,
            question: req.body.question
        });

        res.send("saved successfully")

    } catch (error) {
      console.error(error);
    }
  });


module.exports = router;