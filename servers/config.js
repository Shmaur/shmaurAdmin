const config = {
    database: {
        DATABASE: 'shmaur',
        USERNAME: 'root',
        PASSWORD: 'shmaur0921',
        PORT: '3306'
        //HOST: '127.0.0.1'
    },
    upPaht:'dist/upFile',
    JWts:{
    	secret:'shmaur',
    	expiresIn:'2d' //超时设置 m分钟 h小时 d 天
    },
    //公用：获取客户端IP
    getClientIP:function(ctx) {
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
   
}

module.exports = config