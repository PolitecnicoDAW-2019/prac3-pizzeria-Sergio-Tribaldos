class Service {
  constructor() {
    this.cart = new Cart();
    this.customPizza;
    this.customPizzaCount = 0;
  }

  addPizzaToCart(pizza) {
    this.cart.addPizza(pizza);
  }
  removePizzaFromCart(pizza) {
    this.cart.removePizza(pizza);
  }
  getCart() {
    return this.cart;
  }
  getTotalPrice() {
    return this.cart.totalPrice;
  }
  addIngredient(ingredient) {
    this.customPizza.addIngredient(ingredient);
  }
  removeIngredient(ingredient) {
    this.customPizza.removeIngredient(ingredient);
  }
  setCustomPizzaSize(size) {
    this.customPizza.setSize(size);
  }
  setInitialCustomPizza() {
    this.customPizzaCount++;
    return (this.customPizza = new CustomPizza(
      "Personalizada",
      this.customPizzaCount
    ));
  }
  getCustomPizza() {
    return this.customPizza;
  }
  addCustomPizzaToCart(pizza) {
    this.cart.addCustomPizza(pizza);
  }
}
