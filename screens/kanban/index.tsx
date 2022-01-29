import * as React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { DataItem, COLUMN_WIDTH } from "./config";
// import styles from "./styles";

export default function Kanban() {
  const [data, setData] = React.useState<Array<DataItem>>([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "https://api.mockaroo.com/api/ebaf4f30?count=100&key=58a2c730"
    );
    const json = await response.json();
    setData([...json]);
  }

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { borderColor: "green", borderWidth: 1 },
      ]}
    >
      <ScrollView
        contentContainerStyle={{ borderColor: "red", borderWidth: 1 }}
      >
        {data.length > 0 &&
          data.map((v) => (
            <FlatList
              data={data}
              renderItem={RenderItem}
              style={{ width: COLUMN_WIDTH, height: "100%" }}
              // stickyHeaderIndices={stickyHeaders ? [0] : undefined}
              // ListHeaderComponent={ColumnHeader || null}
              // ListFooterComponent={ColumnFooter || null}
            />
          ))}
      </ScrollView>
    </View>
  );
}

function RenderItem({ item }: { item: DataItem }) {
  return (
    <View style={{ width: "100%", height: "100%", padding: 5, margin: 5 }}>
      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
      <Text>{item.genre}</Text>
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
