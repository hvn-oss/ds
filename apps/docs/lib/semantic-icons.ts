import type { IconName, NamespacedIconName } from "@astryxdesign/core/Icon";

// The hvn icon registry, as the Icons page lists it. The theme holds the glyphs; this holds what the
// page says about each one. `tests/semantic-icons.test.ts` checks it against the theme's registry.

export interface SemanticIcon {
  /** The semantic icon name components ask for, such as `close`. */
  name: IconName | NamespacedIconName;
  /** The `@hugeicons/core-free-icons` export the hvn theme draws for it. */
  hugeicon: string;
  /** Where Astryx core 0.7.11 uses it. */
  usedBy: string;
}

export interface SemanticIconGroup {
  title: string;
  icons: SemanticIcon[];
}

export const SEMANTIC_ICON_GROUPS: SemanticIconGroup[] = [
  {
    title: "Chevrons and arrows",
    icons: [
      {
        name: "chevronDown",
        hugeicon: "ArrowDown01Icon",
        usedBy:
          "Selector, MultiSelector, ComplexSelector, DropdownMenu, SideNav, TopNav, Breadcrumbs, TabMenu, Banner, Chat scroll, touch date fields",
      },
      {
        name: "chevronLeft",
        hugeicon: "ArrowLeft01Icon",
        usedBy:
          "Pagination, Calendar, SideNav collapse, DropdownMenu, ContextMenu, Carousel, TabList, Stepper, Lightbox, touch date fields",
      },
      {
        name: "chevronRight",
        hugeicon: "ArrowRight01Icon",
        usedBy:
          "Pagination, Calendar, CodeBlock, DropdownMenu submenu, TreeList, Carousel, TabList, Stepper, Lightbox, Table tree rows, PowerSearch",
      },
      { name: "chevronsLeft", hugeicon: "ArrowLeftDoubleIcon", usedBy: "Pagination (first page)" },
      { name: "chevronsRight", hugeicon: "ArrowRightDoubleIcon", usedBy: "Pagination (last page)" },
      {
        name: "arrowUp",
        hugeicon: "ArrowUp02Icon",
        usedBy: "Chat send button, Table sort ascending",
      },
      { name: "arrowDown", hugeicon: "ArrowDown02Icon", usedBy: "Table sort descending" },
      { name: "arrowsUpDown", hugeicon: "ArrowUpDownIcon", usedBy: "Table sort (unsorted)" },
    ],
  },
  {
    title: "Status",
    icons: [
      {
        name: "success",
        hugeicon: "CheckmarkCircle02Icon",
        usedBy: "Banner, FieldStatus, selectors and text fields (status), Stepper, Chat tool calls",
      },
      {
        name: "error",
        hugeicon: "CancelCircleIcon",
        usedBy:
          "Banner, FieldStatus, selectors and text fields (status), Stepper, ChatComposer, Chat message and tool call errors",
      },
      {
        name: "warning",
        hugeicon: "Alert02Icon",
        usedBy:
          "Banner, FieldStatus, selectors and text fields (status), TextArea, Stepper, ChatComposer",
      },
      { name: "info", hugeicon: "InformationCircleIcon", usedBy: "InfoTip, Banner" },
    ],
  },
  {
    title: "Actions and objects",
    icons: [
      {
        name: "close",
        hugeicon: "Cancel01Icon",
        usedBy:
          "Token, Thumbnail, Drawer, Dialog, Toast, Banner, Lightbox, MobileNav, input clear button, PowerSearch, Table clear sort",
      },
      {
        name: "check",
        hugeicon: "Tick02Icon",
        usedBy: "CheckIndicator, Typeahead, TabMenu, Table menu, copied confirmations, Chat sent",
      },
      {
        name: "checkDouble",
        hugeicon: "TickDouble02Icon",
        usedBy: "Chat message (delivered, read)",
      },
      {
        name: "search",
        hugeicon: "Search01Icon",
        usedBy:
          "TextInput, Typeahead, panel search, CommandPalette, Tokenizer, ChatComposer, PowerSearch",
      },
      { name: "funnel", hugeicon: "FilterIcon", usedBy: "Table filtering, PowerSearch" },
      {
        name: "menu",
        hugeicon: "Menu01Icon",
        usedBy: "MobileNav toggle, PowerSearch (enum operators)",
      },
      { name: "moreHorizontal", hugeicon: "MoreHorizontalIcon", usedBy: "MoreMenu" },
      { name: "copy", hugeicon: "Copy01Icon", usedBy: "CodeBlock, TimestampHoverCard" },
      { name: "externalLink", hugeicon: "LinkSquare02Icon", usedBy: "Link (external)" },
      { name: "upload", hugeicon: "Upload01Icon", usedBy: "FileInput" },
      {
        name: "calendar",
        hugeicon: "Calendar04Icon",
        usedBy: "DateInput, DateRangeInput, DateTimeInput, PowerSearch (date)",
      },
      {
        name: "clock",
        hugeicon: "Clock01Icon",
        usedBy: "TimeInput, DateTimeInput, PowerSearch (time), Chat pending and sending",
      },
      { name: "wrench", hugeicon: "Wrench01Icon", usedBy: "Chat tool calls" },
      { name: "stop", hugeicon: "StopIcon", usedBy: "Chat send button (stop generating)" },
      { name: "microphone", hugeicon: "Mic01Icon", usedBy: "Chat dictation button" },
      {
        name: "eyeSlash",
        hugeicon: "ViewOffSlashIcon",
        usedBy: "None in core 0.7.11 (required by the registry)",
      },
      {
        name: "viewColumns",
        hugeicon: "Layout3ColumnIcon",
        usedBy: "None in core 0.7.11 (required by the registry)",
      },
    ],
  },
  {
    title: "Specific to NumberInput",
    icons: [
      {
        name: "numberInput:stepperDown",
        hugeicon: "ArrowDown01Icon",
        usedBy: "NumberInput stepper; the up stepper is the same glyph rotated 180°",
      },
    ],
  },
];
