import Unionpay from './Unionpay'
import CertUtil from './CertUtils'

export const Greeter = (name: string) => `Hello ${name}`

async function test() {
    Unionpay.setMode('dev')
    const cert = await CertUtil.getVerifyCertByCertID('123')
    console.log('1111', CertUtil.verifyCerts)
    console.log('2222', cert)
}
