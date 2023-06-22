import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  onPress = undefined,
  text = "",
  customButtonStyle = undefined,
  customTextStyle = undefined,
}) => {
  return (
    <TouchableOpacity
      className={
        customButtonStyle ??
        "flex justify-center p-4 bg-orange-200 rounded-xl border-2 border-blue-950 m-auto"
      }
    >
      <Text
        onPress={onPress}
        className={customTextStyle ?? "text-blue-950 text-2xl font-bold"}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
