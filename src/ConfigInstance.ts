import { UnionpayConfig } from './config'

export class ConfigBundle {
    static config: UnionpayConfig

    static setConfig(config: UnionpayConfig) {
        this.config = config
    }
}

export function setConfig(config: UnionpayConfig) {
    ConfigBundle.setConfig(config)
}

export default ConfigBundle.config
