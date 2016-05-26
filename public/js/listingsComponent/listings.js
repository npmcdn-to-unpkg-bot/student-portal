(function () {
  angular
    .module("student-portal")
    .factory("ListingResource", ListingResource)
    .component("listings", {
      template:     "<ng-outlet></ng-outlet>",
      $routeConfig: [
        {path: "/",     name: "ListingsList",   component: "listingsList", useAsDefault: true},
        {path: "/:id",  name: "ListingsShow",   component: "listingsShow"},
      ]
    })
    .component("listingsList", {
      templateUrl:  "js/listingsComponent/listingsList.html",
      controller:   ListingsListController
    })
    .component("listingsShow", {
      templateUrl:  "js/listingsComponent/listingsShow.html",
      controller:   ListingsShowController
    })
    .component("newListing", {
      templateUrl:  "js/listingsComponent/newListing.html",
      controller:   NewListingController
    })
    // .component("card", {
    //   template: ""
    // })

  ListingResource.$inject         = ["$resource"]
  ListingsListController.$inject  = ["ListingResource"]
  ListingsShowController.$inject  = ["ListingResource"]
  NewListingController.$inject    = ["ListingResource", "$timeout"]

  function ListingResource($resource) {
    return $resource(
        "/api/listings/:id",
        {id: "@id"},
        {
          "update": {method: "PUT"}
        }
      )
  }

  function ListingsListController(ListingResource) {
    var vm = this

    vm.listings = []

    vm.$routerOnActivate = function () {
      ListingResource.query().$promise.then(function (listings){
        vm.listings = listings
      })
    }
  }

  function ListingsShowController(ListingResource) {
    var vm = this

    vm.listing = {}

    vm.$routerOnActivate = function (next) {
      $('.parallax').parallax();

      ListingResource
        .get({id: next.params.id})
        .$promise.then(function(jsonListing) {
          vm.listing = jsonListing
        })
    }
  }

  function NewListingController(ListingResource, $timeout) {
    var vm = this

    vm.states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
    vm.roomTypes = ["Private Room", "Shared Room", "Entire Place"]
    vm.propertyTypes = ["Home", "Apartment", "Loft", "Studio", "Dorm", "Other"]
    vm.newListing = {
      space:{
        accomodates: 1,
        bedrooms: 1,
        bathrooms: 1
      },
      amenities: [
        {description: "Kitchen",       value:    false},
        {description: "Washer in unit",        value:    false},
        {description: "Washer on property",        value:    false},
        {description: "Wifi Included", value:    false},
        {description: "Utilities Included",value: false},
        {description: "Furnished",     value:    false},
        {description: "AC",            value:    false},
        {description: "Heating",       value:    false},
        {description: "Gym",           value:    false},
        {description: "Large Closet",  value:    false},
        {description: "TV Included",   value:    false},
        {description: "Free Parking",  value:    false},
        {description: "Pool",          value:    false}
      ],
      rules: [
        {description: "Smoking",       value:    false},
        {description: "Pets",          value:    false}
      ]
    }

    vm.getA = getA
    vm.addListing = addListing

    function getA(string){
      var vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"]
      if (vowels.indexOf(string[0]) === -1) {
        return "a " + string
      } else {
        return "an " + string
      }
    }

    function addListing() {
      console.log(vm.newListing)
    }

    //initilize materialize elements
    $timeout(function () {
      $('select').material_select()
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onClose: function() {
            $('.datepicker').blur();
        }
      })
    })



  }

})()
