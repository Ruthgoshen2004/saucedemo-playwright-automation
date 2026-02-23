export class Overview {
  constructor(page) {
    this.page = page
    this.finishButton = page.locator('[data-test="finish"]')
  }

  async clickFinishButton() {
    await this.finishButton.click()
  }
}
