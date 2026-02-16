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

  public query ({ caller }) func getProduct(id : Text) : async ProductDefinition {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductMetadata(id : Text) : async ProductMetadata {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view product metadata");
    };

    switch (metadata.get(id)) {
      case (null) { Runtime.trap("Metadata not found") };
      case (?meta) { meta };
    };
  };
};
