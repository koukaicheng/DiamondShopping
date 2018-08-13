import Vue from 'vue'
import Router from 'vue-router'
import state from '../store/state/state'
//  路由懒加载  目前官网文档推荐的方法  需要用到 syntax-dynamic-import插件
const index = () => import ('../views/home/home.vue') //首页
const buyDrill = () => import ('../views/buyDrill/buyDrill.vue') //买钻
const sellDrill = () => import ('../views/sellDrill/sellDrill.vue') //卖钻
const college = () => import ('../views/college/college.vue') //学院
const articleDetails = () => import ('../views/college/children/articleDetails.vue') // 学院详情
const profile = () => import ('../views/profile/profile.vue') //我的
const sellerAgreement = () => import('../views/sellDrill/children/sellerAgreement')
const memberRating = () => import('../views/me' +
'mberRating/memberRating')// 会员等级
const upgradeDetails = () => import('../views/memberRating/children/upgradeDetails')// 升级明细
const settings = () => import ('../views/settings/settings') //设置
const editPass = () => import ('../views/settings/children/editPass') //修改密码
const forgot = () => import('../views/forgot/forgot') // 忘记密码
const accountBinding = () => import ('../views/accountBinding/accountBinding') // 帐号
const bindPhone = () => import ('../views/accountBinding/children/bindPhone') // 帐号
const address = () => import ('../views/address/address') // 地址
const addAddress = () => import ('../views/address/children/addAddress') // 添加地址
const register = () => import ('../views/register/register.vue') //注册
const cart = () => import ('../views/cart/cart.vue') // 购物车
const message = () => import ('../views/message/message') // 消息
const messageSetting = () => import('../views/message/children/messageSetting') //消息设置
const wallet = () => import ('../views/wallet/wallet') // 钱包
const bankCard = () => import ('../views/wallet/children/bankCard') // 我的银行卡
const withdrawals = () => import ('../views/wallet/children/withdrawals') //提现
const addBankCard = () => import ('../views/wallet/children/addBankCard') // 添加银行卡
const expentditureData = () => import ('../views/wallet/children/expentditureData') // 收支明细
const login = () => import ('../views/login/login') //登录
const evaluation = () => import ('../views/evaluation/evaluation') //估价
const certificateQuery = () => import ('../views/certificateQuery/certificateQuery') //证书查询
const diamondsList = () => import('../views/diamondsList/diamondsList') //筛选列表
const lnlayService = () => import('../views/lnlayService/lnlayService') // 镶嵌服务
const diamondContrast = () => import('../views/diamondContrast/diamondContrast') //钻石对比
const diamondOrder = () => import('../views/diamondOrder/diamondOrder') //我买/卖的钻石
const enterpriseCertification = () => import('../views/enterpriseCertification/enterpriseCertification') //企业认证
const personalSubmit = () => import('../views/personalSubmit/personalSubmit') //个人提交钻石详情
const enterpriseSubmission = () => import('../views/enterpriseSubmission/enterpriseSubmission') //企业提交钻石详情
const footprint = () => import('../views/footprint/footprint') // 足迹
const complaint = () => import('../views/complaint/complaint') // 我的投诉反馈
const complaintDetail = () => import('../views/complaint/complaintDetail/detail') // 我的投诉反馈详情
const complaintAsk = () => import('../views/complaint/complaintAsk/ask') // 我的投诉反馈详情
const remittance = () => import('../views/remittance/remittance') //汇款转账
const detectionResult = () => import('../views/detectionResult/detectionResult') //检测结果
const invoice = () => import('../views/invoice/invoice') // 确认发票信息
const userInfo = () => import('../views/userInfo/userInfo') // 基本资料
const userInfoHead = () => import('../views/userInfo/children/head') // 基本资料
const placeOrder = () => import('../views/placeOrder/placeOrder') // 提交订单
const cutoffDetails = () => import('../views/cutoffDetails/cutoffDetails') //戒指详情
const cutoffDetailstwo = () => import('../views/cutoffDetails/cutoffDetailstwo') //戒指详情备用
const diamondDetail = () => import('../views/diamondDetail/diamondDetail') //钻石详情
const diamondDetailtwo = () => import('../views/diamondDetail/diamondDetailtwo')//钻石详情备用
const orderDetail = () => import('../views/orderDetail/orderDetail') //我买的订单详情
const saleDetail = () => import('../views/orderDetail/saleDetail')// 我卖的订单详情
const collection = () => import('../views/collection/collection') //我的收藏
const inspection = () => import('../views/Inspection/Inspection') // 送检
const logistics = () => import('../views/orderDetail/children/logistics') //物流信息
const search = () => import('../views/search/search') //搜索
const payment = () => import('../views/payment/payment')// 订单支付
const test = () => import ('../views/wallet/children/test') // 我的银行卡
const submissionResult = () => import('../views/submissionResult/submissionResult') //提交钻石成功页面
const paymentSuccess = () => import('../views/paymentSuccess/paymentSuccess') //支付成功页面
const agreement = () => import('../views/register/Children/agreement') //用户协议
const userProtocol = () => import('../views/placeOrder/children/userProtocol') //用户交易协议
const taxation = () => import('../views/taxation/taxation') //税费标准
const inlayDescription = () => import('../views/article/inlayDescription') //镶嵌说明
const valueGuarantee = () => import('../views/article/valueGuarantee') //价值保障
const quality = ()=>import('../views/article/quality') //品质保障
const testing =() =>import('../views/article/testing')
const certificationDetails = () => import('../views/enterpriseCertification/certificationDetails')//个人认证与编辑
const sellOrderDetailsP = () =>import('../views/diamondOrder/sellOrderDetailsP') //个人订单钻石编辑
const sellOrderDetailsE = () =>import('../views/diamondOrder/sellOrderDetailsE') //企业订单钻石编辑
const pointAgreement = () =>import('../views/memberRating/children/pointAgreement')//积分等级规则

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/index'
  },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: forgot
    },
    {
      path: '/buyDrill',
      name: 'buyDrill',
      component: buyDrill
    },
    {
      path: '/sellDrill',
      name: 'sellDrill',
      component: sellDrill,
      children: [{
        path: 'sellerAgreement',
        name: 'sellerAgreement',
        component: sellerAgreement
      }]
    },
    {
      path: '/diamondsList',
      name: 'diamondsList',
      component: diamondsList
    },
    {
      path: '/college',
      name: 'college',
      component: college,
    },
    {
      path: '/articleDetails',
      name: 'articleDetails',
      component: articleDetails
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }, {
      path: '/memberRating',
      name: 'memberRating',
      component: memberRating,
      children:[{
        path:'pointAgreement',
        name:'pointAgreement',
        component:pointAgreement
      }]
    }, {
      path: '/upgradeDetails',
      name: 'upgradeDetails',
      component: upgradeDetails
    }, {
      path: '/settings',
      name: 'settings',
      component: settings
    }, {
      path: '/editPass',
      name: 'editPass',
      component: editPass
    }, {
      path: '/register',
      name: 'register',
      component: register,
      children: [{
        path: 'agreement',
        name: 'agreement',
        component: agreement
      }]
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/message',
      name: 'message',
      component: message
    }, {
      path: '/messageSetting',
      name: 'messageSetting',
      component: messageSetting
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet,
    }, {
      path: '/bankcard',
      name: 'bankcard',
      component: bankCard
    }, {
      path: '/withdrawals',
      name: 'withdrawals',
      component: withdrawals
    }, {
      path: '/addBankCard',
      name: 'addBankCard',
      component: addBankCard
    }, {
      path: '/expentditureData',
      name: 'expentditureData',
      component: expentditureData
    }, {
      path: '/evaluation',
      name: 'evaluation',
      component: evaluation
    }, {
      path: '/certificateQuery',
      name: 'certificateQuery',
      component: certificateQuery
    }, {
      path: '/lnlayService',
      name: 'lnlayService',
      component: lnlayService
    }, {
      path: '/diamondContrast',
      name: 'diamondContrast',
      component: diamondContrast
    }, {
      path: '/diamondOrder',
      name: 'diamondOrder',
      component: diamondOrder

    }, {
      path: '/collection',
      name: 'collection',
      component: collection
    }, {
      path: '/enterpriseCertification',
      name: 'enterpriseCertification',
      component: enterpriseCertification
    }, {
      path: '/certificationDetails',
      name: 'certificationDetails',
      component: certificationDetails
    }, {
      path: '/personalSubmit',
      name: 'personalSubmit',
      component: personalSubmit
    }, {
      path: '/enterpriseSubmission',
      name: 'enterpriseSubmission',
      component: enterpriseSubmission
    }, {
      path: '/sellOrderDetailsP',
      name: 'sellOrderDetailsP',
      component:  sellOrderDetailsP
    },{
      path: '/sellOrderDetailsE',
      name: 'sellOrderDetailsE',
      component:  sellOrderDetailsE
    },{
      path: '/footprint',
      name: 'footprint',
      component: footprint
    }, {
      path: '/complaint',
      name: 'complaint',
      component: complaint,
    }, {
      path: '/complaintDetail',
      name: 'complaintDetail',
      component: complaintDetail,

    }, {
      path: '/remittance',
      name: 'remittance',
      component: remittance
    }, {
      path: '/detectionResult',
      name: 'detectionResult',
      component: detectionResult
    }, {
      path: '/complaintAsk',
      name: 'complaintAsk',
      component: complaintAsk
    }, {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    }, {
      path: '/userInfoHead',
      name: 'userInfoHead',
      component: userInfoHead
    }, {
      path: '/accountBinding',
      name: 'accountBinding',
      component: accountBinding
    }, {
      path: '/bindPhone',
      name: 'bindPhone',
      component: bindPhone
    }, {
      path: '/address',
      name: 'address',
      component: address
    }, {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    }, {
      path: '/placeOrder',
      name: 'placeOrder',
      component: placeOrder,
      meta: {requireAuth: true},
      children: [
        {
          path: 'invoice',
          name: 'invoice',
          component: invoice,
          meta: {requireAuth: true},
        },
        {
          path: 'userProtocol',
          name: 'userProtocol',
          component: userProtocol,
          meta: {requireAuth: true},
        }
      ]
    }, {
      path: '/cutoffDetails',
      name: 'cutoffDetails',
      component: cutoffDetails
    }, {
      path: '/cutoffDetailstwo',
      name: 'cutoffDetailstwo',
      component: cutoffDetailstwo
    }, {
      path: '/diamondDetail',
      name: 'diamondDetail',
      component: diamondDetail
    }, {
      path: '/diamondDetailtwo',
      name: 'diamondDetailtwo',
      component: diamondDetailtwo
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    }, {
      path: '/saleDetail',
      name: 'saleDetail',
      component: saleDetail
    }, {
      path: '/logistics',
      name: 'logistics',
      component: logistics
    }, {
      path: '/inspection',
      name: 'inspection',
      component: inspection
    }, {
      path: '/search',
      name: 'search',
      component: search
    }, {
      path: '/test',
      name: 'test',
      component: test
    }, {
      path: '/payment',
      name: 'payment',
      component: payment
    }, {
      path: '/submissionResult',
      name: 'submissionResult',
      component: submissionResult
    }, {
      path: '/paymentSuccess',
      name: 'paymentSuccess',
      component: paymentSuccess
    },
    {
      path: '/taxation',
      name: 'taxation',
      component: taxation
    }, {
      path: '/inlayDescription',
      name: 'inlayDescription',
      component: inlayDescription
    }, {
      path: '/valueGuarantee',
      name: 'valueGuarantee',
      component: valueGuarantee
    },{
      path: '/quality',
      name: 'quality',
      component:  quality
    },{
      path: '/testing',
      name: 'testing',
      component:  testing
    }
  ]
})
router.beforeEach((to, from, next) => {
  let pathName = ['enterpriseSubmission', 'personalSubmit', 'enterpriseCertification', 'complaintAsk', 'cart', 'wallet', 'message', 'bankCard', 'withdrawals', 'addBankCard', 'expentditureData', 'collection', 'diamondOrder', 'complaint', 'userInfo', placeOrder, 'orderDetail', 'paymentSuccess', 'settings', 'address', 'footprint']
  if (pathName.some((res) => res === to.name)) {
    let {key} = state
    if (key) {next()} else {next({path: '/login',})}
  } else {
    next()
  }
})

export default router
