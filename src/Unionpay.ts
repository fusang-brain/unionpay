import config, { UnionpayConfig, ConfigMode } from './config'
import moment from 'moment'
import AcpService from './AcpService'
import axios from 'axios'
import CertUtil from './CertUtils'

export default class Unionpay {
    option: UnionpayConfig

    constructor(option: UnionpayConfig, mode?: ConfigMode) {
        const defaultOptions = config(mode || 'prod')
        this.option = {
            ...defaultOptions,
            ...option,
        }
        const parsedPem = CertUtil.parseSignedDataFromPfx(
            this.option.acpsdk.signCert.path,
            this.option.acpsdk.signCert.pwd,
        )

        if (!parsedPem) {
            throw new Error('证书解析失败')
        }
        const certId = CertUtil.parseCertData(parsedPem.certificate)
        this.option.acpsdk.privateKey = parsedPem.privateKey || ''
        this.option.acpsdk.certId = certId
    }

    get config() {
        return this.option.acpsdk
    }

    /**
     * 支付下单
     * @param orderNO
     * @param amount
     * @param data
     */
    async createPaymentOrder(orderNO: string, amount: number, appendData?: any) {
        const { config } = this
        const postParams = {
            version: config.version,
            encoding: 'utf-8',
            signMethod: config.signMethod,
            txnType: '01',
            txnSubType: '01',
            bizType: '000202',
            accessType: '0',
            backUrl: config.backUrl,
            frontUrl: config.frontUrl,
            currencyCode: '156',
            merId: config.merId,
            orderId: orderNO,
            txnAmt: amount,
            txnTime: moment().format('YYYYMMDDHHmmss'),
            payTimeout: moment()
                .add(10, 'minutes')
                .format('YYYYMMDDHHmmss'),
            certId: config.certId,
            channelType: '07',
            reqReserved: appendData,
        }

        const paramsWithSign = AcpService.sign(postParams, config.privateKey)

        try {
            const resp = await axios.post(config.frontUrl, paramsWithSign)
            const { data, status } = resp
            if (200 <= status && status < 300) {
                return data
            }
        } catch (e) {
            throw new Error('生成订单时发生错误')
        }

        return true
    }

    /**
     * 用来验证银联回调签名
     * @param params 支付之后银联回调的数据
     */
    verifyCallback(params: any) {
        return AcpService.verify(params)
    }
}
