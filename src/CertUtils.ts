import { hexToDecimal } from './utils'
import forge from 'node-forge'
import fs from 'fs'

// eslint-disable-next-line no-extend-native
const x509 = require('x509')

// const forge = require('node-forge');

const COMPANY = '中国银联股份有限公司'

// class Cert {
//   public cert: string;
//   public certId: string;
//   public key: string;
// }

export default class CertUtil {
    static parseSignedDataFromPfx(certPath: string, certPwd: string) {
        // const extractedData =
        const keyFile = fs.readFileSync(certPath, 'binary')

        const p12Asn1 = forge.asn1.fromDer(keyFile)

        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, certPwd)

        const bags = p12.getBags({ bagType: forge.pki.oids.certBag })
        const keyData1 = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
            forge.pki.oids.pkcs8ShroudedKeyBag
        ]
        const keyData2 = p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]
        // if (!keyData1 || !keyData2) {
        //   return null;
        // }
        const keyData = (keyData1 || []).concat(keyData2 || [])

        const bagsTemp = bags[forge.pki.oids.certBag]

        if (!bagsTemp) {
            return null
        }

        const bag = bagsTemp[0]
        if (!bag.cert) {
            return null
        }

        return {
            certificate: forge.pki.certificateToPem(bag.cert),
            privateKey: keyData.length && keyData[0].key ? forge.pki.privateKeyToPem(keyData[0].key) : undefined,
        }
    }

    /**
     * parseCertData
     * @param certificate
     */
    static parseCertData(certificate: string) {
        const certData = x509.parseCert(certificate)

        const certID = hexToDecimal(certData.serial)

        return certID
    }
}
