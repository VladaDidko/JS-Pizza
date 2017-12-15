/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
var API = require('../API');

var $all = $("#all");
var $type = $("#type");

var quantity = $("#quantity");
var q = 0;

$all.click(function(){
	filterPizza('cheese');
	$type.text("Усі піци");
});

$('#meat').click(function(){
	filterPizza('meat');
	$type.text("З м'ясом");
});
$('#pineapple').click(function(){
	filterPizza('pineapple');
	$type.text("З ананасами");
});
$('#mushroom').click(function(){
	filterPizza('mushroom');
	$type.text("З грибами");
});
$('#ocean').click(function(){
	filterPizza('ocean');
	$type.text("З морепродуктами");
});
$('#vegan').click(function(){
	filterPizza('tomato');
	$type.text("Вегетеріанські");
});

$('.nav li').click(function() {

	$('.nav li').removeClass('active');

	var $this = $(this);
	if (!$this.hasClass('active')) {
		$this.addClass('active');
	}
});

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big, pizza.big_size.price);
            return false;
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small, pizza.small_size.price);
            return false;
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        if(filter in pizza.content){
            pizza_shown.push(pizza);
            q++;
        }
        //TODO: зробити фільтри
    });
    quantity.text(q);
    q=0;
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
    
}

function initialiseMenu() {
    //Показуємо усі піци
    API.getPizzaList(function(err, data){
		if(err){
			Pizza_List = [];
		}
		else{
			Pizza_List = data;
			console.log("Pizza_List = ", data);
		}
		showPizzaList(Pizza_List);
	});
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;