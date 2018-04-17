const commons = require('../commons.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const config = require('../config.js')
const mysqljs = require('../mysql.js')
const multer = require('koa-multer')
const path = require('path')
const router = require('koa-router')();
const asyncBusboy = require('async-busboy')
const fs = require('fs')


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

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.send('err')
    } else {
        //res.json(ret);
        res.send('ok')
    }
};
/*async function listUser(ctx){
  let data = ctx.request.body
  const arr = []
  let querying = ''
  if (data.user_name) {

  }
}*/
//注册用户

router.post('/api/register', async(ctx, next) => {
    let data = ctx.request.body
        //检查账号是否被注册
    await mysqljs.findUserData(data.user_login).then(result => {
        if (result.length) {
            mysqljs.insertData([data.user_login, bcrypt.hashSync(data.user_pass, bcrypt.genSaltSync(10)), data.user_name, data.user_email, data.user_imgUrl, getClientIP(ctx)]);
            return ctx.body = {
                success: true,
                data: {},
                msg: '创建成功！'
            }
        } else {
            return ctx.body = {
                success: false,
                data: {},
                msg: '账号已存在!'
            }
        }

    })
})

//用户登录
router.post('/api/login', async(ctx, next) => {
    const name = ctx.request.body.user_login
    const pass = ctx.request.body.user_pass
    await mysqljs.findDataByName(name).then(result => {
        console.log(result.length)
        if (result.length) {
            const res = JSON.parse(JSON.stringify(result));
            const userInfo = ctx.request.body.user_pass
            if (name === res[0]['user_login'] && bcrypt.compareSync(pass, res[0]['user_pass'])) {
                let ip = ctx.request.body.ip
                delete userInfo.user_pass
                return ctx.body = {
                    success: true,
                    data: {
                        user_login: res[0]['user_login'],
                        user_email: res[0]['user_email'],
                        user_name: res[0]['user_name'],
                        user_registered: res[0]['user_registered'],
                        user_type: res[0]['user_type'],
                        token: jwt.sign(Object.assign({
                                ip
                            }, userInfo),
                            config.JWts.secret, {
                                expiresIn: config.JWts.expiresIn
                            })
                    },
                    msg: "登录成功！"
                }
            } else {
                return ctx.body = {
                    success: false,
                    data: {},
                    msg: "登陆失败，请检查账号或密码是否正确！"
                }
            }
        } else {
            return ctx.body = {
                success: false,
                data: {},
                msg: "登陆失败，请检查账号或密码是否正确！"
            }
        }

    })
})

//文件上传 fileTp 文章图片上传1， 相册图片上传2， 文件上传3
//position z代表摘录图片  c代表文章内容图片
router.post('/api/update', async(ctx, next) => {
    let fileimg = ctx.request.body.files.file //获取文件信息
    let img_tp = ctx.request.body.fields.position
    let img_name = fileimg.name //获取文件名称
    let img_type = fileimg.type
    let img_size = fileimg.size
    let user_id = 1 //用户id
    if (fileimg.type.indexOf('image') === -1) { //判断文件类型是否为img
        return ctx.body = {
            success: false,
            data: {},
            msg: "请上传图片！"
        }
    }
    if (img_size > 10240) {
        return ctx.body = {
            success: false,
            data: {},
            msg: "图片超过10MB，请重新上传！"
        }
    }
    await mysqljs.findDataArtice(img_name).then(result => { //查询文件明是否存在
        let img_path = path.join(`../public/img/artImg/${img_name}`); //设置文件路径
        if (result.length !== 0) {
            return ctx.body = {
                success: false,
                data: {},
                msg: '图片已存在!'
            }
        } else {
            mysqljs.insertArtice([user_id, img_name, img_path, img_tp, img_type, img_size]).then(result => { //插入数据库
                fs.readdir(path.join(`../public/img/artImg`), (err, files) => { // 查看目录是否存在
                    if (err) {
                        fs.mkdir(path.join(`../public/img/artImg`), (err, files) => { //创建目录
                            if (err) {
                                console.log('创建目录失败！')
                            }
                        })
                    }
                })
                let img = fs.readFileSync(fileimg.path)
                fs.writeFileSync(img_path, img)
            })
        }
        return ctx.body = {
            success: true,
            data: {
                name: img_name,
                path: img_path
            },
            msg: '上传成功！'
        }
    })


})

// 查询所有文章图片
router.get('/api/findDataArtices', async(ctx, next) => {
    await mysqljs.findDataArtices().then(result => {
        const res = JSON.parse(JSON.stringify(result));
        return ctx.body = {
            success: true,
            data: res,
            msg: '查询成功！'
        }
    })
})

