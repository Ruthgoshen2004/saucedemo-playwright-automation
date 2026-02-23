import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { ShoppingPage } from '../pages/ShoppingPage';
import { YourInformationPage } from '../pages/YourInformationPage';
import { Overview } from '../pages/Overview';
import { urls } from '../data/urls'


test.describe('Sanity_Purchase_Flow', () => {

    test.beforeEach('Login_with_standard_user', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.openLoginPage()
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(page).toHaveURL(urls.inventory)
        await expect(page.locator('[data-test="title"]')).toContainText('Products')
    })

    test('End_to_End_Purchase_Two_Products', async ({ page }) => {
        const shoppingPage = new ShoppingPage(page)
        const cartPage = new CartPage(page)
        const yourInformationPage = new YourInformationPage(page)
        const overview = new Overview(page)

        await shoppingPage.addProductToCart()
        await shoppingPage.cartButton()
        await expect(page).toHaveURL(urls.cart)
        await expect(page.locator('[data-test="title"]')).toContainText('Your Cart ')
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2')


        await cartPage.clickCheckout()
        await expect(page).toHaveURL(urls.checkoutStepOne)
        await expect(page.locator('[data-test="title"]')).toContainText('Your Information')

        await yourInformationPage.fillCheckoutInformation('ruth', 'goshen', '3237417')
        await expect(page.locator('#first-name')).toHaveValue('ruth')
        await expect(page.locator('#last-name')).toHaveValue('goshen')
        await expect(page.locator('#postal-code')).toHaveValue('3237417')
        await yourInformationPage.continueButton()
        await expect(page).toHaveURL(urls.checkoutStepTwo)
        await expect(page.locator('[data-test="title"]')).toContainText('Overview')

        await overview.finishButton()
        await expect(page).toHaveURL(urls.complete)
        await expect(page.locator('[data-test="title"]')).toContainText('Complete!')
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')
    })





})
