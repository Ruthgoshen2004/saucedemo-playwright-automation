export class YourInformationPage {
  constructor(page) {
    this.page = page
    this.firstNameField = page.locator('[data-test="firstName"]')
    this.lastNameField = page.locator('[data-test="lastName"]')
    this.postalCode = page.locator('[data-test="postalCode"]')
    this.continueButton = page.locator('[data-test="continue"]')
    this.title= page.locator('[data-test="title"]')
  }

  async fillCheckoutInformation(firstNameField, lastNameField, postalCode) {
    await this.firstNameField.fill(firstNameField)
    await this.lastNameField.fill(lastNameField)
    await this.postalCode.fill(postalCode)
  }

  async continueButton() {
    await this.continueButton.click()
  }
}
