const express = require("express");
const router = express.Router();
const { Chat } = require('../models');


//mypage 출력
//날짜별로..!!
router.get("/:id", async (req, res) => {

    try{
        const content = await Chat.findAll({
            where: {user_id : req.params.id}
          })

        //console.log(content[0].id);
        res.send(content)

    } catch(err){
        console.log(err);
        next(err);
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