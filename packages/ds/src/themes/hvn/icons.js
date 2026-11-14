/**
 * Maps semantic icon names to free Hugeicons (stroke rounded).
 * These icons are bundled with the theme, not with @astryxdesign/core.
 * The mapping is decided in https://github.com/hvn-oss/ds/issues/22.
 *
 * Plain JS (createElement, no JSX) so the theme source and the built theme module
 * in dist/ can both import `./icons.js`: `astryx integration verify` rebuilds the
 * theme without `--icons-specifier`, so the import must work unchanged in both places.
 */

import { createElement } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  ArrowDown01Icon,
  ArrowDown02Icon,
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  ArrowUp02Icon,
  ArrowUpDownIcon,
  Calendar04Icon,
  Cancel01Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Copy01Icon,
  FilterIcon,
  InformationCircleIcon,
  LayoutThreeColumnIcon,
  LinkSquare02Icon,
  Menu01Icon,
  Mic01Icon,
  MoreHorizontalIcon,
  Search01Icon,
  StopIcon,
  Tick02Icon,
  TickDouble02Icon,
  Upload01Icon,
  ViewOffSlashIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";

/**
 * Keeps the stock 1.5 stroke on the 24 grid, so it scales with the glyph.
 * Never pass `absoluteStrokeWidth`.
 *
 * @param {import("@hugeicons/react").IconSvgElement} icon
 */
const icon = (icon) => createElement(HugeiconsIcon, { icon, size: "1em", "aria-hidden": true });

/** @type {import("@astryxdesign/core/Icon").IconRegistry & Partial<Record<import("@astryxdesign/core/Icon").NamespacedIconName, import("react").ReactNode>>} */
export const hvnIconRegistry = {
  close: icon(Cancel01Icon),
  chevronDown: icon(ArrowDown01Icon),
  chevronLeft: icon(ArrowLeft01Icon),
  chevronRight: icon(ArrowRight01Icon),
  chevronsLeft: icon(ArrowLeftDoubleIcon),
  chevronsRight: icon(ArrowRightDoubleIcon),
  check: icon(Tick02Icon),
  success: icon(CheckmarkCircle02Icon),
  error: icon(CancelCircleIcon),
  warning: icon(Alert02Icon),
  info: icon(InformationCircleIcon),
  calendar: icon(Calendar04Icon),
  clock: icon(Clock01Icon),
  externalLink: icon(LinkSquare02Icon),
  menu: icon(Menu01Icon),
  moreHorizontal: icon(MoreHorizontalIcon),
  search: icon(Search01Icon),
  upload: icon(Upload01Icon),
  arrowUp: icon(ArrowUp02Icon),
  arrowDown: icon(ArrowDown02Icon),
  arrowsUpDown: icon(ArrowUpDownIcon),
  funnel: icon(FilterIcon),
  eyeSlash: icon(ViewOffSlashIcon),
  viewColumns: icon(LayoutThreeColumnIcon),
  copy: icon(Copy01Icon),
  checkDouble: icon(TickDouble02Icon),
  wrench: icon(Wrench01Icon),
  stop: icon(StopIcon),
  microphone: icon(Mic01Icon),
  // The NumberInput stepper, drawn rotated 180° for the up stepper too.
  "numberInput:stepperDown": icon(ArrowDown01Icon),
};
