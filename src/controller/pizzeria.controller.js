class Controller {
  constructor(view, service) {
    this.view = view;
    this.service = service;

    this.view.showIngredients();
    this.view.showClassicPizzas();
    this.view.toggleIngredients(
      this.handleAddIngredient,
      this.handleRemoveIngredient
    );
    this.view.setInitialCustomPizza(this.handleSetInitialCustomPizza);
    this.view.selectPizzaSize(this.handleSetCustomPizzaSize);

    this.view.addClassicPizzasButtonEvents(
      this.handleAddPizza,
      this.handleGetCart,
      this.handleGetTotalPrice
    );
    this.view.removePizza(
      this.handleRemovePizza,
      this.handleGetCart,
      this.handleGetTotalPrice
    );
    this.view.tooglePizzaView();

    this.view.showCustomPizzaInfo();
    this.view.addCustomPizza(
      this.handleAddCustomPizza,
      this.handleGetCart,
      this.handleGetTotalPrice,
      this.handleSetInitialCustomPizza
    );
  }

  handleAddPizza = pizza => {
    this.service.addPizzaToCart(pizza);
  };
  handleAddCustomPizza = pizza => {
    this.service.addCustomPizzaToCart(pizza);
  };
  handleRemovePizza = pizza => {
    this.service.removePizzaFromCart(pizza);
  };
  handleGetCart = () => {
    return this.service.getCart();
  };
  handleGetTotalPrice = () => {
    return this.service.getTotalPrice();
  };
  handleSetInitialCustomPizza = () => {
    return this.service.setInitialCustomPizza();
  };
  handleAddIngredient = ingredient => {
    this.service.addIngredient(ingredient);
  };
  handleRemoveIngredient = ingredient => {
    this.service.removeIngredient(ingredient);
  };
  handleSetCustomPizzaSize = size => {
    this.service.setCustomPizzaSize(size);
  };
  handleGetCustomPizza = () => {
    return this.service.getCustomPizza();
  };
}
