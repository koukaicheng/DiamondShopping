/**
 *
 * 接口 、 配置相关
 *
 */
export const HttpImgUrl = 'http://legem.oss-cn-beijing.aliyuncs.com/'
// 获取手机验证码
export const get_sms_captcha = {
  act: 'connect',
  op: 'get_sms_captcha'
}
//是否绑定手机号
export const GetMobileInfo = {
  act: 'member_account',
  op: 'get_mobile_info'
}
//忘记密码 验证验证码
export const CheckSmsCaptcha = {
  act: 'connect',
  op: 'check_sms_captcha'
}
//忘记密码  修改密码
export const FindPassword = {
  act: 'connect',
  op: 'find_password'
}

//修改密码
export const ModifyPwd = {
  act: 'member_account',
  op: 'modify_pwd'
}
//修改手机  新手机验证码
export const BindMobileStep1 = {
  act: 'member_account',
  op: 'bind_mobile_step1'
}
//新手机验证码验证
export const BindMobileStep2 = {
  act: 'member_account',
  op: 'bind_mobile_step2'
}
// 注册
export const Segister = {
  act: 'connect',
  op: 'sms_register'
}

// 登陆
export const Login = {
  act: 'login',
  op: 'index'
}
//微信登录
export const GetWxInfo = {
  act: 'connect',
  op: 'get_wx_info'
}
//获取用户协议\
export  const Agreement = {
  act: 'document',
  op: 'agreement'
}
//退出登录
export  const LogOut = {
  act: 'logout',
  op: 'index'
}
// 首页
export const Index = {
  act: 'index',
  op: 'index'
}
/***************积分****************/

//积分记录
export const Pointslog = {
  act: 'member_points',
  op: 'pointslog'
}

//会员等级
export const MemberRank = {
  act: 'member_points',
  op: 'member_rank'
}
/***************购买相关****************/
// 购物车列表
export const CartListData = {
  act: 'member_cart',
  op: 'cart_list'
}

//删除购物车
export const CartDel = {
  act: 'member_cart',
  op: 'cart_del'
}

// 购买第一步

export const BuyStep1 = {
  act: 'member_buy',
  op: 'buy_step1'
}
// 购买第二步
export const BuyStep2 = {
  act: 'member_buy',
  op: 'buy_step2'
}

/******************************************/
// 价格重量边界
export const FilterParam = {
  act: 'goods',
  op: 'filter_param',
}
//筛选钻石数量
export const GoodsNum = {
  act: 'goods',
  op: 'goods_num',
}
//钻石列表
export const GoodsList = {
  act: 'goods',
  op: 'goods_list',
  gc_id: 560
}
//戒指列表
export const RingList = {
  act: 'goods',
  op: 'goods_list',
  gc_id: 561
}
//钻石详情
export const GoodsDetail = {
  act: 'goods',
  op: 'goods_detail'
}

//添加钻石到购物车
export const CartAdd = {
  act: 'member_cart',
  op: 'cart_add'
}
//添加指环到购物车
export const CartAddInlay = {
  act: 'member_cart',
  op: 'cart_add_inlay'
}
//从订单删除指环
export const CartDelInlay = {
  act: 'member_cart',
  op: 'cart_del_inlay'
}
//购物车数量
export const CartCount = {
  act: 'member_cart',
  op: 'cart_count'
}
//支付
export const PayNew = {
  act: 'member_payment',
  op: 'pay_new'
}

//支付方式查询
export const Pay = {
  act: 'member_buy',
  op: 'pay'
}
//余额查询
export const Myasset = {
  act: 'member_index',
  op: 'my_asset',
  fields: 'predepoit'
}
//支付密码检测
export const CheckPdPwd = {
  act: 'member_buy',
  op: 'check_pd_pwd'
}
//支付宝支付
export const AlipayNativePay = {
  act: 'member_payment',
  op: 'alipay_native_pay'
}
//微信支付
export const WxappPay = {
  act: 'member_payment',
  op: 'wx_app_pay3'
}
//汇款转账
export const TransferPay = {
  act: 'member_payment',
  op: 'transfer_pay'
}
/********* 提交钻石 **********/

//个人提交钻石
export const GoodsAdd = {
  act: 'seller_goods',
  op: 'goods_add'
}
// 查询钻石证书信息
export const Search = {
  act: 'report',
  op: 'search'
}
// 通过钻石编号返回区间值\

export const Price = {
  act: 'evaluate',
  op: 'price'
}
//上架商品
export const GoodsShow = {
  act: 'seller_goods',
  op: 'goods_show'
}
//编辑商品
export const GoodsEdit = {
  act: 'seller_goods',
  op: 'goods_edit'
}
//下架商品
export const GoodsUnshow = {
  act: 'seller_goods',
  op: 'goods_unshow'
}
//送检城市列表
export const OpenCityList = {
  act: 'center',
  op: 'open_city_list'
}
//中心列表
export const CenterList = {
  act: 'center',
  op: 'center_list'
}
//我卖的钻石详情
export const GoodsInfo = {
  act: 'seller_goods',
  op: 'goods_info'
}
/*************收藏相关************/
//商品收藏列表
export const FavoritesList = {
  act: 'member_favorites',
  op: 'favorites_list'
}
//收藏商品
export const FavoritesAdd = {
  act: 'member_favorites',
  op: 'favorites_add'
}
//取消收藏
export const FavoritesFel = {
  act: 'member_favorites',
  op: 'favorites_del'
}
/*********** 我的相关 ***********/

