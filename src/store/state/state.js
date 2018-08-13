export default {
  userinfo: JSON.parse(window.localStorage.getItem('USERINFO')) || {},
  key: window.localStorage.getItem('USERINFO_KEY') || '',
  contrastList:  JSON.parse(window.localStorage.getItem('CONTRASTLIST')) || {list: []},
  cartList: JSON.parse(window.localStorage.getItem('CARTLIST')) || {},
  orderInfo:JSON.parse(window.localStorage.getItem('ORDER_INFO')) || {},
  subDiamondsInfon:JSON.parse(window.localStorage.getItem('SUB_DIAMONDS_INFO')) || null,
  temporaryInfo:JSON.parse(window.localStorage.getItem('TEMPORARY_INFO')) || null,
  sellAgreementStatus:JSON.parse(window.localStorage.getItem('SELL_AGREEMENT_STATUS')) || false,
}
