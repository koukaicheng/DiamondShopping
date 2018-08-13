const verify = {
  mobile(val) {
    val = parseInt(val);
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(val)
  },
  idCard(val){
    let reg =   /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    return reg.test(val);
  },
  isChinese(temp) {
    let patten = /^[\u4e00-\u9fa5]+$/;
    if (this.required(temp)) {
      return patten.test(temp);
    }
    return false;
  },
  required(val) {
    if (val instanceof Array) {
      return val.length > 0;
    }
    return val !== undefined && val !== null && (val + '').trim() !== ''
  },
  password(val,min=6,max=20) {
    let reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}/;
    return reg.test(val) && val.length >= min && val.length <=max;
  },
  between(val, minLen, maxLen) {
    if (this.required(val))
      return val.length >= minLen && val.length <= maxLen
  },
  requiredObjProp(obj) {
    if (typeof obj === 'object') {
      for (let key of Object.keys(obj)) {
        if (!this.required(obj[key])) {
          return {isValid: false, key: key + '', rule: 'required'}
        }
      }
      return {isValid: true};
    } else throw 'param is not object'
  },
  isNumber(val) {
    return !(isNaN(val) || val === null || val === undefined || (val + '').trim() === '');
  },
  isNumLetter(val,min=6,max=20){
    let reg =/[^/w/.//]/ig
    return reg.test(val) && val.length >= min && val.length <=max
  }
};

export default verify
