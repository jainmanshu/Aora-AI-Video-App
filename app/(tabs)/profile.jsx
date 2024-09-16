import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import InfoBox from "../../components/InfoBox";
import { icons } from "../../constants";
import { api } from "../../convex/_generated/api";

const Profile = () => {
  const user = useQuery(api.users.getUserInfo);
  const { signOut } = useAuthActions();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useMutation(api.users.updateUserInfo);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await updateUser({ name, phone });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
      // Optionally, you can show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full flex justify-center items-center mt-3 mb-6 px-4">
          <TouchableOpacity
            onPress={handleSignOut}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border rounded-lg flex justify-center items-center">
            <Avatar name="Son Goku" size="xl" />
          </View>

          <InfoBox
            title={user?.name}
            containerStyles="mt-5"
            titleStyles="text-lg"
          />
          <View className="mt-5 flex flex-row">
            <InfoBox
              title={user?.userPostsCount}
              subtitle="Posts"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
          </View>
        </View>
        <View className="px-4 pb-6">
          <FormField
            title="Name"
            value={name}
            handleChangeText={setName}
            editable={isEditing}
            otherStyles="mb-4"
          />
          <FormField
            title="Email"
            value={user?.email}
            editable={false}
            otherStyles="mb-4"
          />
          <FormField
            title="Phone"
            value={phone}
            handleChangeText={setPhone}
            editable={isEditing}
            otherStyles="mb-4"
          />
          <CustomButton
            title={isEditing ? "Submit" : "Edit"}
            handlePress={isEditing ? handleSubmit : () => setIsEditing(true)}
            containerStyles="mt-4"
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
