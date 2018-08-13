import OSS from "ali-oss";
console.log(OSS)
let Client = new OSS.Wrapper({
  region: "oss-cn-beijing",
  secure: true,
  accessKeyId: "LTAIhboYf7CVOkuO",
  accessKeySecret: "vclqZHGLbFqqA3YJuXHIhorfVVZZS9",
  bucket: "legem"
});



let getUuid = () => {
  let len = 32; //32长度
  let radix = 16; //16进制
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  let uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
}


export default (file) => {
  let storeAs = getUuid() + '.jpg';
  return Client
    .multipartUpload('header/' + storeAs, file)
    .then(function (result) {
      //   return result;
      console.log(result.res.requestUrls[0].split("?")[0])
      return result;
      // self.data.url = result.res.requestUrls[0].split("?")[0];
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
}
