import { useQuery } from "convex/react";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { icons, images } from "../../constants";
import { api } from "../../convex/_generated/api";

const Bookmark = () => {
  const [refreshing, setRefreshing] = useState(false);
  const posts = useQuery(api.videos.getLikedVideos);

  const onRefresh = async () => {
    setRefreshing(true);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <VideoCard
            id={item._id}
            title={item.title}
            creator="Test"
            thumbnail={item.thumbnail}
            avatar={images.profile}
            video={item.video}
            isLiked={item.isLiked}
            actionDisabled={true}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Favourites
                </Text>
              </View>
              <View className="items-center justify-center">
                <Image
                  source={icons.heartFilled}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Bookmark Videos Found" disableButton />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Bookmark;
