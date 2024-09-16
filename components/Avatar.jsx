import { styled } from "nativewind";
import { Text, View } from "react-native";

// Function to extract initials from a name
const getInitials = (name) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return initials.toUpperCase();
};

// Avatar component
const Avatar = ({ name, size = "md" }) => {
  const initials = getInitials(name);

  // Define size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-4xl",
  };

  // Pick size class based on the size prop
  const avatarSize = sizeClasses[size] || sizeClasses["md"];

  const AvatarView = styled(
    View,
    `rounded-full justify-center items-center bg-orange-400 ${avatarSize}`
  );
  const InitialText = styled(Text, `text-white font-bold`);

  return (
    <AvatarView>
      <InitialText>{initials}</InitialText>
    </AvatarView>
  );
};

export default Avatar;
