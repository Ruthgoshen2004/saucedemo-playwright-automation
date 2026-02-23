import {expect, test} from '@playwright/test'
import {URLS} from '../data/urls'
import {checkoutUser} from '../data/urls'
import {CartPage} from '../pages/CartPage'
import {LoginPage} from '../pages/LoginPage'
import {Overview} from '../pages/Overview'
import {ShoppingPage} from '../pages/ShoppingPage'
import {YourInformationPage} from '../pages/YourInformationPage'


test.describe('Sanity Purchase Flow', () => {
  test.beforeEach('Login with valid user', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(URLS.inventory)
    await expect(loginPage.secondary_header).toContainText('Products')
  })

  test('End to End Purchase Two Products', async ({page}) => {
    const shoppingPage = new ShoppingPage(page)
    const cartPage = new CartPage(page)
    const yourInformationPage = new YourInformationPage(page)
    const overview = new Overview(page)

    await shoppingPage.addProductToCart()
    await shoppingPage.cartButton()
    await expect(page).toHaveURL(URLS.cart)
    await expect(shoppingPage.title).toContainText('Your Cart',)
    await expect(shoppingPage.shopping_cart_badge,).toContainText('2')

    await cartPage.clickCheckout()
    await expect(page).toHaveURL(URLS.checkoutStepOne)
    await expect(cartPage.title).toContainText('Your Information',)


    await yourInformationPage.fillCheckoutInformation(checkoutUser.firstName,checkoutUser.lastName,checkoutUser.postalCode )
    await expect(yourInformationPage.firstNameField).toHaveValue('ruth')
    await expect(yourInformationPage.lastNameField).toHaveValue('goshen')
    await expect(yourInformationPage.postalCode).toHaveValue('3237417')
    await yourInformationPage.continueButton()
    await expect(page).toHaveURL(URLS.checkoutStepTwo)
    await expect(yourInformationPage.title).toContainText('Overview')

    await overview.finishButton()
    await expect(page).toHaveURL(URLS.complete)
    await expect(overview.title).toContainText('Complete!')
    await expect(overview.header).toHaveText('Thank you for your order!')
  })
})
