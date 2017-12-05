/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Storage = require('../LocalStorage');
var Cart = [];

var $total = $(".total-price");
//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $count = $("#order-item-count");
// remove all pizza's from cart


function addToCart(pizza, size, price) {
    //Додавання однієї піци в кошик покупок
    var temp = true; //if TRUE add new, if FALSE increment
    
    var i = 0;
    //Приклад реалізації, можна робити будь-яким іншим способом
    function check(c){
        if(c.pizza.title == pizza.title && c.size == size){
            temp = false;
            i = Cart.indexOf(c);
        }
    }
    Cart.forEach(check);
    console.log("temp: " + temp + "\n i: " + i);
    
    if(temp == true){
            Cart.push({
                pizza: pizza,
                size: size,
                quantity: 1,
                price: price
            });   
    } else if (temp == false){
        Cart[i].quantity += 1;
        Cart[i].price = Cart[i].price/(Cart[i].quantity-1)*Cart[i].quantity;
        i = 0;
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var a = Cart.indexOf(cart_item);
    Cart.splice(a, 1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var saved_Cart = Storage.get('cart');
    if(saved_Cart){
            Cart = saved_Cart;
    }
    console.log("init length: " + Cart.length);
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    Storage.set("cart", Cart);
    
    //Очищаємо старі піци в кошику
    var totalPrice = 0;
    $cart.html("");
    $count.text(Cart.length);
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        $(".clear-order").click(function(){
            for(var i =0; i < Cart.length; i++){
             removeFromCart(Cart[i]);   
            }
        });
        var $node = $(html_code);
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            console.log(cart_item.price);
            cart_item.quantity += 1;
			
            cart_item.price = cart_item.price/(cart_item.quantity-1)*cart_item.quantity;
            
                console.log(cart_item.price);
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            if(cart_item.quantity>1){
                cart_item.quantity -= 1;
                cart_item.price = (cart_item.price/(cart_item.quantity+1))*cart_item.quantity;
            }else if(cart_item.quantity == 1){
                removeFromCart(cart_item);
            }
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".remove").click(function(){
            removeFromCart(cart_item);
        });
        $cart.append($node);
    }

    function calculateTotalPrice(item){
        totalPrice += item.price;
    }
    Cart.forEach(showOnePizzaInCart);    
    Cart.forEach(calculateTotalPrice);
    $total.text(totalPrice);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;