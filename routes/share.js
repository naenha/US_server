const express = require("express");
const router = express.Router();
const { Share, User } = require('../models');
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
            if (id === req.body.id){
                res.send("자기 자신에게 공유할 수 없습니다.");
            }
            else{
                await Share.create({
                    sending_user: req.body.id,
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


module.exports = router;