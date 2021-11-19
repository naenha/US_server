const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Share, User, Chat } = require('../models');
const moment = require('moment');

//공유하기 기능
router.post('/', async (req, res) => {

    try {
        email = req.body.email;
        const user = await User.findOne({
            where: {email : email},
        })
        
        if (user){
            const id = user.id;
            if (id === req.body.user_id){
                res.send("자기 자신에게 공유할 수 없습니다.");
            }
            else{
                await Share.create({
                    sending_user: req.body.user_id,
                    getting_user: id,
                    date: req.body.date
                });

                res.send("saved successfully")
            }
        }
        else{
            res.send("no email");
        }

    } catch (error) {
      console.error(error);
    }
  });


//나에게 공유된 일기 보기(특정 날짜)
router.get('/', async (req, res) => {

    try {
        const date = req.query.date;
        const share = await Share.findAll(
            {
                where: { [Op.and]: [{getting_user: req.query.user_id}, {date: date}]},
                attributes: ["sending_user", "date"]
            });
        
        //내 아이디와 해당날짜에 공유된 일기가 있다면
        if (share.length != 0) {

            const chat_list = [];

            for (var i = 0; i < share.length; i++){


                var chat = await Chat.findAll({
                    where: { user_id: share[i].sending_user },
                })


                for (var j = 0; j < chat.length; j++){
                    if (moment(chat[j].createdAt).format('YYYYMMDD') === date){
                        chat_list.push(chat[j]);
                    }
                }

            }
            res.send(chat_list); 
        }    
        else {
            res.send("no shared diary")
        }
    } catch (error) {
      console.error(error);
    }
  });


// 공유된 일기가 있는지
  router.get("/all", async (req, res) => {

    try{
        // const date = req.query.date;
        // const month = date.substring(4,6);
        const user_id = req.query.user_id;

        const share = await Share.findAll(
            {
                where:  {getting_user: user_id },
                attributes: ["date"]
            });

        const date_list = []; 
        // const data = [];
  
        //나에게 공유된 일기가 존재하면
        if (share.length != 0 ){
            for (var i = 0; i < share.length; i++){
                //console.log(String(share[i].date).substring(4,6), month)
            //   if (String(share[i].date).substring(4,6) == month){
            //     date_list.push(share[i].date);
            //   }
                date_list.push(share[i].date);
            }
            const set = Array.from(new Set(date_list));
            res.send(set);
            // 그 달에 쓴 일기가 있는 경우
            // if (date_list.length != 0){
            //   for (var i = 0; i < date_list.length; i++){
            //     data.push(date_list[i]);
            //   }
              
            //   //중복 제거
            //   const set = Array.from(new Set(data));
            //   res.send(set);
            // }
            // else {
            //   res.send("no diary this month")
            // }
  
        }
        else {
          res.send("no shared diary")
        }
  
  
    } catch(err){
        console.log(err);
    }
    
  });

  
module.exports = router;