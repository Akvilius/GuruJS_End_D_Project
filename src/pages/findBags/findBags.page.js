export class FindBagsPage  {
 
    constructor(page) {
    this.page = page;
    
    this.imageClick = page.locator(`(//a[@class='ec_image_link_cover'])[4]`);
    this.amountThingsOnPageLink  = page.getByRole('link', { name: '50' })
    this.addToCartButton  = page.locator('#ec_add_to_cart_4');
    this.checkOutButton   =   page.getByRole('link', { name: 'CHECKOUT NOW' });
    this.productCart = page.locator('#ec_product_image_effect_4481370').getByRole('link');
    this.mistakeMessage = page.getByRole('heading', { name: 'You found a crash bug,' });
    
  }
  async checkImage() {
    await this.imageClick.click();
    
  }

  async getThingsOnPage() {
    await this.amountThingsOnPageLink.click();
    
  }
  async addToCart() {
    await this.addToCartButton.click();
    
  }

  async gotoCart (){
    await this.checkOutButton.click();

  }

  async goToProduct () {
    await this.productCart.click();
  }

  async errorMassage () {
    await this.mistakeMessage.waitFor({ state: 'visible' });;
  }



}
