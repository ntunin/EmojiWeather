angular.module('app')

.service('Stickers', function() {
	var _stickers;
	var _sticker;
  load();

	return {
		list: list,
		isSelected: isSelected,
    select: select
	}
  function select(item) {
    _sticker = item;
  }
	function list() {
		return _stickers;
	}
	function load(success, error) {
    var url = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSRSYuCu2hZSQTjWdW3BYQ43uZPYovKNVcuG7yQaIUlFvudvpbR";
  	var pack1 = {name: "magic stricker pack", price: 0.99, image: url};
  	var pack2 = {name: "magic stricker pack", price: 0.99, image: url};
  	var pack3 = {name: "magic stricker pack", price: 0.99, image: url};
  	var pack4 = {name: "magic stricker pack", price: 0.99, image: url};
  	var pack5 = {name: "magic stricker pack", price: 0.99, image: url};
  	var pack6 = {name: "magic stricker pack", price: 0.99, image: url};
    _stickers = [pack1, pack2, pack3, pack4, pack5, pack6];
    _sticker = pack1;
	}

	function isSelected (item) {
		return _sticker === item;
	}
});
