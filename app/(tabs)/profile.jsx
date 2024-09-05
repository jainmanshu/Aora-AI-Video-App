import { useAuthActions } from "@convex-dev/auth/react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const Profile = () => {
  const { signOut } = useAuthActions();
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <CustomButton
        title="Sign out"
        handlePress={() => void signOut()}
        containerStyles="w-1/2 mt-7"
      />
    </SafeAreaView>
  );
};

export default Profile;
