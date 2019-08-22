import dev from './dev'
import prod from './prod'
import defaultConfig from './default'

export type UnionpayConfig = typeof defaultConfig
export type ConfigMode = 'dev' | 'prod'

export default (mode: ConfigMode) => {
    if (mode === 'dev') {
        return {
            ...defaultConfig,
            ...dev,
        }
    }

    return {
        ...defaultConfig,
        ...dev,
        ...prod,
    }
}
