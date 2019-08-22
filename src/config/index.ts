import dev from './dev'
import prod from './prod'
import defaultConfig from './default'

export type UnionpayConfig = typeof defaultConfig
export type ConfigMode = 'dev' | 'prod'

export default (mode: ConfigMode): UnionpayConfig => {
  if (mode === 'dev') {
    return Object.assign({}, defaultConfig, dev)
  }

  return Object.assign({}, defaultConfig, dev, prod)
}
