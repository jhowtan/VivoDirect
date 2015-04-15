// Initialize your app
var myApp = new Framework7({
    smartSelectSearchbar: true,
    smartSelectInPopup: true,
    swipeBackPage: true
});

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
    $('#promo-aldo').on('click', function () {
        createStorePage(0);
    });
    $$('#promo-uniqlo').on('click', function () {
        createStorePage(140);
    });
    $$('#promo-tangs').on('click', function () {
        createStorePage(201);
    });
    $$('#promo-goldheart').on('click', function () {
        createStorePage(213);
    });
    $$('#ft-levis').on('click', function () {
        createStorePage(123);
    });
    $$('#ft-timber').on('click', function () {
        createStorePage(136);
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
        var shopIndex = $(this).data('id');
        createStorePage(shopIndex);
    });

    $$('.cat-page').on('click', function(){
        var catIndex = $(this).data('id');
        createCatPage(catIndex);
    });
});



myApp.onPageInit('navi', function (page) {
    for (var i=0; i<shops.length; i++) {
      $('#from_dir').append('<option value="'+i+'">'+ shops[i].name +'</option>');
      $('#to_dir').append('<option value="'+i+'">'+ shops[i].name +'</option>');
    }

    $$('.start-route').on('click', function(){
        var shopIndex = $(this).data('id');
        showShopLocation(shopIndex);
    });

    $$('#current').on('click', function(){
      scrollToMiddle('currloc', 'mapcurr');
    })
});

function showShopLocation(id) {
  mainView.router.loadContent()
}


// Dynamic List Creation for Categories
function createCatPage(index) {
  var catShopList = [];
  for (var i=0; i<categories[index].shops.shop.length; i++){
    catShopList.push(categories[index].shops.shop[i]);
  }
  mainView.router.loadContent($('#catPage').html());
  $('#catTitle').html(categories[index].name);
  $('#catName').html(categories[index].name);
  for (var i=0; i< catShopList.length; i++) {
      $('#catShop-list').append('<li class="item-content item-link catShop-page" data-id="'+i+'"">' +
                              '<div class="item-inner">' +
                                  '<div class="item-title">' + catShopList[i].name  + '</div>'+
                              '</div>'+
                              '</li>');
      }
  $$('.catShop-page').on('click', function(){
      var id = $(this).data('id');
      createCatStorePage(id, catShopList);
  });
}

// Create Store Page from Category List
function createCatStorePage(index, catShopList) {
    var shop = catShopList[index];
    var name = shop.name;
    var desc = shop.desc;
    var imgUrl = shop.img;
    var addr = shop.addr;
    var lvl = shop.level;
    var tel = shop.tel;

    mainView.router.loadContent($('#shopPage').html());
    $('#title').html(name);
    $('.card-header-pic').html('<div style="background-image:url(\''+ imgUrl +'\')" valign="top" class="card-header color-black no-border"></div>');
    $('#shopName').html(name);
    $('#location').html('Located at Level '+ lvl + ', Unit: ' + addr);
    $('#shopDesc').html(desc);
    $('#tel').html('<a href="tel:'+tel+'" class="button button-big button-fill color-green">Call</a>');
    $$('.call-alert').on('click', function () {
      myApp.confirm('Call '+ name + '?', tel, function() {
          return true;
        }, function() {
          return true;
        });
    });

    return;
}

// Dynamic Page Injection of Store Information
function createStorePage(index) {
    var shop = shops[index];
    var name = shop.name;
    var desc = shop.desc;
    var imgUrl = shop.img;
    var addr = shop.addr;
    var lvl = shop.level;
    var tel = shop.tel;

    mainView.router.loadContent($('#shopPage').html());
    $('#title').html(name);
    $('.card-header-pic').append('<div style="background-image:url(\''+ imgUrl +'\')" valign="top" class="card-header color-white no-border"></div>');
    $('#shopName').html(name);
    $('#location').html('Located at Level '+ lvl + ', Unit: ' + addr);
    $('#shopDesc').html(desc);
    $('#tel').html('Call ' + tel + '?');

    $$('.call-alert').on('click', function () {
        myApp.confirm('Call '+ name + '?', tel, function() {
          return true;
        }, function() {
          return true;
        });
    });
	return;
}

function scrollToMiddle(containerID, elID)
{
  // If element does not Exist then return
  var el = document.getElementById(elID);
  if (el == null) return console.log('null return');

  // If container does not Exist then return
  var container = document.getElementById(containerID);
  if (container == null) return console.log('nullreturn');

  // Position container at the top line then scroll el into view
  container.scrollTop = 0;
  el.scrollIntoView(true);

  // Scroll back nothing if element is at bottom of container else do it
  // for half the height of the containers display area
  var scrollBack = (container.scrollHeight - container.scrollTop <= container.clientWidth) ? 0 : container.clientWidth/2;
  container.scrollTop = container.scrollTop - scrollBack;
  console.log('Success');
}
