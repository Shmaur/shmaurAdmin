const mysql = require('mysql')
const config = require('./config.js')

const mysqlConfig = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
})

console.log(mysqlConfig.host)
console.log(mysqlConfig.user)
console.log(mysqlConfig.password)

let query = (sql, values) =>{
	return new Promise((resolve,reject)=>{
		mysqlConfig.getConnection((err,connection)=>{
			if (err) {
				reject(err)
			}else{
				connection.query(sql,values,(err,rows)=>{
					if (err) {
						reject(err)
					}else{
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

//注册用户
let insertData = (value)=>{
	let _sql = "insert into user (user_login,user_pass,user_name,user_email,user_registered,user_imgUrl,login_ip)VALUES(?,?,?,?,now(),?,?);"
	return query(_sql,value)
}

//delete user
let deleteUserData = (name)=>{
	let _sql= 'delete from user where user_login="${name}";'
	return query(_sql)
}

//find user
let findUserData = (name)=>{
	let _sql='select * from user where user_login="${name}";'
	return query(_sql)
}

let findDataByName =  ( name ) => {
  let _sql = `select * from user where user_login="${name}";`
  return query( _sql)
}

let insertPost = (value)=>{
	let _sql='insert into article (Id,article_title,article_excerpt,article_content,article_status,comment_status,article_label,article_photo,article_type_id,article_count,article_issue,article_original)VALUES(0,?,?,?,?,?,?,?,?,?,?,?);'
	console.log(value)
	return query(_sql,value)
}


module.exports={
	query,
	insertData,
	deleteUserData,
	findUserData,
	findDataByName,
	insertPost
}
