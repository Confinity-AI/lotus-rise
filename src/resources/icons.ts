import type { IconType } from "react-icons";
import {
  HiArrowRight,
  HiArrowsPointingOut,
  HiChevronLeft,
  HiChevronRight,
  HiXMark,
} from "react-icons/hi2";

export const iconLibrary: Record<string, IconType> = {
  arrowRight: HiArrowRight,
  expand: HiArrowsPointingOut,
  chevronLeft: HiChevronLeft,
  chevronRight: HiChevronRight,
  close: HiXMark,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
