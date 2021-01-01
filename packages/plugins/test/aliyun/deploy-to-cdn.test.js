import pkg from 'chai'
import { DeployCertToAliyunCDN } from '../../src/aliyun/deploy-to-cdn/index.js'
import { Certd } from '@certd/certd'
import createOptions from '../../../../test/options.js'
const { expect } = pkg
describe('DeployToAliyunCDN', function () {
  it('#execute', async function () {
    this.timeout(5000)
    const options = createOptions()
    const plugin = new DeployCertToAliyunCDN()
    options.cert.domains = ['*.docmirror.cn', 'docmirror.cn']
    const certd = new Certd(options)
    const cert = await certd.readCurrentCert()
    const ret = await plugin.doExecute({
      accessProviders: options.accessProviders,
      cert,
      props: { domainName: 'certd-cdn-upload.docmirror.cn', certName: 'certd部署测试', certType: 'cas', accessProvider: 'aliyun' }
    })
    console.log('context:', context, ret)
  })
})
