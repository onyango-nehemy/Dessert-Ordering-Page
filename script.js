const cartContainer=document.getElementById("cart-container");
const productsContainer=document.getElementById("products-container");
const dessertCards=document.getElementById("dessert-card-container");

/* get the two buttons*/ 
const cartBtn=document.getElementById("cart-btn");
const clearCartBtn=document.getElementById("clear-cart-btn");

/*lets get the cart counter values */
const totalNumberOfItems=document.getElementById("total-items");
const cartSubtotal=document.getElementById("subtotal");
const cartTaxes=document.getElementById("taxes");
const cartTotal=document.getElementById("total");
const showHideCartSpan=document.getElementById("show-hide-cart");
let isCartShowing=false;

/*use products array to contain all your products */
const products=[
    {
        id:1,
        name:"Vanilla Cupcakes (6 Pack)",
        price:12.99,
        category:"Cupcake",
    },
    {
        id:2,
        name:"French Macaron",
        price:3.99,
        category:"Macaron",
    },
    {
        id:3,
        name:"Pumpkin Cupcake",
        price:3.99,
        category:"Cupcake",
    },
    {
        id:4,
        name:"Chocolate Cupcake",
        price:5.99,
        category:"Cupcake",
    },
    {
        id:5,
        name:"Chocolate Pretzels (4 Pack)",
        price:10.99,
        category:"Pretzel",
    },
    {
        id:6,
        name:"Strawberry Ice Cream",
        price:2.99,
        category:"Ice Cream",
    },
    {
        id:7,
        name:"Chocolate Macarons (4 Pack)",
        price:9.99,
        category:"Macaron",
    },
    {
        id:8,
        name:"Strawberry Pretzel",
        price:4.99,
        category:"Pretzel",
    },
    {
        id:9,
        name:"Butter Pecan Ice Cream",
        price:2.99,
        category:"Ice Cream",
    },
    {
        id:10,
        name:"Rocky Road Ice Cream",
        price:2.99,
        category:"Ice Cream",
    },
    {
        id:11,
        name:"Vanilla Macarons (5 Pack)",
        price:11.99,
        category:"Macaron",
    },
    {
        id:12,
        name:"Lemon Cupcakes (4 Pack)",
        price:12.99,
        category:"Cupcake",
    }
    

];
/* now lets create a .forEach function to iterate over the array of products and give a call back function as a parameter */
/** we wiil destructure the id,name,prica and category */
products.forEach(
    ({name,id,price,category})=>{
        dessertCards.innerHTML +=`
        <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button id=${id} class="btn add-to-cart-btn">Add to cart</button>
        </div>
        
        `;
    }
);
/* lets now create a blueprint of what shopping cart does using class to define properties and methods */
// ... (previous code remains the same until the ShoppingCart class)

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }

    addItem(id, products) {
        const product = products.find((item) => item.id === id);
        const { name, price } = product;

        this.items.push(product);

        // Get count of each product in cart
        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        });
        
        const currentProductCount = totalCountPerProduct[product.id];
        let currentProductCountSpan = document.getElementById(`product-count-for-id${product.id}`);
        
        if (currentProductCountSpan) {
            currentProductCountSpan.textContent = `${currentProductCount}x`;
        } else {
            productsContainer.innerHTML += `
                <div class="product" id="dessert${id}">
                    <p>
                        <span class="product-count" id="product-count-for-id${id}">${currentProductCount}x</span>
                        ${name}
                    </p>
                    <p>$${price.toFixed(2)}</p>
                </div>
            `;
        }
        
        // Update totals after adding item
        this.calculateTotal();
    }

    getCounts() {
        return this.items.length;
    }

    calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = this.calculateTaxes(subTotal);
        this.total = subTotal + tax;

        // Update the HTML elements
        cartSubtotal.textContent = `$${subTotal.toFixed(2)}`;
        cartTaxes.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;
        
        return this.total;
    }

    calculateTaxes(amount) {
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    clearCart() {
        if (!this.items.length) {
            alert('Your shopping cart is already empty');
            return;
        }
        
        const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");
        if (isCartCleared) {
            this.items = [];
            this.total = 0;
            productsContainer.innerHTML = '';
            totalNumberOfItems.textContent = 0;
            cartSubtotal.textContent = '0.00';
            cartTaxes.textContent = '0.00';
            cartTotal.textContent = '0.00';
        }
    }
};

// ... (rest of the code remains the same)
/* instantiate an object from the class above to see the functionalities already in the cart */
const cart =new ShoppingCart();
/**get your add to cart buttons ready */
const addToCartBtns=document.getElementsByClassName("add-to-cart-btn");
const addToCartBtnsArray = [...addToCartBtns].forEach(btn => {
    btn.addEventListener('click', (event) => {
        cart.addItem(Number(event.target.id), products);
        totalNumberOfItems.textContent = cart.getCounts();
        cart.calculateTotal();  // Update subtotal, taxes, and total
    });
});
 //this converts buttons collecvtion to array then iterate over them
cartBtn.addEventListener('click', () => {
    isCartShowing=!isCartShowing;//we have inverted the isCartShowing
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show"; 
    cartContainer.style.display = isCartShowing ? "block" : "none";
   
});
