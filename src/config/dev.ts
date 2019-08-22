export default {
  acpsdk: {
    version: '5.1.0',
    // 交易请求地址
    frontTransUrl: 'https://gateway.test.95516.com/gateway/api/frontTransReq.do',
    backTransUrl: 'https://gateway.test.95516.com/gateway/api/backTransReq.do',
    singleQueryUrl: 'https://gateway.test.95516.com/gateway/api/queryTrans.do',
    batchTransUrl: 'https://gateway.test.95516.com/gateway/api/batchTrans.do',
    fileTransUrl: 'https://filedownload.test.95516.com/',
    appTransUrl: 'https://gateway.test.95516.com/gateway/api/appTransReq.do',
    cardTransUrl: 'https://gateway.test.95516.com/gateway/api/cardTransReq.do',
    orderTransUrl: 'https://gateway.test.95516.com/gateway/api/order.do',

    // 以下缴费产品使用，其余产品用不到
    jfFrontTransUrl: 'https://gateway.test.95516.com/jiaofei/api/frontTransReq.do',
    jfBackTransUrl: 'https://gateway.test.95516.com/jiaofei/api/backTransReq.do',
    jfSingleQueryUrl: 'https://gateway.test.95516.com/jiaofei/api/queryTrans.do',
    jfCardTransUrl: 'https://gateway.test.95516.com/jiaofei/api/cardTransReq.do',
    jfAppTransUrl: 'https://gateway.test.95516.com/jiaofei/api/appTransReq.do',
    signMethod: '01',
    ifValidateCNName: false,
    ifValidateRemoteCert: false,
    backUrl: '',
    frontUrl: '',
    certPath: `${__dirname}/../cert/test/`,
    signCert: {
      path: `${__dirname}/../cert/test/acp_test_sign.pfx`,
      pwd: '000000',
    },
    encryptCert: {
      path: `${__dirname}/../cert/test/acp_test_enc.cer`,
    },
    middleCert: {
      path: `${__dirname}/../cert/test/acp_test_middle.cer`,
    },
    rootCert: {
      path: `${__dirname}/../cert/test/acp_test_root.cer`,
    },
    // merId: '',
    // privateKey: '',
    // certId: '',
  },
}
