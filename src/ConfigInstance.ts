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

export type Mode = 'dev' | 'prod'

let mode: Mode = 'dev'

export function setMode(m: Mode) {
    mode = m
}

export function getMode() {
    return mode
}

export default ConfigBundle.config
