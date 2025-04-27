import type { ElementHandle, Locator } from 'playwright'
import { wxchannelConst } from '#/constants'
import { LiveControlElementFinder } from '../LiveControlElementFinder'

export class WxChannelLiveControlElementFinder extends LiveControlElementFinder {
  public async getPopUpButtonFromGoodsItem(
    item: ElementHandle<SVGElement | HTMLElement>,
  ): Promise<ElementHandle<HTMLElement | SVGElement>> {
    const button = await item.$(wxchannelConst.selectors.goodsItem.POPUP_BUTTON)
    if (!button) {
      throw new Error('找不到讲解按钮')
    }
    return button
  }

  public async getIdFromGoodsItem(
    item: ElementHandle<SVGElement | HTMLElement>,
  ): Promise<number> {
    const span = await item.$(wxchannelConst.selectors.goodsItem.ID)
    return Number.parseInt((await span?.textContent()) ?? '')
  }

  public async getCurrentGoodsItemsList(): Promise<
    ElementHandle<SVGElement | HTMLElement>[]
  > {
    const itemsList = await this.page.$$(wxchannelConst.selectors.GOODS_ITEM)
    // 视频号是倒序的，并且似乎并没有虚拟列表，所以不用担心滚动的问题
    return itemsList.reverse()
  }

  public getGoodsItemsScrollContainer(): Promise<ElementHandle<
    SVGElement | HTMLElement
  > | null> {
    // 视频号没有虚拟列表，且直接遍历所有元素，按理说不会触发这个函数
    throw new Error('未找到商品：请确认商品序号是否在范围内')
  }

  public async getCommentTextarea(): Promise<
    ElementHandle<SVGElement | HTMLElement> | Locator | null
  > {
    const iframe = this.page.locator(
      wxchannelConst.selectors.LIVE_CONTROL_IFRAME,
    )
    const textarea = iframe.locator(
      wxchannelConst.selectors.commentInput.TEXTAREA,
    )
    return textarea
  }

  public async getClickableSubmitCommentButton(): Promise<ElementHandle<
    SVGElement | HTMLElement
  > | null> {
    const button = await this.page.$(
      wxchannelConst.selectors.commentInput.SUBMIT_BUTTON,
    )
    if (!button) {
      throw new Error('找不到发送按钮')
    }
    if (
      (await button.getAttribute('class'))?.includes(
        wxchannelConst.selectors.commentInput.SUBMIT_BUTTON_DISABLED,
      )
    ) {
      throw new Error('无法点击发送按钮')
    }
    return button
  }

  public async getPinTopLabel(): Promise<ElementHandle<
    SVGElement | HTMLElement
  > | null> {
    return null
  }
}
