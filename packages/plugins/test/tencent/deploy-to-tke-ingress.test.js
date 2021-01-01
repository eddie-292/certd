import pkg from 'chai'
import { DeployCertToTencentTKEIngress } from '../../src/tencent/deploy-to-tke-ingress/index.js'
import { Certd } from '@certd/certd'
import { createOptions } from '../../../../test/options.js'
import { K8sClient } from '../../src/utils/util.k8s.client.js'

const { expect } = pkg

async function getOptions () {
  const options = createOptions()
  options.args.test = false
  options.cert.email = 'xiaojunnuo@qq.com'
  options.cert.domains = ['*.docmirror.cn']
  const certd = new Certd(options)
  const cert = await certd.readCurrentCert()
  const context = {}
  const deployOpts = {
    accessProviders: options.accessProviders,
    cert,
    props: {
      accessProvider: 'tencent-yonsz',
      region: 'ap-guangzhou',
      clusterId: 'cls-6lbj1vee'
    },
    context
  }
  return { options, deployOpts }
}

describe('DeployCertToTencentTKEIngress', function () {
  // it('#getTkeKubeConfig', async function () {
  //   const { options, deployOpts } = await getOptions()
  //   const plugin = new DeployCertToTencentTKEIngress()
  //   const tkeClient = plugin.getTkeClient(options.accessProviders[deployOpts.props.accessProvider], deployOpts.props.region)
  //   const kubeConfig = await plugin.getTkeKubeConfig(tkeClient, deployOpts.props)
  //   console.log('kubeConfig:', kubeConfig)
  // })
  //
  // it('#getTKESecrets', async function () {
  //   this.timeout(5000)
  //   const { options, deployOpts } = await getOptions()
  //   const plugin = new DeployCertToTencentTKEIngress()
  //   const tkeClient = plugin.getTkeClient(options.accessProviders[deployOpts.props.accessProvider], deployOpts.props.region)
  //   const kubeConfig = await plugin.getTkeKubeConfig(tkeClient, deployOpts.props)
  //
  //   const k8sClient = new K8sClient(kubeConfig)
  //   const secrets = await k8sClient.getSecret()
  //
  //   console.log('secrets:', secrets)
  // })
  //
  // it('#patchTKECertSecrets', async function () {
  //   this.timeout(5000)
  //
  //   const { options, deployOpts } = await getOptions()
  //   const plugin = new DeployCertToTencentTKEIngress()
  //   const tkeClient = plugin.getTkeClient(options.accessProviders[deployOpts.props.accessProvider], deployOpts.props.region)
  //   const kubeConfig = await plugin.getTkeKubeConfig(tkeClient, deployOpts.props)
  //   const k8sClient = new K8sClient(kubeConfig)
  //
  //   deployOpts.k8sClient = k8sClient
  //   deployOpts.context.tencentCertId = 'hNVD3Z45'
  //   const newCecret = await plugin.patchCertSecret(deployOpts)
  //   console.log('newCecret', newCecret)
  // })
  // it('#GetTkeIngress', async function () {
  //   this.timeout(5000)
  //
  //   const { options, deployOpts } = await getOptions()
  //   deployOpts.props.ingressName = 'ingress-base'
  //   deployOpts.props.secretName = 'cert---docmirror-cn'
  //   const plugin = new DeployCertToTencentTKEIngress()
  //   const tkeClient = plugin.getTkeClient(options.accessProviders[deployOpts.props.accessProvider], deployOpts.props.region)
  //   const kubeConfig = await plugin.getTkeKubeConfig(tkeClient, deployOpts.props)
  //
  //   const k8sClient = new K8sClient(kubeConfig)
  //   const ingress = await k8sClient.getIngress({
  //     ingressName: 'ingress-base'
  //   })
  //   console.log('ingress:', ingress)
  // })
  // it('#RestartTKEIngress', async function () {
  //   this.timeout(5000)
  //
  //   const { options, deployOpts } = await getOptions()
  //   deployOpts.props.ingressName = 'ingress-base'
  //   deployOpts.props.secretName = 'cert---docmirror-cn'
  //   const plugin = new DeployCertToTencentTKEIngress()
  //   const tkeClient = plugin.getTkeClient(options.accessProviders[deployOpts.props.accessProvider], deployOpts.props.region)
  //   const kubeConfig = await plugin.getTkeKubeConfig(tkeClient, deployOpts.props)
  //
  //   const k8sClient = new K8sClient(kubeConfig)
  //
  //   deployOpts.k8sClient = k8sClient
  //   deployOpts.context.tencentCertId = 'hNVD3Z45'
  //   const newCecret = await plugin.restartIngress(deployOpts)
  //   console.log('newCecret', newCecret)
  // })

  it('#execute', async function () {
    this.timeout(5000)
    const { deployOpts } = await getOptions()
    deployOpts.props.ingressName = 'ingress-base'
    deployOpts.props.secretName = 'cert---docmirror-cn'
    deployOpts.context.tencentCertId = 'hNUZJrZf'
    const plugin = new DeployCertToTencentTKEIngress()

    const ret = await plugin.doExecute(deployOpts)
    console.log('sucess', ret)
  })
})
