/* jshint devel:true */
console.log('\'Allo \'Allo!');
var shops = [];
var categories = vivocity[0].categories.category;
var cat = [
            "Bags &amp; Shoes",
            "Banks &amp; ATMs",
            "Beauty Essentials",
            "Cafes",
            "Confectionery &amp; Snacks",
            "Convenience Stores",
            "Electrical &amp; Electronics",
            "Entertainment",
            "Fashion",
            "Fashion Accessories",
            "Fast Food",
            "Food Courts",
            "Food Specialties",
            "Gifts &amp; Novelties",
            "Health, Spa &amp; Beauty Services",
            "Home &amp; Lifestyle",
            "Hypermart",
            "Jewellery &amp; Watches",
            "Kids",
            "Money Changer",
            "Optical",
            "Pets",
            "Pharmacy, Health Food and Fitness",
            "Restaurants",
            "Services",
            "Sports &amp; Active Wear",
            "Stationery &amp; Music",
            "Telecommunications",
            "Travel"
          ];

for (var i = 0; i < categories.length-1; i++ ) {
  categories[i].name = cat[i];
  if (i < 3) {
    for (var j=0; j < categories[i].shops.shop.length; j++) {
      categories[i].shops.shop[j].desc = categories[i].shops.shop[j].desc[0];
      shops.push(categories[i].shops.shop[j]);
    }
  }
  else {
    categories[i].shops = categories[i+1].shops;
    for (var k=0; k < categories[i].shops.shop.length; k++) {
      categories[i].shops.shop[k].desc = categories[i].shops.shop[k].desc[0];
      shops.push(categories[i].shops.shop[k]);
    }
  }
}
var options = {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  keys: ["name", "desc"]
};

var fCat = new Fuse(categories, options);
var fShop = new Fuse(shops, options);

