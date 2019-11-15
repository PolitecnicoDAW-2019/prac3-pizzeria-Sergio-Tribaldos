class Pizza {
  constructor(name, unitPrice, size) {
    this.name = name + " " + size;
    this.unitPrice = +unitPrice;
    this.totalPrice = +unitPrice;
    this.amount = 1;
    this.size = size;
  }
}

class CustomPizza {
  constructor(name, size) {
    this.name = name + " " + size;
    this.size = size;
    this.amount = 1;
    this.multiplierFactor = 1.1;
    this.ingredients = [];
    this.pizzaBasePrice = 5.5;
    this.totalPrice;
    this.unitPrice;
  }
  addIngredient(ingredient) {
    this.ingredients = [...this.ingredients, ingredient];
    this.calculateTotalPrice();
  }
  removeIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(
      _ingredient => _ingredient !== ingredient
    );
    this.calculateTotalPrice();
  }
  setSize(size) {
    this.size = size;
    this.setMultiplierFactor();
    this.calculateTotalPrice();
  }
  setMultiplierFactor() {
    this.multiplierFactor = 1;
    this.pizzaBasePrice = 4;
    if (this.size === "M") {
      this.multiplierFactor = 1.1;
      this.pizzaBasePrice = 5.5;
    } else if (this.size === "G") {
      this.multiplierFactor = 1.2;
      this.pizzaBasePrice = 7;
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.ingredients.reduce(
      (totalPrice, { basePrice }) =>
        totalPrice + basePrice * this.multiplierFactor,
      this.pizzaBasePrice
    );
    this.unitPrice = this.totalPrice;
  }
}
