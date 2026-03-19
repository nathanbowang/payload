import type { FrameLocator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

/**
 * Match this to whatever the component uses.
 */
const livePreviewIframeID = 'live-preview-iframe'

export const getLivePreviewIframe = async (
  page: Page,
  options?: {
    expectIframeSrcToMatch?: RegExp
  },
): Promise<{
  frame: FrameLocator
  iframe: ReturnType<Page['locator']>
}> => {
  const { expectIframeSrcToMatch } = options || {}

  const iframe = page.locator(`#${livePreviewIframeID}`)

  if (expectIframeSrcToMatch) {
    await expect.poll(async () => iframe.getAttribute('src')).toMatch(expectIframeSrcToMatch)
  }

  const frame = getLivePreviewIframeFrame(page)

  return {
    iframe,
    frame,
  }
}

export const getLivePreviewIframeFrame = (page: Page): FrameLocator => {
  const frame = page.frameLocator(`#${livePreviewIframeID}`)
  return frame
}

export const toggleLivePreview = async (
  page: Page,
  options?: {
    targetState?: 'off' | 'on'
  },
): Promise<void> => {
  const toggler = page.locator('#live-preview-toggler')
  await expect(toggler).toBeVisible()

  const isActive = await toggler.evaluate((el) =>
    el.classList.contains('live-preview-toggler--active'),
  )

  if (isActive && (options?.targetState === 'off' || !options?.targetState)) {
    await toggler.click()
    await expect(toggler).not.toHaveClass(/live-preview-toggler--active/)
    await expect((await getLivePreviewIframe(page)).iframe).toBeHidden()
  }

  if (!isActive && (options?.targetState === 'on' || !options?.targetState)) {
    await toggler.click()
    await expect(toggler).toHaveClass(/live-preview-toggler--active/)
    const { iframe } = await getLivePreviewIframe(page)
    await expect(iframe).toBeVisible()
  }
}
