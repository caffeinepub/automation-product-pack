import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type OldProductDefinition = {
    name : Text;
    description : Text;
    imageUrl : Text;
    price : Nat;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, { name : Text }>;
    products : Map.Map<Text, OldProductDefinition>;
    metadata : Map.Map<Text, { lastGeneratedTime : Time.Time; versionTag : Text }>;
  };

  type NewProductDefinition = {
    name : Text;
    subtitle : ?Text;
    description : Text;
    imageUrl : Text;
    digitalProductUrl : Text;
    price : Nat;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, { name : Text }>;
    products : Map.Map<Text, NewProductDefinition>;
    metadata : Map.Map<Text, { lastGeneratedTime : Time.Time; versionTag : Text }>;
  };

  public func run(old : OldActor) : NewActor {
    // Migrate products, default missing fields to empty or null values
    let newProducts = old.products.map<Text, OldProductDefinition, NewProductDefinition>(
      func(_id, oldProduct) { { oldProduct with subtitle = null; digitalProductUrl = "" } }
    );
    {
      old with products = newProducts;
    };
  };
};
