

export class CartPage {

    CheckoutButton = '[data-test="checkout"]'

    constructor(page) {
        this.page = page
    }

    async clickCheckout() {
        await this.page.locator(this.CheckoutButton).click()
    }



}
