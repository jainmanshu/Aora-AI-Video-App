import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import FormField from "../../components/FormField";
import InfoBox from "../../components/InfoBox";
import { icons } from "../../constants";
import { api } from "../../convex/_generated/api";

const Profile = () => {
  const user = useQuery(api.users.getUserInfo);
  const { signOut } = useAuthActions();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity
          onPress={signOut}
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
            title={0}
            subtitle="Posts"
            titleStyles="text-xl"
            containerStyles="mr-10"
          />
          <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
        </View>
      </View>
      <View>
        <FormField title="name" value={user?.name} editable={false} />
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
