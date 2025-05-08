export class FindBagsPage  {
 
    constructor(page) {
    this.page = page;
    
 
    this.amountThingsOnPageLink  = page.getByRole('link', { name: '50' })
    this.productCart = page.locator('#ec_product_image_effect_4481370').getByRole('link');
    this.mistakeMessage = page.getByRole('heading', { name: 'You found a crash bug,' }).first();
    
  }
 
  async getThingsOnPage() {
    await this.amountThingsOnPageLink.click();
    
  }

  async goToProduct () {
    await this.productCart.click();
  }

}
