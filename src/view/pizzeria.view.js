class View {
  constructor() {
    this.chooseSizePizzaButton = [];
    this.cartList = [];
    this.selectedCustomPizzaSize = 'M';
    this.customPizza;
    this.selectedCustomPizzaIngredients = [];
    this.listOfIngredientsButtons = [];
    this.ingredients = INGREDIENTS;

    this.DOM = {
      standardPizzasBox: document.getElementById('standardPizzasBox'),
      customPizzasBox: document.getElementById('customPizzasBox'),
      ingredientsList: document.getElementById('ingredientsList'),
      pizzaSizes: document.getElementById('pizzaSizes'),
      cartList: document.getElementById('cartList'),
      totalPrice: document.getElementById('totalPrice'),
      togglePizzaViewButton: document.getElementById('togglePizzaView'),
      customPizzaInfo: document.getElementById('customPizzaInfo'),
      addCustomPizza: document.getElementById('addCustomPizza'),
      totalCustomPizzaPrice: document.getElementById('totalCustomPizzaPrice')
    };
  }

  showClassicPizzas() {
    for (const { name, price_S, price_M, price_G, imgSrc } of PIZZAS) {
      const pizzaBox = document.createElement('div');
      pizzaBox.classList.add('pizzaBox');
      const pizzaTitle = document.createElement('h5');
      pizzaTitle.innerHTML = name;
      pizzaBox.append(pizzaTitle);
      const pizzaImage = document.createElement('img');
      pizzaImage.classList.add('pizzaPicture');
      pizzaImage.src = imgSrc;
      pizzaBox.append(pizzaImage);

      const pizzaBoxButtons = document.createElement('div');
      pizzaBoxButtons.classList.add('pizzaBoxButtons');

      const button_S = document.createElement('button');
      button_S.classList.add('btn');
      button_S.classList.add('btn-outline-success');
      button_S.innerHTML = 'Pequeña ' + price_S;
      button_S.setAttribute('data-name', name);
      button_S.setAttribute('data-price', price_S);
      button_S.setAttribute('data-size', 'S');
      pizzaBoxButtons.append(button_S);
      this.chooseSizePizzaButton.push(button_S);

      const button_M = document.createElement('button');
      button_M.classList.add('btn');
      button_M.classList.add('btn-outline-success');
      button_M.innerHTML = 'Mediana ' + price_M;
      button_M.setAttribute('data-name', name);
      button_M.setAttribute('data-price', price_M);
      button_M.setAttribute('data-size', 'M');
      pizzaBoxButtons.append(button_M);
      this.chooseSizePizzaButton.push(button_M);

      const button_G = document.createElement('button');
      button_G.classList.add('btn');
      button_G.classList.add('btn-outline-success');
      button_G.innerHTML = 'Grande ' + price_G;
      button_G.setAttribute('data-name', name);
      button_G.setAttribute('data-price', price_G);
      button_G.setAttribute('data-size', 'G');
      pizzaBoxButtons.append(button_G);
      this.chooseSizePizzaButton.push(button_G);

      pizzaBox.append(pizzaBoxButtons);

      this.DOM.standardPizzasBox.append(pizzaBox);
    }
  }

  showIngredients() {
    for (const ingredient of INGREDIENTS) {
      const button = document.createElement('span');
      button.classList.add('btn');
      button.classList.add('btn-outline-success');
      button.classList.add('ingredientBtn');
      const ingredientName = document.createElement('p');
      ingredientName.innerHTML = ingredient.name;
      button.append(ingredientName);

      const ingredientPrice = document.createElement('p');
      ingredientPrice.innerHTML = ingredient.basePrice + '€';
      button.append(ingredientPrice);
      this.DOM.ingredientsList.append(button);
      this.listOfIngredientsButtons.push(button);
    }
  }
  setInitialCustomPizza(setInitialCustomPizza) {
    this.customPizza = setInitialCustomPizza();
  }
  /*getCustomPizza(getCustomPizza) {
    this.customPizza = getCustomPizza();
  }*/
  selectPizzaSize(setPizzaSize) {
    setPizzaSize('M');
    this.DOM.pizzaSizes.addEventListener('click', button => {
      const selectedSize = button.target.value;
      for (const button of this.DOM.pizzaSizes.children) {
        button.classList.remove('selectedButton');
      }
      setPizzaSize(selectedSize);
      this.showCustomPizzaInfo();
      button.target.classList.add('selectedButton');
    });
  }

  toggleIngredients(addIngredient, removeIngredient) {
    for (const ingredientButton of this.listOfIngredientsButtons) {
      ingredientButton.addEventListener('click', button => {
        const selectedIngredient = this.ingredients.find(
          ingredient =>
            ingredient.name === button.currentTarget.firstChild.innerHTML
        );
        let buttonClassList = button.currentTarget.classList;
        let isSelectedButton = buttonClassList.contains('selectedButton');

        isSelectedButton
          ? buttonClassList.remove('selectedButton')
          : buttonClassList.add('selectedButton');

        isSelectedButton
          ? removeIngredient(selectedIngredient)
          : addIngredient(selectedIngredient);
        this.showCustomPizzaInfo();
      });
    }
  }

  addCustomPizza(
    addCustomPizza,
    getCart,
    getTotalPrice,
    setInitialCustomPizza
  ) {
    this.DOM.addCustomPizza.addEventListener('click', () => {
      addCustomPizza(this.customPizza);
      this.cartList = getCart();
      this.totalPrice = getTotalPrice();
      this.updateCart();
      this.clearCustomPizza();
      this.setInitialCustomPizza(setInitialCustomPizza);
    });
  }

  clearCustomPizza() {
    const ingredientButtons = document.querySelectorAll('.ingredientBtn');
    for (const button of ingredientButtons) {
      button.classList.remove('selectedButton');
    }
    this.DOM.totalCustomPizzaPrice.innerHTML = '';
  }

  showCustomPizzaInfo() {
    this.DOM.totalCustomPizzaPrice.innerHTML =
      this.customPizza.totalPrice + ' €';
  }

  addClassicPizzasButtonEvents(setPizza, getCart, getTotalPrice) {
    for (const button of this.chooseSizePizzaButton) {
      button.addEventListener('click', button => {
        const pizzaName = button.currentTarget.dataset.name;
        const price = button.currentTarget.dataset.price;
        const size = button.currentTarget.dataset.size;
        setPizza(new Pizza(pizzaName, price, size));
        this.cartList = getCart();
        this.totalPrice = getTotalPrice();
        this.updateCart();
      });
    }
  }

  removePizza(removePizza, getCart, getTotalPrice) {
    cartList.addEventListener('click', button => {
      const name = button.target.dataset.name.slice(0, -2);
      const size = button.target.dataset.name.slice(-1);
      const unitPrice = button.target.dataset.unitprice;
      removePizza(new Pizza(name, unitPrice, size));
      this.cartList = getCart();
      this.totalPrice = getTotalPrice();
      this.updateCart();
    });
  }

  updateCart() {
    this.DOM.cartList.innerHTML = '';
    this.DOM.totalPrice.innerHTML = this.totalPrice;
    for (const { amount, name, totalPrice, unitPrice } of this.cartList
      .pizzas) {
      const pizzaElement = document.createElement('div');
      pizzaElement.classList.add('itemElement');
      const pizzaName = document.createElement('div');
      pizzaName.innerHTML = name;
      pizzaElement.append(pizzaName);

      const pizzaAmount = document.createElement('div');
      pizzaAmount.innerHTML = 'x' + amount;
      pizzaElement.append(pizzaAmount);

      const pizzaPrice = document.createElement('div');
      pizzaPrice.innerHTML = totalPrice.toFixed(2);
      pizzaElement.append(pizzaPrice);

      const close = document.createElement('div');
      const closeIcon = document.createElement('i');
      closeIcon.classList.add('material-icons');
      closeIcon.innerHTML = 'close';
      closeIcon.setAttribute('data-name', name);
      closeIcon.setAttribute('data-unitPrice', unitPrice);
      close.append(closeIcon);
      pizzaElement.append(close);

      this.DOM.cartList.append(pizzaElement);
    }
  }
  tooglePizzaView() {
    this.DOM.togglePizzaViewButton.addEventListener('click', () => {
      if (this.DOM.customPizzasBox.style.display == 'none') {
        this.DOM.customPizzasBox.style.display = 'block';
        this.DOM.standardPizzasBox.style.display = 'none';
      } else {
        this.DOM.customPizzasBox.style.display = 'none';
        this.DOM.standardPizzasBox.style.display = 'flex';
      }
    });
  }
}
