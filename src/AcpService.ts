import { UnionpayConfig } from './config'
import { createLinkString, filterPara } from './utils'
import crypto from 'crypto'

export default class AcpService {
  // static config: UnionpayConfig;

  // static setConfig(config: UnionpayConfig) {
  //   this.config = config;
  // }

  /**
   * 生成签名
   * @param params
   * @param privateKey
   */
  static sign(params: { [key: string]: any }, privateKey: string) {
    const newObj: {
      [key: string]: any
    } = params

    if (params instanceof Object && typeof privateKey === 'string') {
      const prestr = createLinkString(params, true, true)
      const sha1 = crypto.createHash('sha256')
      sha1.update(prestr, 'utf8')
      const ss1 = sha1.digest('hex')
      // 私钥签名
      const sign = crypto.createSign('sha256')
      sign.update(ss1)
      const sig = sign.sign(privateKey, 'base64')
      newObj.signature = sig
    } else {
      return false
    }

    return newObj
  }

  static verify(params: { [key: string]: any }) {
    // 提供校验数据
    const signatureStr = params.signature
    const params1 = filterPara(params)
    const prestr = createLinkString(params1, false, true)
    const publicKey = params.signPubKeyCert
    // 以下部分为公钥验签名
    const sha1 = crypto.createHash('sha256')
    sha1.update(prestr, 'utf8')
    const ss1 = sha1.digest('hex')
    // 公钥验签
    const verifier = crypto.createVerify('sha256')
    verifier.update(ss1)
    const verifyResult = verifier.verify(publicKey, signatureStr, 'base64')
    return verifyResult
  }
}
