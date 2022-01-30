import { Platform } from "react-native";
import Utils from "../../util";

export interface KanbanOptions {
  data: {};
  stickyHeaders: boolean;
  longPressMode: "drag" | "menu" | "custom" | "none";
  longPressCallback?: Function;
  ColumnHeader?: JSX.Element;
  ColumnRow?: JSX.Element;
  ColumnFooter?: JSX.Element;
}

export interface DataItem {
  id: string | number;
  title: string;
  genre: string;
  mature: boolean;
  country: string;
}

export interface ColumnItem {
  key: string | number;
  values: [DataItem];
}

/**
 * TODO
 * Set platform-specific column widths here
 */
const COLUMN_WIDTH_MOBILE = Utils.deviceWidth - 10;
const COLUMN_WIDTH_WEB = 300;

export const COLUMN_WIDTH =
  Platform.OS !== "web" ? COLUMN_WIDTH_MOBILE : COLUMN_WIDTH_WEB;
