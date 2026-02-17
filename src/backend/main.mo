import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type CVData = {
    name : Text;
    email : Text;
    phone : Text;
    workExperience : [Text];
    education : [Text];
    skills : [Text];
    photo : ?Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
  };

  let cvDataMap = Map.empty<Principal, CVData>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management Functions
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

  // CV Management Functions
  public shared ({ caller }) func saveCV(cv : CVData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save CVs");
    };
    cvDataMap.add(caller, cv);
  };

  public query ({ caller }) func getCV() : async ?CVData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch their CVs");
    };
    cvDataMap.get(caller);
  };

  public query ({ caller }) func getAllCVs() : async [CVData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can fetch all CVs");
    };
    cvDataMap.values().toArray();
  };

  public shared ({ caller }) func clearCV() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear their CVs");
    };
    cvDataMap.remove(caller);
  };

  public shared ({ caller }) func uploadPhoto(photo : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload photos");
    };
    let existingCV = switch (cvDataMap.get(caller)) {
      case (?cv) { cv };
      case (null) {
        Runtime.trap("CV must exist before adding photo. Please save initial CV data first.");
      };
    };
    let updatedCV : CVData = {
      existingCV with photo = ?photo;
    };
    cvDataMap.add(caller, updatedCV);
  };
};
