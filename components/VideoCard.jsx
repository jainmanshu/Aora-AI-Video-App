import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const VideoCard = ({
  id,
  title,
  creator,
  avatar,
  thumbnail,
  video,
  isLiked = false,
  handleLiked,
  handleDelete,
  actionDisabled = false,
}) => {
  const [play, setPlay] = useState(false);

  const handleDeleteAlert = () =>
    Alert.alert(
      "Delete Video",
      `Are you sure, you want to delete this video?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: async () => await handleDelete({ id: id }) },
      ]
    );

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={avatar}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>
        {!actionDisabled && (
          <View className="pt-2 flex-row gap-2">
            <TouchableOpacity
              onPress={async () =>
                await handleLiked({ id: id, isLiked: !isLiked })
              }
            >
              <View>
                <Image
                  source={isLiked ? icons.heartFilled : icons.heart}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteAlert}>
              <View>
                <Image
                  source={icons.deleteIcon}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
