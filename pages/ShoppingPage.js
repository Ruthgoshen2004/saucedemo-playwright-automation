

export class ShoppingPage {

    BackpackButton = '[data-test="add-to-cart-sauce-labs-backpack"]'
    BikeliteButton = '[data-test="add-to-cart-sauce-labs-bike-light"]'
    CartButton = '[data-test="shopping-cart-link"]'

    constructor(page) {
        this.page = page
    }
    async addProductToCart() {
        await this.page.locator(this.BackpackButton).click()
        await this.page.locator(this.BikeliteButton).click()
    }
    async cartButton() {
        await this.page.locator(this.CartButton).click()
    }
}