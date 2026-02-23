

export class YourInformationPage {


   FirstNameField = '[data-test="firstName"]'
   LastNameField = '[data-test="last-name"]'
   PostalCode = '[data-test="postalCode"]'
   ContinueButton = '[data-test="continue"]'

   constructor(page) {
      this.page = page
   }

   async fillCheckoutInformation(firstNameField, lastNameField, postalCode) {
      await this.page.locator(this.FirstNameField).fill(firstNameField)
      await this.page.locator(this.LastNameField).fill(lastNameField)
      await this.page.locator(this.PostalCode).fill(postalCode)
   }

   async continueButton() {
      await this.page.locator(this.ContinueButton).click()
   }

}