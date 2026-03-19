import type { FrameLocator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

export const getLivePreviewIframe = (page: Page) => page.locator('#live-preview-iframe')

export const getLivePreviewIframeFrame = (page: Page): FrameLocator => {
  const iframe = getLivePreviewIframe(page)
  const frame = iframe.frameLocator('iframe').first()
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
    await expect(getLivePreviewIframe(page)).toBeHidden()
  }

  if (!isActive && (options?.targetState === 'on' || !options?.targetState)) {
    await toggler.click()
    await expect(toggler).toHaveClass(/live-preview-toggler--active/)
    await expect(getLivePreviewIframe(page)).toBeVisible()
  }
}
