/**
 * 格式化时间戳
 * @param stamp 时间戳
 * @param format yyyy-MM-dd hh:mm
 */
export const formatDateTime = (stamp, format) => {
  var date = new Date((stamp * 1000));
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  let result;
  if (format) {
    let fmt = format;
    fmt = fmt.replace(/y{4}/, y);
    fmt = fmt.replace(/M{2}/, m);
    fmt = fmt.replace(/d{2}/, d);
    fmt = fmt.replace(/h{2}/, h);
    fmt = fmt.replace(/m{2}/, minute);
    fmt = fmt.replace(/s{2}/, second);
    result = fmt;
  } else {
    result = y + '-' + m + '-' + d + ' ' + h + ':' + minute;
  }
  return result;
};

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
export const bd09togcj02 = function (bd_lon, bd_lat) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = bd_lon - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat]
};

/**
 * 判断图片是不是base64
 * @param s
 * @returns {boolean}
 */
let regex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;

export function validDataUrl(s) {
  return regex.test(s);
}

/**
 * 判断字符串是不是URL
 * @param str
 * @returns {boolean}
 * @constructor
 */
export const CheckUrl = (str) => {
  var RegUrl = new RegExp();
  RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
  return RegUrl.test(str);
}
