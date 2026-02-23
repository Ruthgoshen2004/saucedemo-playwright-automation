// you are missing locators and methods for this page
export class CartPage {
  constructor(page) {
    this.page = page
    this.CheckoutButton = page.locator('[data-test="checkout"]')
  }

  async clickCheckout() {
    await this.CheckoutButton.click()
  }
}
