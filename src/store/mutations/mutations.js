import * as types from './mutations-types'
import {Toast, Indicator} from 'mint-ui'
export default {
  [types.SET_USER](state, data) {
    state.userinfo = data;
    window.localStorage.setItem('USERINFO', JSON.stringify(data));
  },
  // 设置key
  [types.SET_KEY](state, key) {
    state.key = key;
    window.localStorage.setItem('USERINFO_KEY', key);
  },
  //加入钻石对比列表
  [types.CONTRASTLIST](state, goods) {
    let goodsList = window.localStorage.getItem('CONTRASTLIST');
    if (!goodsList) goodsList = {list: []};
    else goodsList = JSON.parse(goodsList);
    let status = goodsList.list.some((i) => i.goods_id === goods.goods_id);
    if (!status) {
      goodsList.list.push(goods);
      Toast('加入成功');
    }else{
      Toast('对比列表已有此数据')
    }
    state.contrastList = goodsList;
    window.localStorage.setItem('CONTRASTLIST', JSON.stringify(goodsList));
  },
  //删除钻石对比列表的某件钻石
  [types.DELATE_CONTRAST](state, Identification) {
    let goodsList = window.localStorage.getItem('CONTRASTLIST');
    goodsList = JSON.parse(goodsList);
    if(Identification==='all'){
      goodsList.list = [];
    }else{
      goodsList.list.splice(Identification,1)
    }
    state.contrastList = goodsList;
    window.localStorage.setItem('CONTRASTLIST', JSON.stringify(goodsList));
  },
  // 加入购物车列表  暂时不调用此逻辑  此逻辑取消
  [types.ADD_CARTLIST](state, order) {
    let cartList = window.localStorage.getItem('CARTLIST');
    if (!cartList) cartList = {list: []};
    else cartList = JSON.parse(cartList);
    let status = cartList.list.some((i) => i.goods_id === order.goods_id);
    if (!status) {
      cartList.list.push(order);
    }
    state.cartList = cartList;
    window.localStorage.setItem('CARTLIST', JSON.stringify(cartList));
  },
  // 临时存储订单状态
  [types.ORDER_INFO](state,info){
    let orderInfo = window.localStorage.getItem('ORDER_INFO');
    if (!orderInfo) orderInfo = {};
    else orderInfo = JSON.parse(orderInfo);
    state.orderInfo = info;
    window.localStorage.setItem('ORDER_INFO', JSON.stringify(info));
  },
  // 临时存储提交的钻石信息
  [types.SUB_DIAMONDS_INFO](state,info){
    let diamodsInfo = window.localStorage.getItem('SUB_DIAMONDS_INFO');
    if (!diamodsInfo) diamodsInfo = {};
    else diamodsInfo = JSON.parse(diamodsInfo);
    state.subDiamondsInfon = info;
    window.localStorage.setItem('SUB_DIAMONDS_INFO', JSON.stringify(info));
  },
  // 临时
  [types.TEMPORARY_INFO](state,info){
    let diamodsInfo = window.localStorage.getItem('TEMPORARY_INFO');
    if (!diamodsInfo) diamodsInfo = {};
    else diamodsInfo = JSON.parse(diamodsInfo);
    state.temporaryInfo = info;
    window.localStorage.setItem('TEMPORARY_INFO', JSON.stringify(info));
  },
  [types.SELL_AGREEMENT_STATUS](state, val) {
    state.sellAgreementStatus = val;
    window.localStorage.setItem('SELL_AGREEMENT_STATUS', val);
  }
}
