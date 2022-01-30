import * as React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DataItem, ColumnItem } from "./config";
import styles from "./styles";

export default function Kanban() {
  const [data, setData] = React.useState<Array<ColumnItem>>([]);

  const scrollViewRef = React.useRef();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const absoluteX = useSharedValue(0);
  const absoluteY = useSharedValue(0);

  const movingMode = useSharedValue(false);
  const hoverItem = useSharedValue<DataItem | null>(null);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "https://api.mockaroo.com/api/ebaf4f30?count=100&key=58a2c730",
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
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
      <View style={styles.rowItem}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.genre}</Text>
        <Text>{item.country}</Text>
      </View>
    );
  };

  // function RenderAnimatedItem({ item }: { item: DataItem }) {
  //   const animatedRowStyles = useAnimatedStyle(() => {
  //     return {
  //       // ...(movingMode.value ? { position: "absolute", top: 0, left: 0 } : {}),
  //       transform: [
  //         { translateX: translateX.value },
  //         { translateY: translateY.value },
  //       ],
  //     };
  //   });

  //   const values = hoverItem.value?.id == item.id ? hoverItem.value : item;

  //   // if (movingMode.value && hoverItem.value)
  //   // if (hoverItem.value)
  //   return (
  //     <Animated.View style={[styles.rowItem, animatedRowStyles]}>
  //       <Text>{values.id}</Text>
  //       <Text>{values.title}</Text>
  //       <Text>{values.genre}</Text>
  //       <Text>{values.country}</Text>
  //     </Animated.View>
  //   );
  // }

  const _handleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart: (_, ctx) => {
      console.log("start(), event: ", _);
      movingMode.value = true;
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      console.log("active(), event: ", event);
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (_, __) => {
      console.log("end()");

      movingMode.value = false;
      translateX.value = 0;
      translateY.value = 0;
      absoluteX.value = 0;
      absoluteY.value = 0;
    },
  });

  const animatedRowStyles = useAnimatedStyle(() => {
    return {
      // ...(movingMode.value ? { position: "absolute", top: 0, left: 0 } : {}),
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={_handleGesture}
        // onHandlerStateChange={() => {}}
      >
        {/* <RenderAnimatedItem /> */}
        <>
          <Animated.View style={[styles.rowItem, animatedRowStyles]}>
            <Text>{`id`}</Text>
            <Text>{`title`}</Text>
            <Text>{`genre`}</Text>
            <Text>{`country`}</Text>
          </Animated.View>
          {/* <ScrollView
            horizontal
            contentContainerStyle={styles.kanbanScrollView}
            // ref={scrollViewRef}
          >
            {data.length > 0 &&
              data.map((v) => (
                <FlatList
                  data={v.values}
                  renderItem={RenderItem}
                  keyExtractor={({ id, country }) => `${country}-${id}`}
                  stickyHeaderIndices={[0]}
                  ListHeaderComponent={() => (
                    <Text style={styles.title}>
                      {v.key} ({v.values.length})
                    </Text>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  style={styles.columnFlatlist}
                />
              ))}
          </ScrollView> */}
        </>
      </PanGestureHandler>
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
