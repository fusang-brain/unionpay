export default {
  acpsdk: {
    version: '5.1.0',
    // 交易请求地址
    frontTransUrl: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
    backTransUrl: 'https://gateway.95516.com/gateway/api/backTransReq.do',
    singleQueryUrl: 'https://gateway.95516.com/gateway/api/queryTrans.do',
    batchTransUrl: 'https://gateway.95516.com/gateway/api/batchTrans.do',
    fileTransUrl: 'https://filedownload.95516.com/',
    appTransUrl: 'https://gateway.95516.com/gateway/api/appTransReq.do',
    cardTransUrl: 'https://gateway.95516.com/gateway/api/cardTransReq.do',
    orderTransUrl: 'https://gateway.95516.com/gateway/api/order.do',

    // 以下缴费产品使用，其余产品用不到
    jfFrontTransUrl: 'https://gateway.95516.com/jiaofei/api/frontTransReq.do',
    jfBackTransUrl: 'https://gateway.95516.com/jiaofei/api/backTransReq.do',
    jfSingleQueryUrl: 'https://gateway.95516.com/jiaofei/api/queryTrans.do',
    jfCardTransUrl: 'https://gateway.95516.com/jiaofei/api/cardTransReq.do',
    jfAppTransUrl: 'https://gateway.95516.com/jiaofei/api/appTransReq.do',
    signMethod: '01',
    ifValidateCNName: false,
    ifValidateRemoteCert: false,
    backUrl: '',
    frontUrl: '',
    certPath: `${__dirname}/../cert/prod/`,
    signCert: {
      path: `${__dirname}/../cert/prod/acp_prod_sign.pfx`,
      pwd: '000000',
    },
    encryptCert: {
      path: `${__dirname}/../cert/prod/acp_prod_enc.cer`,
    },
    middleCert: {
      path: `${__dirname}/../cert/prod/acp_prod_middle.cer`,
    },
    rootCert: {
      path: `${__dirname}/../cert/prod/acp_prod_root.cer`,
    },
    merId: '',
    privateKey: '',
    certId: '',
  },
}
