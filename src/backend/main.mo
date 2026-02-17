import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type ProductDefinition = {
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat;
  };

  public type ProductMetadata = {
    lastGeneratedTime : Time.Time;
    versionTag : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let products = Map.empty<Text, ProductDefinition>();
  let metadata = Map.empty<Text, ProductMetadata>();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product management
  public shared ({ caller }) func createProduct(id : Text, definition : ProductDefinition, versionTag : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    products.add(id, definition);
    metadata.add(
      id,
      {
        lastGeneratedTime = Time.now();
        versionTag;
      },
    );
  };

  public shared ({ caller }) func populateDefaultProducts() : async () {
    // Only admin should be able to call
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can populate default products");
    };

    products.clear();
    metadata.clear();

    // Add default products
    products.add("tshirt", {
      name = "Internet Computer T-Shirt";
      description = "High-quality cotton t-shirt featuring the Internet Computer logo. Show off your support and look great doing it!";
      imageUrl = "https://aff0000jivv3ncbobq0g3zdzht2g0bmznizd8p4zn5n35bx5ib8uicqd0yc2/ic_tshirt.jpeg";
      price = 25_000_000;
    });
    products.add("mug", {
      name = "Internet Computer Mug";
      description = "High-quality 11oz ceramic mug with the Internet Computer logo.";
      imageUrl = "https://aff0000jivv3ncbobq0g3zdzht2g0bmznizd8p4zn5n35bx5ib8uicqd0yc2/internet_computer_mug.jpeg";
      price = 12_000_000;
    });
    products.add("cap", {
      name = "Internet Computer Cap";
      description = "Adjustable black cap with the Internet Computer logo. Durable and stylish.";
      imageUrl = "https://aff0000jivv3ncbobq0g3zdzht2g0bmznizd8p4zn5n35bx5ib8uicqd0yc2/internet_computer_cap.jpeg";
      price = 12_000_000;
    });

    // Add default metadata
    metadata.add("tshirt", {
      lastGeneratedTime = Time.now();
      versionTag = "initial v0.1";
    });
    metadata.add("mug", {
      lastGeneratedTime = Time.now();
      versionTag = "initial v0.1";
    });
    metadata.add("cap", {
      lastGeneratedTime = Time.now();
      versionTag = "initial v0.1";
    });
  };

  public query func getProduct(id : Text) : async ProductDefinition {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query func getProductMetadata(id : Text) : async ProductMetadata {
    switch (metadata.get(id)) {
      case (null) { Runtime.trap("Metadata not found") };
      case (?meta) { meta };
    };
  };
};
