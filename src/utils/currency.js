export const toDecimal2 = function (x) {
  let f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  let n = Math.round(x * 100) / 100;
  let s = n.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};
export const shape = function (str) {
  let val = '';
  switch (str) {
    case 'round':
      val = '圆形';
      break;
    case 'princess':
      val = '公主方';
      break;
    case 'emerald':
      val = '祖母绿';
      break;
    case 'asscher':
      val = '阿斯切';
      break;
    case 'marquise':
      val = '马眼形';
      break;
    case 'oval':
      val = '椭圆';
      break;
    case 'radiant':
      val = '雷迪恩';
      break;
    case 'pear':
      val = '梨形';
      break;
    case 'heart':
      val = '心形';
      break;
    case 'cushion':
      val = '垫形';
      break;
    default:
      val = '其他';
      break;
  }
  return val;
};

export const custom = {
  emit(str, paramns) {
    let obj = ''
    if (typeof paramns === 'object') {
      obj = JSON.stringify(paramns)
    } else {
      obj = {}
    }
    window.localStorage.setItem(str, obj);
  },
  receive(str, fn) {
    let obj = window.localStorage.getItem(str);
    let jsonObj = {}
    try {
      jsonObj = JSON.parse(obj);
    } catch (e) {
      jsonObj = {}
    }
    if (obj) {
      typeof fn === 'function' && fn(jsonObj)
      window.localStorage.removeItem(str);
    }
  }
}
//base64转blob
export const dataURLtoBlob = function (dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
};
export const  get_suffix  = function(filename) {
  let pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix
};
export const cloneObj = function (obj) {
  let str, newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str) //还原
  } else {
    for (let i in obj) {
      newobj[i] = typeof obj[i] === 'object' ?
        cloneObj(obj[i]) : obj[i]
    }
  }
  return newobj
}


