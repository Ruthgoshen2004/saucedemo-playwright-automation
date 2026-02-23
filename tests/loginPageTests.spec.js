import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import { Positive_users, Negative_users } from '../data/dataPage'
import { urls } from '../data/urls'


test.describe('Login_Positive_Users', () => {

    test('Login_standard_user_success', async ({ page }) => {
        let loginPage = new LoginPage(page)
        await loginPage.openLoginPage()
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(page).toHaveURL(urls.inventory)
        await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products')
    })

    Positive_users.forEach((user) => {
        test(`Login_positive_${user.username}`, async ({ page }) => {
            let loginPage = new LoginPage(page)
            await loginPage.openLoginPage()
            await loginPage.login(user.username, user.password)
            await expect(page).toHaveURL(urls.inventory)
            await expect(page.locator('[data-test="secondary-header"]')).toContainText('Products')

        })
    })
})

test.describe('Login_Negative_Users', () => {

    test('Login_locked_out_user_error', async ({ page }) => {
        let loginPage = new LoginPage(page)
        await loginPage.openLoginPage()
        await loginPage.login('locked_out_user', 'secret_sauce')
        await expect(loginPage.errorMessage).toBeVisible()

    })

    Negative_users.forEach((user, i) => {
        test(`Login_negative_${user.username || 'empty'}_${i}`, async ({ page }) => {
            let loginPage = new LoginPage(page)
            await loginPage.openLoginPage()
            await loginPage.login(user.username, user.password)
            await expect(loginPage.errorMessage).toBeVisible()
        })
    })

})







