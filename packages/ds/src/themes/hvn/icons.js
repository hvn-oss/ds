/**
 * Maps semantic icon names to Lucide icon components.
 * These icons are bundled with the theme, not with @astryxdesign/core.
 *
 * Plain JS (createElement, no JSX) so the theme source and the built theme module
 * in dist/ can both import `./icons.js`: `astryx integration verify` rebuilds the
 * theme without `--icons-specifier`, so the import must work unchanged in both places.
 */

import { createElement } from "react";
import {
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  ExternalLink,
  Menu,
  MoreHorizontal,
  Search,
  Upload,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Filter,
  EyeOff,
  Columns,
  Copy,
  CheckCheck,
  Wrench,
  Square,
  Mic,
} from "lucide-react";

/** @param {import("lucide-react").LucideIcon} Icon */
const icon = (Icon) => createElement(Icon, { size: "1em", "aria-hidden": true });

/** @type {import("@astryxdesign/core/Icon").IconRegistry} */
export const hvnIconRegistry = {
  close: icon(X),
  chevronDown: icon(ChevronDown),
  chevronLeft: icon(ChevronLeft),
  chevronRight: icon(ChevronRight),
  chevronsLeft: icon(ChevronsLeft),
  chevronsRight: icon(ChevronsRight),
  check: icon(Check),
  success: icon(CheckCircle),
  error: icon(XCircle),
  warning: icon(AlertTriangle),
  info: icon(Info),
  calendar: icon(Calendar),
  clock: icon(Clock),
  externalLink: icon(ExternalLink),
  menu: icon(Menu),
  moreHorizontal: icon(MoreHorizontal),
  search: icon(Search),
  upload: icon(Upload),
  arrowUp: icon(ArrowUp),
  arrowDown: icon(ArrowDown),
  arrowsUpDown: icon(ArrowUpDown),
  funnel: icon(Filter),
  eyeSlash: icon(EyeOff),
  viewColumns: icon(Columns),
  copy: icon(Copy),
  checkDouble: icon(CheckCheck),
  wrench: icon(Wrench),
  stop: icon(Square),
  microphone: icon(Mic),
};
