// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('promo', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('dir', function (page) {
    for (var i=0; i<shops.length; i++) {
      $('#shops-list').append('<li class="item-content item-link shop-page" data-id="'+i +'">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">' + shops[i].name  + '</div>'+
                                '</div>'+
                            '</li>');
    }
    for (var i=0; i<categories.length-1; i++) {
      $('#cat-list').append('<li class="cat-page" data-id="'+i +'">' +
                                '<a href="category.html" class="item-link item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">' + categories[i].name  + '</div>'+
                                '</div></a>'+
                            '</li>');
    }

    var mySearchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.item-title'
    });

    $$('.shop-page').on('click', function(){
        var index = $(this).data('id');
        createStorePage(index);
    });

    $$('.cat-page').on('click', function(){
        var index = $(this).data('id');
        createCatPage(index);
    });
});

function createCatPage(index) {
  var catShopList = [];
  for (var i=0; i<categories[index].shops.shop.length; i++) {
      catShopList.push(categories[index].shops.shop[i]);
  }
  mainView.router.loadContent(
    '<!-- Top Navbar-->' +
    '<div class="navbar">' +
    '  <div class="navbar-inner">' +
    '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
    '    <div class="center sliding">' + categories[index].name + '</div>' +
    '  </div>' +
    '</div>' +
    '<div class="pages navbar-through toolbar-through">' +
    '  <div data-page="category" class="page">' +
    '    <div class="page-content">' +
    '      <div class="content-block-title">' + categories[index].name + '</div>' +
    '        <div class="list-block">' +
    '         <ul id="catShop-list"></ul></div>' +
    '      </div>' +
    '   </div>' +
    '</div>');
  for (var i=0; i< catShopList.length; i++) {
      $('#catShop-list').append('<li class="item-content item-link catShop-page" data-id="'+i+'"">' +
                              '<div class="item-inner">' +
                                  '<div class="item-title">' + catShopList[i].name  + '</div>'+
                              '</div>'+
                              '</li>');
      }
  $$('.catShop-page').on('click', function(){
      var index = $(this).data('id');
      createStorePage(index);
  });
}

// myApp.onPageInit('category', function (page) {
//     console.log($this.data('id'));
//     var index = $(this).data('id');
//     var catShopList = [];
//     for (var i=0; i<categories[index].shops.shop.length; i++) {
//         catShopList.push(categories[index].shops.shop[i]);
//     }
//     for (var i=0; i< catShopList.length; i++) {
//         $('#shops-list').append('<li class="item-content shop-page" data-id="'+i +'"">' +
//                                 '<div class="item-inner">' +
//                                     '<div class="item-title">' + shops[i].name  + '</div>'+
//                                 '</div>'+
//                                 '</li>');
//         }
//     }
//     // run createContentPage func after link was clicked
//     // $$('.shop-page').on('click', function () {
//     //     createContentPage();
//     // });
// );


myApp.onPageInit('navi', function (page) {
    // take storeId variable into navigation consideration.
    // will probably draw on canvas
});

function createStorePage(index) {
    var shop = shops[index];
    var name = shop.name;
    var desc = shop.desc;
    var imgUrl = shop.img;
    var lvl = shop.level;
    var tel = shop.tel;

	  mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">' + name + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="shop" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '       <div class="image">' +
        '       <img src="'+ imgUrl +'"></div>' +
        '        <div class="image">' +
        '          <h1>' + name + '</h1>' +
        '          <p>' + desc + '</p>' +
        '          <p>Go <a href="#" class="back">back</a> or navigate to <a href="navigate.html">' + name+ '</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>' +
        '<div class="toolbar">' +
        '  <div class="toolbar-inner">' +
        '    <a href="#" class="link">Link 1</a>' +
        '    <a href="#" class="link">Link 2</a>' +
        '    <a href="#" class="link">Link 3</a>' +
        '  </div>' +
        '</div>'
    );
	return;
}
