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

export interface ColumnItem { key: string | number; values: [DataItem] }

export const COLUMN_WIDTH = Utils.deviceWidth - 10;
