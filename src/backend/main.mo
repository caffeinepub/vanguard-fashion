import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    sizes : [Text];
    colors : [Text];
    imageUrls : [Storage.ExternalBlob];
  };

  module Product {
    public func compare(a : Product, b : Product) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
    size : Text;
    color : Text;
  };

  type Cart = {
    items : [CartItem];
  };

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Text, Cart>();
  var nextProductId = 0;

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, sizes : [Text], colors : [Text], imageUrls : [Storage.ExternalBlob]) : async Nat {
    let id = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id;
      name;
      description;
      price;
      sizes;
      colors;
      imageUrls;
    };

    products.add(id, product);
    id;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    let iter = products.values();
    iter.toArray().sort();
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addToCart(userId : Text, productId : Nat, quantity : Nat, size : Text, color : Text) : async () {
    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let cart = switch (carts.get(userId)) {
      case (null) { { items = [] } };
      case (?c) { c };
    };

    let newItem : CartItem = {
      productId;
      quantity;
      size;
      color;
    };

    let newItems = cart.items.concat([newItem]);
    let newCart : Cart = { items = newItems };
    carts.add(userId, newCart);
  };

  public query ({ caller }) func getCart(userId : Text) : async Cart {
    switch (carts.get(userId)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) { cart };
    };
  };
};
