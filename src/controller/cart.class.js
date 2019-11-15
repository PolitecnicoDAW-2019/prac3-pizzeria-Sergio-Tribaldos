class Cart {
  constructor() {
    this.pizzas = [];
    this.totalPrice;
  }

  addPizza(addedPizza) {
    let pizzaFound = false;
    this.pizzas = this.pizzas.map(pizza => {
      if (pizza.name === addedPizza.name) {
        pizzaFound = true;
        return {
          name: pizza.name,
          amount: +pizza.amount + 1,
          unitPrice: +pizza.unitPrice,
          totalPrice: +pizza.totalPrice + +addedPizza.unitPrice
        };
      }
      return pizza;
    });
    if (!pizzaFound) {
      this.pizzas.push(addedPizza);
    }
    this.totalPrice = this.getTotalPrice();
  }
  addCustomPizza(pizza) {
    this.pizzas.push(pizza);
    this.totalPrice = this.getTotalPrice();
    console.log(this.pizzas);
  }

  removePizza(pizzaToRemove) {
    this.pizzas = this.pizzas.map(pizza => {
      if (pizzaToRemove.name === pizza.name) {
        pizza = {
          name: pizza.name,
          amount: +pizza.amount - 1,
          unitPrice: +pizza.unitPrice,
          totalPrice: +pizza.totalPrice - +pizzaToRemove.unitPrice
        };
      }
      return pizza;
    });

    this.pizzas = this.pizzas.filter(pizza => pizza.amount > 0);
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    return (this.totalPrice = this.pizzas
      .reduce((acc, pizza) => {
        return acc + pizza.totalPrice;
      }, 0)
      .toFixed(2));
  }
}