//删除文章图片
router.del('/api/deleteArticleImg', async(ctx, next) => {
        let img_name = ctx.query.img_name
        let _sql = `delete from articleImg where img_name='${img_name}';`
        await mysqljs.commonality(_sql).then(result => {
            if (result.affectedRows == 0) {
                return ctx.body = {
                    success: false,
                    data: {},
                    msg: '图片不存在，删除图片失败！'
                }
            } else {
                fs.unlink(path.join(__dirname, `../public/img/artImg/${img_name}`), (err) => {
                    if (err) {
                        console.log("图片删除失败！错误代码： " + err)
                    }
                })
                return ctx.body = {
                    success: true,
                    data: {},
                    msg: '删除图片成功！'
                }
            }


        })
    })
    //创建文章
router.post('/api/creatArticle', async(ctx, next) => {
        let res = ctx.request.body
        let data = [res.user_id, res.article_title, res.article_excerpt, res.article_content, res.article_status, res.comment_status, res.article_label, res.article_photo, res.article_type_id, res.article_count, res.article_issue, res.article_original]
        await mysqljs.createArtice(data).then(result => {
            if (result.affectedRows == 0) {
                return ctx.body = {
                    success: false,
                    data: {},
                    msg: '创建文章失败！'
                }
            } else {
                return ctx.body = {
                    success: true,
                    data: {},
                    msg: '创建文件成功！'
                }
            }
        })
    })
    // 修改文章
router.put('/api/editArticle', async(ctx, next) => {
        let res = ctx.request.body
        let data = [res.user_id, res.article_title, res.article_excerpt, res.article_content, res.article_status, res.comment_status, res.article_label, res.article_photo, res.article_type_id, res.article_count, res.article_issue, res.article_original]
        await mysqljs.editArticle(data).then(result => {
            if (result.affectedRows == 0) {
                return ctx.body = {
                    success: false,
                    data: {},
                    msg: '修改文章失败！'
                }
            } else {
                return ctx.body = {
                    success: true,
                    data: {},
                    msg: '修改文章成功！'
                }
            }
        })
    })
    // 删除文章
router.del('/api/deleteArticle', async(ctx, next) => {
        let res = ctx.query.article_title
        let _sql = `delete from article where article_title='${res}';`
        await mysqljs.commonality(_sql).then(result => {
            if (result.affectedRows == 0) {
                return ctx.body = {
                    success: false,
                    data: {},
                    msg: ' ”' + res + '“ 文章不存在！'
                }
            } else {
                return ctx.body = {
                    success: true,
                    data: {},
                    msg: '删除：“' + res + '” 成功！'
                }
            }
        })
    })
    //查询所有文章
router.get('/api/findArticle', async(ctx, next) => {
        await mysqljs.findArticle().then(result => {
            const res = JSON.parse(JSON.stringify(result));
            return ctx.body = {
                success: true,
                data: res,
                msg: '查询成功！'
            }
        })
    })
    //创建文章分类
router.post('/api/createArticeType', async(ctx, next) => {
    let data = ctx.request.body
    let type_name = data.type_name
    let _sql = `select * from articleType where type_name='${type_name}';`
    await mysqljs.commonality(_sql).then(result => {
        if (result.length) {
            return ctx.body = {
                success: false,
                data: {},
                msg: '文章分类已存在，请重新输入！'
            }
        } else {
            mysqljs.createArticeType([data.type_name, data.type_parent, "", ""])
            return ctx.body = {
                success: true,
                data: {},
                msg: '文章分类创建成功！'
            }
        }
    })

})

//修改文章分类
router.put('/api/editArticeType', async(ctx, next) => {
        let data = ctx.request.body
        await mysqljs.editArticeType([data.type_name, data.type_parent, data.id]).then(result => {
            if (result.affectedRows == 0) {
                return ctx.body = {
                    success: false,
                    data: {},
                    msg: '数据库错误，修改失败！'
                }
            } else {
                return ctx.body = {
                    success: true,
                    data: {
                        rows: result.affectedRows
                    },
                    msg: '数据库错误，修改失败！'
                }
            }
        })
    })
    //删除文章分类
router.del('/api/deleteArticeType', async(ctx, next) => {
    let type_name = ctx.query.type_name
    let _sql = `delete from articleType where type_name='${type_name}';`
    await mysqljs.commonality(_sql).then(result => {
        if (result.affectedRows == 0) {
            return ctx.body = {
                success: false,
                data: {},
                msg: '分类不存在，删除分类失败！'
            }
        } else {
            return ctx.body = {
                success: true,
                data: {},
                msg: '删除分类成功！'
            }
        }
    })
})

//查询文章分类
router.get('/api/findArticeType', async(ctx, next) => {
    await mysqljs.findArticeType().then(result => {
        const res = JSON.parse(JSON.stringify(result));
        return ctx.body = {
            success: true,
            data: res,
            msg: '查询成功！'
        }
    })
})

//设置标签

module.exports = router