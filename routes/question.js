const express = require("express");
const router = express.Router();
const { Question, Chat } = require('../models');
const Sequelize = require('sequelize');


//랜덤으로 질문을 보내준다.
//몇번 유저에게 보낸 질문인지
router.get('/:id', async (req, res, next) => {

    try {
        const question = await Question.findAll(
            {
              order: Sequelize.literal('rand()'), 
              limit: 1
            });

        await Chat.create({
            speaker: "bot",
            user_id: req.params.id,
            content: question[0].question,
        });

            res.status(400).send(question[0].question)

    } catch (error) {
      console.error(error);
      next(error);
    }
  });


module.exports = router;