// 区域地址列表
export const AreaList = {
  act: 'area',
  op: 'area_list'
}
// 添加地址
export const AddressAdd = {
  act: 'member_address',
  op: 'address_add'
}
//地址列表
export const AddressList = {
  act: 'member_address',
  op: 'address_list'
}

//删除地址
export const AddressDel = {
  act: 'member_address',
  op: 'address_del'
}

//修改地址
export const AddressEdit = {
  act: 'member_address',
  op: 'address_edit'
}

//修改用户信息
export const Member = {
  act: 'member_information',
  op: 'member'
}
//编辑发票信息
export const EditInvoice = {
  act: 'member_invoice',
  op: 'invoice_add'
}
//上传图片
export const GetToken = {
  act: 'oss',
  op: 'get_token'
}

// 认证店铺
export const Step2 = {
  act: 'store_joinin',
  op: 'step2'
}
// 店铺认证信息
export const StoreInfo = {
  act: 'store_joinin',
  op: 'join_info'
}
// 足迹
export const BrowseList = {
  act: 'member_goodsbrowse',
  op: 'browse_list'
}
// 搜索记录和搜索列表
export const searchKeyList = {
  act: 'index',
  op: 'search_key_list'
}
// 删除足迹
export const BrowseDel = {
  act: 'member_goodsbrowse',
  op: 'browse_del'
}
/***************反馈相关****************/

// 反馈列表
export const InformList = {
  act: 'member_inform',
  op: 'inform_list'
}

// 添加反馈
export const InformSave = {
  act: 'member_inform',
  op: 'inform_save'
}
// 反馈列表
export const InformSubject = {
  act: 'member_inform',
  op: 'inform_subject'
}
//反馈详情
export const InformInfo = {
  act: 'member_inform',
  op: 'inform_info'
}
//消息列表
export const SystemMsg = {
  act: 'member_message',
  op: 'systemmsg'
}
//消息未读
export const Unread = {
  act: 'member_message',
  op: 'unread'
}
//清空消息列表
export const Emptymsg = {
  act: 'member_message',
  op: 'emptymsg'
}
//消息标记已读
export const ReadMessage = {
  act: 'member_message',
  op: 'readMessage'
}
/***************学院相关****************/
//学院列表
export const ArticleList = {
  act: 'article',
  op: 'article_list'
}
// 学员详情
export const ArticleShow = {
  act: 'article',
  op: 'article_show'
}

/***************订单相关****************/
// 我买的钻石
// 订单列表
export const OrderList = {
  act: 'member_order',
  op: 'order_list'
}
// 订单详情
export const OrderInfo = {
  act: 'member_order',
  op: 'order_info'
}
//我卖的钻石订单详情
export const SellOrderInfo = {
  act: 'seller_order',
  op: 'order_info'
}
// 取消订单
export const OrderCancel = {
  act: 'member_order',
  op: 'order_cancel'
}
// 删除订单
export const OrderDelete = {
  act: 'member_order',
  op: 'order_delete'
}

// 确认收货
export const OrderReceive = {
  act: 'member_order',
  op: 'order_receive'
}

// 我卖的钻石
export const SellerOrderList = {
  act: 'seller_goods',
  op: 'goods_list'
}
//物流查询
export const SearchDeliver = {
  act: 'member_order',
  op: 'search_deliver'
}

//送检
export const OrderCheckSend = {
  act: 'seller_order',
  op: 'order_check_send'
}
/***************证书查询****************/
// 证书查询
export const ReportSearch = {
  act: 'report',
  op: 'search'
}
// 估价
export const EvaluatePrice = {
  act: 'evaluate',
  op: 'price'
}

/***************钱包****************/
// 余额
export const MyAsset = {
  act: 'member_index',
  op: 'my_asset'
}
// 账户变动记录
export const Predepositlog = {
  act: 'member_fund',
  op: 'predepositlog'
}

// 添加银行卡
export const CardAdd = {
  act: 'member_card',
  op: 'card_add'
}
// 银行卡列表
export const CardList = {
  act: 'member_card',
  op: 'card_list'
}
// 删除银行卡
export const CardDel = {
  act: 'member_card',
  op: 'card_del'
}

// 提现
export const PdCashAdd = {
  act: 'recharge',
  op: 'pd_cash_add'
}

// 获取终端
export const CLIENT = (function () {
  let u = navigator.userAgent
  let str = ''
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    str = 'android'
    //安卓手机
  } else if (u.indexOf('iPhone') > -1) {
    str = 'ios'
    //苹果手机
  } else if (u.indexOf('Windows Phone') > -1) {
    str = 'winphone'
    //winphone手机
  }

  return str
})()
// 获取一个时间戳
export const TIMESTAMP = (() => Math.random())()
