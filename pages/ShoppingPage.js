export class ShoppingPage {
  constructor(page) {
    this.page = page
    this.BackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    )
    this.BikeLiteButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
    )
    this.CartButton = page.locator('[data-test="shopping-cart-link"]')
  }
  async addProductToCart() {
    await this.BackpackButton.click()
    await this.BikeLiteButton.click()
  }
  async cartButton() {
    await this.CartButton.click()
  }
}
