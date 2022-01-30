import { Dimensions } from "react-native";

let Utils = {
  deviceWidth: Dimensions.get("window").width,
  deviceHeight: Dimensions.get("window").height,
  isFunction: (func) => {
    return typeof func === "function";
  },
};
export default Utils;
