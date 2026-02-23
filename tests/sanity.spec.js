import {expect, test} from '@playwright/test'
import {urls} from '../data/urls'
import {CartPage} from '../pages/CartPage'
import {LoginPage} from '../pages/LoginPage'
import {Overview} from '../pages/Overview'
import {ShoppingPage} from '../pages/ShoppingPage'
import {YourInformationPage} from '../pages/YourInformationPage'

// Why you putting the locators in the test file? You should put them in the page object files.

test.describe('Sanity Purchase Flow', () => {
  test.beforeEach('Login with valid user', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(urls.inventory)
    await expect(page.locator('[data-test="title"]')).toContainText('Products')
  })

  test('End to End Purchase Two Products', async ({page}) => {
    const shoppingPage = new ShoppingPage(page)
    const cartPage = new CartPage(page)
    const yourInformationPage = new YourInformationPage(page)
    const overview = new Overview(page)

    await shoppingPage.addProductToCart()
    await shoppingPage.cartButton()
    await expect(page).toHaveURL(urls.cart)
    await expect(page.locator('[data-test="title"]')).toContainText(
      'Your Cart ',
    )
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toContainText('2')

    await cartPage.clickCheckout()
    await expect(page).toHaveURL(urls.checkoutStepOne)
    await expect(page.locator('[data-test="title"]')).toContainText(
      'Your Information',
    )

    // store the user information in a dedicated file under data folder
    await yourInformationPage.fillCheckoutInformation(
      'ruth',
      'goshen',
      '3237417',
    )
    await expect(page.locator('#first-name')).toHaveValue('ruth')
    await expect(page.locator('#last-name')).toHaveValue('goshen')
    await expect(page.locator('#postal-code')).toHaveValue('3237417')
    await yourInformationPage.continueButton()
    await expect(page).toHaveURL(urls.checkoutStepTwo)
    await expect(page.locator('[data-test="title"]')).toContainText('Overview')

    await overview.finishButton()
    await expect(page).toHaveURL(urls.complete)
    await expect(page.locator('[data-test="title"]')).toContainText('Complete!')
    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      'Thank you for your order!',
    )
  })
})
