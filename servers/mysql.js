const mysql = require('mysql')
const config = require('./config.js')

var mysqlConfig = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
        //port: config.database.PORT
})


let query = (sql, values) => {
        return new Promise((resolve, reject) => {
            mysqlConfig.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                    console.log("请求失败！请重试。")
                } else {
                    console.log("promise请求成功")
                    connection.query(sql, values, (err, rows, fields) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                            console.log(fields)
                        }
                        connection.release()
                    })
                }
            })
        })
    }
    //公共方法，直接传入数据库语法
let commonality = (sql, value) => {
        return query(sql, value)
    }
    //注册用户
let insertData = (value) => {
    console.log(value)
    let _sql = "insert into user (user_login,user_pass,user_name,user_email,user_registered,user_imgUrl,login_ip)VALUES(?,?,?,?,now(),?,?);"
    return query(_sql, value)
}

//delete user
let deleteUserData = (name) => {
    let _sql = 'delete from user where user_login="${name}";'
    return query(_sql)
}

//find user
let findUserData = (name) => {
        let _sql = 'select * from user where user_login="${name}";'
        return query(_sql)
    }
    //通过名字查找用户
let findDataByName = (name) => {
    let _sql = `select * from user where user_login="${name}";`
    return query(_sql)
}

let insertPost = (value) => {
    let _sql = 'insert into article (Id,article_title,article_excerpt,article_content,article_status,comment_status,article_label,article_photo,article_type_id,article_count,article_issue,article_original)VALUES(0,?,?,?,?,?,?,?,?,?,?,?);'
    console.log(value)
    return query(_sql, value)
}

//文章图片上传
let insertArtice = (value) => {
        let _sql = `insert into articleImg (user_id,img_name,img_path,img_tp,img_type,img_size,img_time)VALUES(?,?,?,?,?,?,now())`
        return query(_sql, value)
    }
    //根据文件名称查询文章图片
let findDataArtice = (name) => {
        let _sql = `select * from articleImg where img_name="${name}";`
        return query(_sql)
    }
    //查询文章图片
let findDataArtices = () => {
        let _sql = `select * from articleImg;`
        return query(_sql)
    }
    //新建文章
let createArtice = (value) => {
        let _sql = `insert into article (user_id,article_title,article_excerpt,article_content,article_status,comment_status,article_label,article_photo,article_type_id,article_count,article_issue,article_original)VALUES(?,?,?,?,?,?,?,?,?,?,?,?);`
        return query(_sql, value)
    }
    //修改文章
let editArticle = (value) => {
        let _sql = `update article set user_id=?,article_title=?,article_excerpt=?,article_content=?,article_status=?,comment_status=?,article_label=?,article_photo=?,article_type_id=?,article_count=?,article_issue=?,article_original=?;`
        return query(_sql, value)
    }
    //查询所有文章
let findArticle = (value) => {
        let _sql = `select * from article;`
        return query(_sql)
    }
    //新建分类
let createArticeType = (value) => {
        let _sql = `insert into articleType (type_name,type_parent,type_found,type_modified)VALUES(?,?,now(),now());`
        return query(_sql, value)
    }
    //修改分类
let editArticeType = (value) => {
        let _sql = `update articleType set type_name=?,type_parent=? where id=?;`
        return query(_sql, value)
    }
    //分类查询
let findArticeType = (name) => {
        let _sql = `select * from articleType;`
        return query(_sql)
    }
    //相册图片上传

//文件上传


module.exports = {
    query,
    insertData,
    deleteUserData,
    findUserData,
    findDataByName,
    insertPost,
    insertArtice,
    findDataArtice,
    findDataArtices,
    createArtice,
    commonality,
    createArticeType,
    findArticeType,
    editArticeType,
    editArticle,
    findArticle

}