export * from './wallet'

export type NFTItemInfo = {
  /**
   * NFT Banner 图，为列表的时候为多分辨率图片，
   * 文件名需包含 @ 符号，如 @1x @2x @3x
   */
  images: string | string[]
  /** NFT 阵营类型 */
  type: string
  /** NFT 名字 */
  name: string
  /** NFT 介绍，Markdown */
  content: string
}

export type NFTItemDisclaimer = {
  /** 商品信息图片列表 */
  images: string | string[]
  /** 免责声明正文，Markdown */
  content: string
}

export type NFTItemIntro = {
  /** 商品介绍段落标题 */
  title: string
  /** 商品介绍正文，Markdown */
  content: string
}

export type NFTPropertyMode = 'mode-3' | 'mode-6' | 'mode-9'

export type NFTPropertyData = {
  /** 属性名称 */
  key: string
  /** 属性值，纯字符串，不支持 Markdown */
  value: string
}

export type NFTItemProperty = {
  /** 属性排列方式（一列 mode-3，两列 mode-6，三列 mode-9） */
  mode: NFTPropertyMode
  /** 属性段落标题 */
  title: string
  /** 属性数据 */
  data: NFTPropertyData[]
}

export type NFTItemEditionStyle = {
  /**
   * 版本背景颜色渐变，CSS 字符串，
   * 如 "linear-gradient(90deg, #E4AA15 0%, #F0C75D 100%)"
   */
  background: string
  /**
   * 版本选中的发光效果，CSS 字符串，
   * 如 "0px 0px 8px 1px #FFB800, inset 4px 0px 10px rgba(0, 0, 0, 0.15)"
   */
  boxShadow: string
}

export type NFTItemEdition = {
  /** 版本名称 */
  name: string
  /** 版本识别值（唯一，用于单选识别） */
  value: string
  /** 版本对应的 AmbrusStudioSaler 合约地址 */
  contract: string
  /** 版本颜色配置 */
  style: NFTItemEditionStyle
}

export type NFTItem = {
  information: NFTItemInfo
  /** NFT 商品信息和免责声明 */
  disclaimer: NFTItemDisclaimer
  /** NFT 商品类型 */
  editions: NFTItemEdition[]
  /** NFT 商品介绍（第一部分） */
  introduction: NFTItemIntro[]
  /** NFT 属性介绍（第二部分） */
  properties?: NFTItemProperty[]
}

export type BlockInfo = {
  id: number
  block_id: number
  content: string
  create_time: number
  delete_time: number
  html: string
  introduction: string
  material: string
  material_mob: string
  name: string
  sort: number
  update_time: number
  url: string
}
