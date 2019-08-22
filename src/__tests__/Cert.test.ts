import { Greeter } from '../index'
import config from '../config'
import CertUtils from '../CertUtils'
import Unionpay from '../Unionpay';

test('My Greeter', () => {
    expect(Greeter('Carl')).toBe('Hello Carl')
})

test('Parse Signed Data From Pfx', () => {
    const conf = config('dev')
    const data = CertUtils.parseSignedDataFromPfx(conf.acpsdk.signCert.path, conf.acpsdk.signCert.pwd)
    if (data) {
        expect(data.privateKey).toContain('-----BEGIN RSA PRIVATE KEY-----')
        expect(data.certificate).toContain('-----BEGIN CERTIFICATE-----')
    } else {
        expect(data).toBeNull()
    }
})

test('Parse Cert Data', () => {
    const conf = config('dev')
    const data = CertUtils.parseSignedDataFromPfx(conf.acpsdk.signCert.path, conf.acpsdk.signCert.pwd)
    if (data) {
        const certId = CertUtils.parseCertData(data.certificate)
        expect(certId).toBe('69629715588')
    } else {
        expect(data).toBeNull()
    }
})

test('Get VerifyCert By CertID', async () => {
  Unionpay.setMode('dev');
  await CertUtils.getVerifyCertByCertID('123');
  for (const id of Object.keys(CertUtils.verifyCerts)) {
    const content = await CertUtils.getVerifyCertByCertID(id);
    expect(content).toEqual(CertUtils.verifyCerts[id].key);
  }
}, 500000)
