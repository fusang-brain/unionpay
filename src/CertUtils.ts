import { hexToDecimal } from './utils'
import forge from 'node-forge'
import fs from 'fs'
import config, { UnionpayConfig } from './config'
import { getMode } from './ConfigInstance'
import { join } from 'path'

// eslint-disable-next-line no-extend-native
const x509 = require('x509')

// const forge = require('node-forge');

const COMPANY = '中国银联股份有限公司'

class Cert {
    public cert: any
    public certId: string
    public key: string

    constructor({ cert, certId, key }: { cert: any; certId: string; key: string }) {
        this.key = key
        this.certId = certId
        this.cert = cert
    }
}

export default class CertUtil {
    static verifyCerts: {
        [key: string]: Cert
    } = {}

    static config: UnionpayConfig

    static initVerifyCerts(certDir?: string) {
        if (!this.config) {
            this.config = config(getMode())
        }
        const { acpsdk } = this.config
        if (!certDir) {
            certDir = acpsdk.certPath
        }

        return new Promise((resolve, reject) => {
            if (!certDir) {
                reject(null)
                return
            }

            fs.readdir(certDir, (err, files) => {
                if (err) {
                    reject(err)
                    return
                }
                const certList: string[] = []

                if (files && files.length) {
                    files.forEach(filename => {
                        const filenames = filename.split('.')
                        if (filenames[filenames.length - 1] === 'cer') {
                            certList.push(join(certDir || '/', filename))
                        }
                    })
                }
                for (const cerPath of certList) {
                    const content = fs.readFileSync(cerPath, 'utf-8')
                    const certData = x509.parseCert(content)

                    const certID = hexToDecimal(certData.serial)

                    const cert = new Cert({
                        cert: certData,
                        key: content,
                        certId: certID,
                    })

                    this.verifyCerts[certID] = cert
                }

                resolve(true)
            })
        })
    }

    static async getVerifyCertByCertID(certID: string) {
        if (Object.keys(this.verifyCerts).length === 0) {
            await this.initVerifyCerts()
        }

        if (Object.keys(this.verifyCerts).length === 0) {
            return null
        }

        if (this.verifyCerts[certID]) {
            return this.verifyCerts[certID].key
        }

        return null
    }

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
