import * as React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";
import { DataItem, ColumnItem } from "./config";
import styles from "./styles";

export default function Kanban() {
  const [data, setData] = React.useState<Array<ColumnItem>>([]);

  const scrollViewRef = useAnimatedRef();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "https://api.mockaroo.com/api/ebaf4f30?count=100&key=58a2c730"
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

  const RenderItem = ({ item }: { item: DataItem }) => {
    return (
      <Animated.View style={styles.rowItem} entering={FadeInDown}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.genre}</Text>
        <Text>{item.country}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.kanbanScrollView}>
        {data.length > 0 &&
          data.map((v) => (
            <FlatList
              data={v.values}
              renderItem={RenderItem}
              keyExtractor={({ id }) => `${id}`}
              stickyHeaderIndices={[0, -1]}
              ListHeaderComponent={() => (
                <Text style={styles.title}>
                  {v.key} ({v.values.length})
                </Text>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              style={styles.columnFlatlist}
            />
          ))}
      </ScrollView>
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
