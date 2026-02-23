import {expect, test} from '@playwright/test'
import {urls} from '../data/urls'
import {Negative_users, Positive_users} from '../data/users'
import {LoginPage} from '../pages/LoginPage'

// Why you putting the locators in the test file? You should put them in the page object files.

test.describe('Login Positive Users', () => {
  test('Login standard user success', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(urls.inventory)
    await expect(page.locator('[data-test="secondary-header"]')).toContainText(
      'Products',
    )
  })

  Positive_users.forEach((user) => {
    test(`Login positive ${user.username}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.openLoginPage()
      await loginPage.login(user.username, user.password)
      await expect(page).toHaveURL(urls.inventory)
      await expect(
        page.locator('[data-test="secondary-header"]'),
      ).toContainText('Products')
    })
  })
})

test.describe('Login Negative Users', () => {
  test('Login locked out user error', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
    await loginPage.login('locked_out_user', 'secret_sauce')
    await expect(loginPage.errorMessage).toBeVisible()
  })

  Negative_users.forEach((user, i) => {
    test(`Login negative ${user.username || 'empty'} ${i}`, async ({page}) => {
      const loginPage = new LoginPage(page)
      await loginPage.openLoginPage()
      await loginPage.login(user.username, user.password)
      await expect(loginPage.errorMessage).toBeVisible()
    })
  })
})
