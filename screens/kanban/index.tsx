import * as React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Utils from "../../util";
import { DataItem, COLUMN_WIDTH, ColumnItem } from "./config";
// import styles from "./styles";

export default function Kanban() {
  const [data, setData] = React.useState<Array<ColumnItem>>([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "https://api.mockaroo.com/api/ebaf4f30?count=500&key=58a2c730"
    );
    const json = await response.json();
    const groupedData: any = [];
    const key = "country";
    for (let row of json) {
      const idx = groupedData.findIndex((v: any) => v && v.key == row[key]);
      if (idx == -1) {
        groupedData.push({ key: row[key], values: [row] });
      } else {
        groupedData[idx].values.push(row);
      }
    }
    console.log("groupedData: ", groupedData);
    setData(groupedData);
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        // { borderColor: "yellow", borderWidth: 2, backgroundColor: "lightgray" },
      ]}
    >
      <ScrollView
        horizontal
        // contentContainerStyle={{ borderColor: "red", borderWidth: 2 }}
      >
        {data.length > 0 &&
          data.map((v) => (
            <FlatList
              data={v.values}
              renderItem={RenderItem}
              keyExtractor={({ id }) => `${id}`}
              stickyHeaderIndices={[0, -1]}
              ListHeaderComponent={() => (
                <Text
                  style={{
                    textAlign: "center",
                    padding: 10,
                    fontWeight: "bold",
                    backgroundColor: "gray",
                    color: "white",
                  }}
                >
                  {v.key} ({v.values.length})
                </Text>
              )}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    borderTopColor: "gray",
                    borderTopWidth: 1,
                  }}
                />
              )}
              style={{
                width: COLUMN_WIDTH,
                backgroundColor: "lightgray",
                // borderRightColor: "gray",
                // borderRightWidth: 1,
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

function RenderItem({ item }: { item: DataItem }) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        margin: 0,
        // borderColor: "blue",
        // borderWidth: 1,
      }}
    >
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
      <Text>{item.genre}</Text>
      <Text>{item.country}</Text>
    </View>
  );
}

/* 

* PROPS

- data - Object<{ id: "", groupColumnsBy: "", data: [] }>
- stickyHeaders - boolean
- [custom element styles] - Objects
- longPressMode - "drag" | "menu" | "custom"
- longPressCallback - fn()
- ColumnHeader
- ColumnRow
- ColumnFooter




*/
