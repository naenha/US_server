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
        const diary = await Share.findAll(
            {
                where: { [Op.and]: [{getting_user: req.query.user_id}, {date: date}]},
                attributes: ["sending_user", "date"]
            });
        
        if (diary.length != 0 ) {
            for (var i = 0; i < diary.length; i++){
                const conv = await Chat.findOne({
                    where: { [Op.and]: [{id: diary[i].sending_user}, {date: diary[i].date}]},
                    attributes: ["sending_user", "date"]
                })
            }
        }
        else {
            res.send("no diary")
        }
                

    } catch (error) {
      console.error(error);
    }
  });


  
module.exports = router;