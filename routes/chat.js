const express = require("express");
const router = express.Router();
const { Chat } = require('../models');
const moment = require('moment');

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
            speaker: "user",
            user_id: req.body.id,
            content: req.body.content,
        });

        res.status(400).send("saved successfully")

    } catch (error) {
      console.error(error);
    }
  });


module.exports = router;