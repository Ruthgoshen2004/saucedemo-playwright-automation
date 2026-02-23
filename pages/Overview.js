export class Overview {
  constructor(page) {
    this.page = page
    this.finishButton = page.locator('[data-test="finish"]')
    this.title=page.locator('[data-test="title"]')
    this.header=page.locator('[data-test="complete-header"]')
  }

  async clickFinishButton() {
    await this.finishButton.click()
  }
}
