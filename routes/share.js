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
//미완!!!!
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

            const name_list = [];
            const chat_list = [];
            for (var i = 0; i < share.length; i++){
                var name = await User.findOne({
                    where: { id: share[i].sending_user },
                    attributes: ["nickname"]
                })
                name_list.push(name);

                var chat = await Chat.findAll({
                    where: { user_id: share[i].sending_user },
                })
                //var new_date = moment(chat[i].createdAt).format('YYYYMMDD');
                //console.log(chat.length);
                //console.log(chat[i].createdAt)
                for (var j = 0; j < chat.length; j++){
                    if (moment(chat.createdAt).format('YYYYMMDD') === date){
                        chat_list.push(chat);
                    }
                }
            }

            res.send(chat);
            
            
        }
        else {
            res.send("no shared diary")
        }
                

    } catch (error) {
      console.error(error);
    }
  });


  
module.exports = router;