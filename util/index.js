import { Dimensions } from "react-native";

let Utils = {
  deviceWidth: Dimensions.get("window").width,
  deviceHeight: Dimensions.get("window").height,
  isFunction: (func) => {
    return typeof func === "function";
  },
  // groupDataByKey: (list, key, { omitKey = false }) => {
  //   console.log("groupDataByKey() params: ", { list, key });

  //   return list;
  // },
  groupDataByKey: (list, key, { omitKey = false }) =>
    list?.reduce(
      (hash, { [key]: value, ...rest }) => ({
        ...hash,
        [value]: (hash[value] || []).concat(
          omitKey ? { ...rest } : { [key]: value, ...rest }
        ),
      }),
      {}
    ),

  groupDataByKey: (xs, key) => {
    return xs.reduce(function (rv, x) {
      let v = key instanceof Function ? key(x) : x[key];
      let el = rv.find((r) => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      }
      return rv;
    });
  },
};
export default Utils;
