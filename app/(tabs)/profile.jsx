import { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { api } from "../../convex/_generated/api";

const Profile = () => {
  const auth = useConvexAuth();
  console.log(auth);
  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            creator="Test"
            thumbnail={item.thumbnail}
            avatar={images.profile}
            video={item.video}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() =>
          !posts.length && (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query"
            />
          )
        }
      /> */}
    </SafeAreaView>
  );
};

export default Profile;
