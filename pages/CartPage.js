export class CartPage {
  constructor(page) {
    this.page = page
    this.CheckoutButton = page.locator('[data-test="checkout"]')
    this.title = page.locator('[data-test="title"]')
  }

  async clickCheckout() {
    await this.CheckoutButton.click()
  }
}
