import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Text, View } from "../components/Themed";
import SkeletonView from "./skeleton/SkeletonView";

export default function TabTwoScreen() {
  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading1(false);
    }, 5000);
    setTimeout(() => {
      setLoading2(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skeleton View</Text>
      <View style={styles.separator} />
      <View style={styles.rowWrapper}>
        <SkeletonView
          loading={loading1}
          colorArray={["#d8d8d8", "gray"]}
          wrapperStyles={{
            width: 300,
            height: 400,
          }}
          contentStyles={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgray",
          }}
        >
          <Text>Made it!</Text>
          <Text>This content took a little longer</Text>
        </SkeletonView>
        <SkeletonView
          loading={loading2}
          colorArray={["gray", "blue"]}
          wrapperStyles={{
            margin: 50,
          }}
          contentStyles={{
            padding: 50,
          }}
        >
          <Text>I loaded faster!</Text>
        </SkeletonView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
