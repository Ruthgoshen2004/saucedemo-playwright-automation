

export class Overview {
  FinishButton = '[data-test="finish"]'


  constructor(page) {
    this.page = page
  }

  async finishButton() {
    await this.page.locator(this.FinishButton).click()
  }


}