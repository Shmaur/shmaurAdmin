const commons =  {
	sys_name:'shmaur后台管理系统',
	name_reg:/^[a-z\u4e00-\u9fa5]{3,10}$/i, //帐号验证
	name_txt:'3至10个英文或中文字符', //帐号规则
	pass_reg:/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/i, //密码验证
	pass_txt:'6至12个英文和数字组成的字符', //密码规则
	email_reg:/^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,3}$/, //邮箱正则表达式
    email_txt:'请输入正确邮箱地址',
    pic_reg:/^(https?:\/\/|\/upFile\/)/i,
    pic_txt:'头像地址不正确！',
    upFile_maxSize:1024*1024*5,//上传文件大小限制
    upFile_accept:/^image\//,//上传文件格式限制
    shmaur_type:{
    	0:'游客',
    	1:'超级管理员',
    	2:'普通用户'
    },
    page_grade:{},
    mixin:{
    	methods:{
    		userInfos:function(info){
    			if (this.hasOwnProperty('unserInfo')) {
    				this.userInfo = info
    			}
    			const _grade = this.grade
    			if (_grade) {
    				const _page_grade = this.page_grade;
    				for(var i in _grade){
    					_grade[i] = _page_grade[i]<info.shmaur_type
    				}
    			}
    		}
    	},
    	created:function(){
    		this.userInfos(this.$store.state.userInfo.data)
    	},
    	watch:{
    		'$store.state.userInfo.data':'userInfos'
    	}
    }
}

module.exports=commons