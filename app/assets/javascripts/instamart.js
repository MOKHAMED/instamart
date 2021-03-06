window.Instamart = new Backbone.Marionette.Application();

// Namespace
Instamart.Models      = {};
Instamart.Collections = {};
Instamart.Routers     = {};
Instamart.Views       = {};

Instamart.on("start", function () {

  // Models/Collections
  Instamart.currentUser = new Instamart.Models.CurrentUser();
  Instamart.users       = new Instamart.Collections.Users;
  Instamart.carts       = new Instamart.Collections.Carts;
  Instamart.cartItems   = new Instamart.Collections.CartItems;
  Instamart.zones       = new Instamart.Collections.Zones;
  Instamart.stores      = new Instamart.Collections.Stores([], {});
  Instamart.departments = new Instamart.Collections.Departments([], {});
  Instamart.aisles      = new Instamart.Collections.Aisles([], {});
  Instamart.items       = new Instamart.Collections.Items([], {});

  // Sync
  Instamart.currentUser.fetch( {async: false});
  Instamart.users.fetch(       {async: false});
  Instamart.carts.fetch(       {async: false});
  Instamart.cartItems.fetch(   {async: false});
  Instamart.zones.fetch(       {async: false});
  Instamart.stores.fetch(      {async: false});
  Instamart.departments.fetch( {async: false});
  Instamart.aisles.fetch(      {async: false});
  Instamart.items.fetch(       {async: false});

  // Add regions
  if (Instamart.currentUser.isSignedIn()) {
    var indexView = new Instamart.Views.Index;
    indexView.setElement($('body')).render();

    Instamart.addRegions({
      primaryNav         : ".navbar.primary-navbar.ic-collapsible-nav",
      secondaryNav       : ".navbar.secondary-navbar.hide-on-checkout",
      departmentDropdown : "#department-dropdown",
      storeDropdown      : "#warehouse-dropdown",
      cartSidebar        : "#cart-sidebar",
      itemsBoard         : ".items-board-container",
      popularPanel       : ".popular.content-panel",
      aislePanel         : ".span10",
      faqPanel           : ".faq.content-panel",
      listsPanel         : ".lists.content-panel",
      favoritesPanel     : ".favorites.content-panel",
      deliveryPanel      : ".delivery.content-panel",
      paymentPanel       : ".payment.content-panel",
      replacementsPanel  : ".replacements.content-panel",
      expressPanel       : ".new-subscription.content-panel"
    });
  } else {
    var landingView = new Instamart.Views.LandingIndex;
    landingView.setElement($('body')).render();
  }

  // Routers
  Instamart.sessionRouter = new Instamart.Routers.Session({ $rootEl: $('body') });
  Instamart.storeRouter   = new Instamart.Routers.Store({   $rootEl: $('body') });

  // Start Backbone history if not already started
  if (!Backbone.History.started) Backbone.history.start();
});
