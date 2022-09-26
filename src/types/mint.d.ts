export type MintInfo = {
  /**
   * Banner 图，为列表的时候为多分辨率图片，文件名需包含 @ 符号，如 @1x @2x @3x，
   * 如 banner_@1x.jpg banner_@2x.jpg banner_@3x.jpg
   */
  images: string | string[]
  /** 阵营类型 */
  type: string
  /** 名字 */
  name: string
  /** 介绍，HTML */
  content: string
  /** Mint 按钮下方的提示文字，HTML */
  note?: string
}

export type MintDisclaimer = {
  /** 商品信息图片列表 */
  images: string | string[]
  /** 免责声明正文，HTML */
  content?: string
}

export type MintEditionStyle = {
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

export type MintEdition = {
  /** 版本名称 */
  name: string
  /** 版本识别值（唯一，用于单选识别） */
  value: string
  /** 版本对应的 AmbrusStudioSaler 合约地址 */
  contract: string
  /** AmbrusStudioSaler 合约操作的 NFT 真实地址 */
  nftContract: string
  /** 版本颜色配置 */
  style: MintEditionStyle
}

export type MintPublicSale = {
  /** 公开销售时间，Epotch 秒 */
  start?: number
  /** 公开销售的按钮文案 */
  text: string
  /** 公开销售的跳转链接 */
  link: string
}

export type MintFlashSale = {
  /** 闪购开始时间，Epotch 秒 */
  start?: number
  /** 闪购结束时间，Epotch 秒 */
  end?: number
}

export type MintIntro = {
  /** 商品介绍段落标题 */
  title: string
  /** 商品介绍正文，HTML */
  content: string
  /** 商品介绍是否可折叠 */
  foldable?: boolean
}

export type MintPropertyMode = 'mode-3' | 'mode-6' | 'mode-9'

export type MintPropertyData = {
  /** 属性名称 */
  key: string
  /** 属性值，纯字符串 */
  value: string
}

export type MintProperty = {
  /** 属性排列方式（一列 mode-3，两列 mode-6，三列 mode-9） */
  mode: MintPropertyMode
  /** 属性段落标题 */
  title: string
  /** 属性数据 */
  data: MintPropertyData[]
}

export type Mint = {
  information: MintInfo
  /** 信息和免责声明 */
  disclaimer: MintDisclaimer
  /** 类型 */
  editions: MintEdition[]
  /** 公开销售时间 */
  publicSale: MintPublicSale
  /** 介绍（第一部分） */
  introduction: MintIntro[]
  /** 属性介绍（第二部分） */
  properties?: MintProperty[]
}

export type FlashMint = Mint & {
  /** 闪购销售时间 */
  flashSale: MintFlashSale
}
