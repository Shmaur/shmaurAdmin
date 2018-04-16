
const commons = require('../commons.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const config = require('../config.js')
const mysqljs = require('../mysql.js')

const router = require('koa-router')()



//公用：获取客户端IP
function getClientIP(ctx) {
  let req = ctx.request;
  let ip = ctx.ip ||
    req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  let arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/);
  return arr ? arr[0] : '';
}

/*async function listUser(ctx){
	let data = ctx.request.body
	const arr = []
	let querying = ''
	if (data.user_name) {

	}
}*/
//注册用户

router.post('/api/register', async (ctx, next) => {
  let data = ctx.request.body
  console.log(getClientIP(ctx))
  let msg, success = false

    //检查账号是否被注册
    const connection = await mysql.createConnection(config.database)
await mysqljs.findUserData([data.user_login]).then(result=>{  
  console.log(result)
  if (result.length ==0 ) {
    ctx.body = {
            success: true,
            data: {},
            message: ''
          }
      mysqljs.insertData([ctx.request.body.user_login, bcrypt.hashSync(data.user_pass, bcrypt.genSaltSync(10)), ctx.request.body.user_name, ctx.request.body.user_email,ctx.request.body.user_imgUrl,getClientIP(ctx)])

  }
  ctx.body={
    success: false,
            data: {},
            message: '账号已存在'
  }
})
    //const [rows] = await connection.execute('SELECT * FROM `user` where `user_login`=?', [data.user_login]
})

//用户登录
router.post('/api/login', async (ctx, next) => {
   //const data = ctx.request.body
  //if (!config.name_reg.test(ctx.request.body.user_login)) {
  //  msg = config.name_txt
//  } else if (!config.pass_reg.text(ctx.request.body.user_pass)) {
    //msg = config.pass_txt
 // } else {
  console.log(ctx.request.body.user_login)
    //const connection = await mysql.createConnection(config.database)
    let rows;
     await mysqljs.findUserData([ctx.request.body.user_login]).then(()=>{
        const userInfo = ctx.request.body.user_pass
      if (bcrypt.compareSync(ctx.request.body.user_pass, userInfo.user_pass)) {
        let ip = config.getClientIP(ctx)
        //await connection.execute('UPDATE `user` SET `login_ip`=? ', [ip])
        delete userInfo.user_pass
        return ctx.body = {
          success: true,
          data: {
            userInfo,
            token: jwt.sign(Object.assign({ ip }, userInfo),
              config.JWTs.secret, { expiresIn: config.JWTs.expiresIn })
          }
        }
      }
    }).catch(()=>{
      ctx.body=false
    })
    //const [rows] = await connection.execute('SELECT * FROM `user` where `user_login`=?', [ctx.request.body.user_login])
    msg = "用户名或密码错误，请重新登录"
    if (rows) {

    }
    await connection, end()
  //}

})


module.exports = router
