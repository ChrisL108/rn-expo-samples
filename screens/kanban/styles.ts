import { StyleSheet } from "react-native";
import { COLUMN_WIDTH } from "./config";

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    borderColor: "yellow",
    borderWidth: 2,
    backgroundColor: "lightgray",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "gray",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    borderTopColor: "gray",
  },
  kanbanScrollView: {
    // borderColor: "red", borderWidth: 2
    // overflow: "hidden",
  },
  columnFlatlist: {
    width: COLUMN_WIDTH,
    backgroundColor: "lightgray",
    // borderRightColor: "gray",
    // borderRightWidth: 1,
  },
  rowItem: {
    // flex: 1,
    padding: 20,
    margin: 10,
    // borderColor: "blue",
    // borderWidth: 1,
  },
});

export default styles;
