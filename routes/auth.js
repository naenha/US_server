const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.get('/google', function (req, res, next) {// GET /user/google
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

//구글 로그인 후 자신의 웹사이트로 돌아오게될 주소 (콜백 url)
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


//로그아웃 페이지 : 로그 아웃 처리 + 세션 삭제 + 쿠키 삭제 후 홈으로 리다이렉션
//passport 패키지로 인해 req.logout()으로 로그아웃 기능 구현 가능
router.get('/auth/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});


/*
//홈페이지 생성 (req.user는 passport의 serialize를 통해 user 정보 저장되어있음)
app.get('/',(req,res)=>{
	const temp = getPage('Welcome', 'Welcome to visit...',getBtn(req.user));
    res.send(temp);
});

router.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/logout', (req, res) => {
  return res.send(200, "logout")
});


router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  res.status(200).redirect('/');
});
*/

module.exports = router;