import { urls } from '../data/urls'


export class LoginPage {

    userNameField = '[data-test="username"]'
    userPasswordField = '[data-test="password"]'
    loginButtom = '[data-test="login-button"]'

    constructor(page) {
        this.page = page
        this.errorMessage = page.locator('[data-test="error"]')

    }

    async openLoginPage() {
        await this.page.goto(urls.base)
    }

    async login(username, password) {
        await this.page.locator(this.userNameField).fill(username)
        await this.page.locator(this.userPasswordField).fill(password)
        await this.page.locator(this.loginButtom).click()
    }

}