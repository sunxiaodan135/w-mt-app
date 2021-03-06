import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'
//路有前缀
let router = new Router({
    prefix: '/users'
})
//redis
let Store = new Redis().client
//注册接口
router.post('/signup', async ctx => {
    const { username, password, email, code } = ctx.request.body

    if (code) {
        const saveCode = await Store.hget(`nodemail:${username}`, 'code')//发送验证码时redis存储的code
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')//过期时间
        if (code === saveCode) {
            if (new Date().getTime() - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试'
                }
                return false
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }
    //验证码通过后验证用户
    let user = await User.find({
        username
    })
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: '已被注册'
        }
        return
    }
    //创建新用户
    let nuser = await User.create({
        username,
        password,
        email
    })
    if (nuser) {
        //自动登录
        let res = await axios.post('/users/signin', {
            username,
            password
        })
        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: '注册成功',
                user: res.data.user
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'error'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    }
 })
//登录接口
router.post('/signin', async (ctx, next) => {
    return Passport.authenticate('local', function(err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else {
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                //登陆动作
                return ctx.login(user)
            } else {
                ctx.body = {
                    code: 1,
                    msg: info
                }
            }
        }
    })(ctx, next)
})
//验证码实现接口
router.post('/verify', async (ctx, next) => {
    let username = ctx.request.body.username
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '验证请求过于频繁，1分钟内1次'
        }
        return false
    }
    //创建smtp服务发送信息
    let transporter = nodeMailer.createTransport({
        host:Email.smtp.host,
        port:587,
        secure:false,
        service: 'qq',
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    })
    //接收信息
    let ko = {
        code: Email.smtp.code(),//y验证码
        expire: Email.smtp.expire(),//过期时间
        email: ctx.request.body.email,//给那个账号发
        user: ctx.request.body.username//用户名
    }
    //邮件显示的内容
    let mailOptions = {
        from: `"认证邮件" <${Email.smtp.user}>`,
        to: ko.email,//接收方
        subject: '美团网注册码',
        html: `您在美团网中注册，您的验证码是${ko.code}`
    }
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        } else {
            Store.hmset(
                `nodemail:${ko.user}`,
                'code',
                ko.code,
                'expire',
                ko.expire,
                'email',
                ko.email
            )
        }
    })
    ctx.body = {
        code: 0,
        msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
})
//退出登录接口
router.get('/exit', async (ctx, next) => {
    await ctx.logout()
    //检查现在是否是登录状态
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
})
//获取当前用户
router.get('/getUser', async ctx => {
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email: ''
        }
    }
})

export default router
