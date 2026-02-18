import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

// Use migration module for upgrade logic
(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type ProductDefinition = {
    name : Text;
    subtitle : ?Text;
    description : Text;
    imageUrl : Text;
    digitalProductUrl : Text;
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

    // Add digitally downloadable default products
    products.add("digital_planner_mastery", {
      name = "Digital Planner Mastery";
      subtitle = ?(
        "Ultimate Bundle: Notion, Goodnotes, Excel & PDF Planners Included!"
      );
      description = "Unlock your productivity potential with this all-in-one digital planning suite. Plan, track, and organize every aspect of your life across platforms.";
      imageUrl = "https://aff0000jivv3ncbobq0g3zdzht2g0bmznizd8p4zn5n35bx5ib8uicqd0yc2/digital_planner_mastery.jpeg";
      digitalProductUrl = "https://icme-cdn.internetcomputer.org/data/digital_planner_mastery.zip";
      price = 15_000_000;
    });
    products.add("canva_templates_empire", {
      name = "Canva Templates Empire";
      subtitle = ?(
        "Mega Bundle: 500+ Templates for Business, Marketing, and Social Media"
      );
      description = "Elevate your design game instantly with this massive Canva template collection. Media kits, workbooks, social graphics, and more for every need!";
      imageUrl = "https://aff0000jivv3ncbobq0g3zdzht2g0bmznizd8p4zn5n35bx5ib8uicqd0yc2/canva_templates_empire.jpeg";
      digitalProductUrl = "https://icme-cdn.internetcomputer.org/data/canva_templates_empire.zip";
      price = 39_000_000;
    });
    products.add("printable_wall_art_studio", {
      name = "Printable Wall Art Studio";
      subtitle = ?(
        "Home Decor Mega Pack: 50 Unique Designs, Ready to Print"
      );
      description = "Transform your space instantly with this collection of modern and classic wall art. High-resolution printable files for every aesthetic.";
      imageUrl = "https://aff0000jivv3ncbobq0g3zdzht2g0bmznizd8p4zn5n35bx5ib8uicqd0yc2/printable_wall_art_studio.jpeg";
      digitalProductUrl = "https://icme-cdn.internetcomputer.org/data/printable_wall_art_studio.zip";
      price = 12_000_000;
    });

    // Add default metadata
    metadata.add("digital_planner_mastery", {
      lastGeneratedTime = Time.now();
      versionTag = "initial v0.2";
    });
    metadata.add("canva_templates_empire", {
      lastGeneratedTime = Time.now();
      versionTag = "initial v0.2";
    });
    metadata.add("printable_wall_art_studio", {
      lastGeneratedTime = Time.now();
      versionTag = "initial v0.2";
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
