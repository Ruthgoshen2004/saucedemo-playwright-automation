// I used baseURL in the playwright.config.js file, so I can use relative URLs in my tests. This makes the code cleaner and easier to maintain. If I need to change the base URL, I only need to do it in one place.
export const URLS = {
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStepOne: '/checkout-step-one.html',
  checkoutStepTwo: '/checkout-step-two.html',
  complete: '/checkout-complete.html',
}
