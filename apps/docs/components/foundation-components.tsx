import { useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Center } from "@astryxdesign/core/Center";
import { Code } from "@astryxdesign/core/Code";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { Divider } from "@astryxdesign/core/Divider";
import {
  DropdownMenu,
  DropdownMenuContext,
  DropdownMenuItem,
} from "@astryxdesign/core/DropdownMenu";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@astryxdesign/core/Table";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Theme } from "@astryxdesign/core/theme";
import { ToggleButton } from "@astryxdesign/core/ToggleButton";
import { VStack } from "@astryxdesign/core/VStack";
import {
  controlSizes,
  docsTheme,
  formatColour,
  formatLength,
  iconStroke,
  MODE_LABELS,
  MODES,
  splitLayers,
  tokenValue,
  touchCondition,
  touchTokens,
  typeStyleValues,
  type ControlSize,
  type Mode,
} from "#/lib/foundations.ts";
import { SEMANTIC_ICON_GROUPS } from "#/lib/semantic-icons.ts";

// MDX components for the Foundations pages. Swatches and specimens draw with the theme's tokens,
// and values are resolved from the same theme, so the pages always show what the theme ships.

const SWATCH_SIZE = "var(--spacing-8)";

const fill = (token: string): CSSProperties => ({ backgroundColor: `var(${token})` });

/** An empty box, for swatches and specimens drawn only by their styles. */
function Chip(props: Omit<ComponentProps<typeof Center>, "children">) {
  return <Center {...props}>{null}</Center>;
}

/** Renders its children in one colour mode, whatever mode the page is in. */
function InMode({ mode, children }: { mode: Mode; children: ReactNode }) {
  return (
    <Theme theme={docsTheme} mode={mode}>
      {children}
    </Theme>
  );
}

/** The same content in a captioned Light panel and a Dark panel. */
export function ModePanels({ children }: { children: ReactNode }) {
  return (
    <Grid columns={{ minWidth: 280, max: 2 }} gap={4}>
      {MODES.map((mode) => (
        <VStack key={mode} gap={2}>
          <Text type="supporting" weight="semibold" color="secondary">
            {MODE_LABELS[mode]}
          </Text>
          <InMode mode={mode}>
            <Card padding={4} height="100%">
              {children}
            </Card>
          </InMode>
        </VStack>
      ))}
    </Grid>
  );
}

type SwatchKind = "fill" | "text" | "icon" | "border";

/** Text on a fixed dark or light surface is drawn on the opposite fixed colour. */
const SURFACE_FOR_TEXT: Record<string, string> = {
  "--color-on-dark": "--color-on-light",
  "--color-on-light": "--color-on-dark",
};

/** One token drawn in the current mode: a filled chip, sample text, an icon or an outline. */
function Swatch({ token, kind }: { token: string; kind: SwatchKind }) {
  const box: CSSProperties = { borderRadius: "var(--radius-inner)" };

  switch (kind) {
    case "fill":
      return (
        <Chip
          width={SWATCH_SIZE}
          height={SWATCH_SIZE}
          className="border border-border"
          style={{ ...box, ...fill(token) }}
        />
      );
    case "border":
      return (
        <Chip
          width={SWATCH_SIZE}
          height={SWATCH_SIZE}
          className="bg-surface"
          style={{ ...box, border: `var(--border-width) solid var(${token})` }}
        />
      );
    case "text":
    case "icon":
      return (
        <Center
          width={SWATCH_SIZE}
          height={SWATCH_SIZE}
          className="border border-border bg-surface"
          style={{
            ...box,
            ...(SURFACE_FOR_TEXT[token] && fill(SURFACE_FOR_TEXT[token])),
            color: `var(${token})`,
          }}
        >
          {kind === "text" ? (
            <Text type="inherit" color="inherit" weight="medium">
              Aa
            </Text>
          ) : (
            <Icon icon="search" size="sm" />
          )}
        </Center>
      );
  }
}

/** A token's swatch and resolved value in one mode. */
function ModeValue({ token, kind, mode }: { token: string; kind: SwatchKind; mode: Mode }) {
  return (
    <HStack gap={2} vAlign="center">
      <InMode mode={mode}>
        <Swatch token={token} kind={kind} />
      </InMode>
      <Text type="supporting" color="primary" hasTabularNumbers>
        {formatColour(tokenValue(token, mode))}
      </Text>
    </HStack>
  );
}

/** Colour tokens as rows: each token's swatch and value in light and dark mode. */
export function ColourTokens({ tokens, kind = "fill" }: { tokens: string[]; kind?: SwatchKind }) {
  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Token</TableHeaderCell>
          {MODES.map((mode) => (
            <TableHeaderCell key={mode}>{MODE_LABELS[mode]}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token) => (
          <TableRow key={token}>
            <TableCell>
              <Code>{token}</Code>
            </TableCell>
            {MODES.map((mode) => (
              <TableCell key={mode}>
                <ModeValue token={token} kind={kind} mode={mode} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const CATEGORICAL_HUES = [
  "blue",
  "cyan",
  "gray",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
] as const;

/** A tag drawn from one hue's four categorical tokens. */
function CategoricalTag({ hue }: { hue: (typeof CATEGORICAL_HUES)[number] }) {
  return (
    <HStack
      gap={1}
      vAlign="center"
      paddingInline={2}
      paddingBlock={0.5}
      style={{
        ...fill(`--color-background-${hue}`),
        border: `var(--border-width) solid var(--color-border-${hue})`,
        borderRadius: "var(--radius-inner)",
        color: `var(--color-text-${hue})`,
      }}
    >
      <Icon icon="info" size="sm" color={hue} />
      <Text type="supporting" color="inherit" weight="medium">
        Label
      </Text>
    </HStack>
  );
}

/** Each categorical hue as a tag in light and dark mode. */
export function CategoricalColours() {
  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Hue</TableHeaderCell>
          {MODES.map((mode) => (
            <TableHeaderCell key={mode}>{MODE_LABELS[mode]}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {CATEGORICAL_HUES.map((hue) => (
          <TableRow key={hue}>
            <TableCell>
              <Code>{hue}</Code>
            </TableCell>
            {MODES.map((mode) => (
              <TableCell key={mode}>
                <InMode mode={mode}>
                  <HStack>
                    <CategoricalTag hue={hue} />
                  </HStack>
                </InMode>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const DATA_RAMPS = [
  "blue",
  "shamrock",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "yellow",
  "gray",
] as const;

const RAMP_STEPS = [1, 2, 3, 4, 5];

/** Each sequential ramp's five steps, lowest first, in light and dark mode. */
export function DataRamps() {
  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Ramp</TableHeaderCell>
          {MODES.map((mode) => (
            <TableHeaderCell key={mode}>{MODE_LABELS[mode]}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {DATA_RAMPS.map((ramp) => (
          <TableRow key={ramp}>
            <TableCell>
              <Code>{`--color-data-${ramp}-1…5`}</Code>
            </TableCell>
            {MODES.map((mode) => (
              <TableCell key={mode}>
                <InMode mode={mode}>
                  <HStack gap={0} className="bg-surface" padding={1}>
                    {RAMP_STEPS.map((step) => (
                      <Chip
                        key={step}
                        width={SWATCH_SIZE}
                        height={SWATCH_SIZE}
                        style={fill(`--color-data-${ramp}-${step}`)}
                      />
                    ))}
                  </HStack>
                </InMode>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const SYNTAX_SAMPLE = `// Sends a reminder for each overdue invoice.
import { sendReminder } from "./mail";

const GRACE_DAYS = 3;

export async function remind(invoices: Invoice[]): Promise<number> {
  const overdue = invoices.filter((invoice) => invoice.daysLate > GRACE_DAYS);
  for (const invoice of overdue) await sendReminder(invoice.contact, "overdue");
  return overdue.length;
}

export const Badge = () => <span className="badge">Overdue</span>;`;

/** A code sample in the theme's syntax colours, in light and dark mode. */
export function SyntaxSample() {
  return (
    <VStack gap={4}>
      {MODES.map((mode) => (
        <VStack key={mode} gap={2}>
          <Text type="supporting" weight="semibold" color="secondary">
            {MODE_LABELS[mode]}
          </Text>
          <InMode mode={mode}>
            <CodeBlock code={SYNTAX_SAMPLE} language="tsx" width="100%" />
          </InMode>
        </VStack>
      ))}
    </VStack>
  );
}

const FONT_FAMILIES = [
  { role: "Text and headings", tokens: ["--font-family-body", "--font-family-heading"] },
  { role: "Code", tokens: ["--font-family-code"] },
];

/** The first family in a font stack: `"Inter Variable", -apple-system, …` → `Inter Variable`. */
function firstFamily(stack: string): string {
  return stack.split(",")[0].trim().replace(/^"|"$/g, "");
}

/** The theme's font families, each drawn in its own face. */
export function FontFamilies() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Family</TableHeaderCell>
          <TableHeaderCell>Tokens</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {FONT_FAMILIES.map(({ role, tokens }) => (
          <TableRow key={role}>
            <TableCell>{role}</TableCell>
            <TableCell>
              <Text size="2xl" style={{ fontFamily: `var(${tokens[0]})` }}>
                {firstFamily(tokenValue(tokens[0], "light"))}
              </Text>
            </TableCell>
            <TableCell>
              <VStack gap={1}>
                {tokens.map((token) => (
                  <Code key={token}>{token}</Code>
                ))}
              </VStack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface TypeStyle {
  style: string;
  name: string;
  usage: string;
  specimen: ReactNode;
}

const TYPE_STYLES: TypeStyle[] = [
  ...([1, 2, 3] as const).map((n) => ({
    style: `display-${n}`,
    name: `Display ${n}`,
    usage: [
      "Largest display: marketing heroes.",
      "Hero sections and prominent callouts.",
      "Smallest display, above heading 1.",
    ][n - 1],
    // A short specimen, so display 1 fits its column.
    specimen: <Text type={`display-${n}`}>Aa</Text>,
  })),
  ...([1, 2, 3, 4, 5, 6] as const).map((level) => ({
    style: `heading-${level}`,
    name: `Heading ${level}`,
    usage: [
      "Page title. One per page.",
      "Section header.",
      "Content header inside a section.",
      "Group header. Matches label.",
      "Sub-group header.",
      "Smallest heading.",
    ][level - 1],
    specimen: <Heading level={level}>Heading {level}</Heading>,
  })),
  {
    style: "large",
    name: "Large",
    usage: "Larger body text for emphasis.",
    specimen: <Text type="large">Large</Text>,
  },
  {
    style: "body",
    name: "Body",
    usage: "The bulk of the content.",
    specimen: <Text>Body</Text>,
  },
  {
    style: "label",
    name: "Label",
    usage: "Form labels, list group headers and table column headers.",
    specimen: <Text type="label">Label</Text>,
  },
  {
    style: "code",
    name: "Code",
    usage: "Monospaced code text.",
    specimen: <Text type="code">Code</Text>,
  },
  {
    style: "supporting",
    name: "Supporting",
    usage: "Supporting details and help text.",
    specimen: <Text type="supporting">Supporting</Text>,
  },
];

/** Every type style as a specimen with its desktop size, line height and weight. */
export function TypeStyles() {
  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Style</TableHeaderCell>
          <TableHeaderCell>Specimen</TableHeaderCell>
          <TableHeaderCell>Size / line</TableHeaderCell>
          <TableHeaderCell>Weight</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TYPE_STYLES.map(({ style, name, usage, specimen }) => {
          const values = typeStyleValues(style);
          return (
            <TableRow key={style}>
              <TableCell>
                <VStack gap={0.5}>
                  <Text weight="medium">{name}</Text>
                  <Code>{`--text-${style}-*`}</Code>
                  <Text type="supporting">{usage}</Text>
                </VStack>
              </TableCell>
              {/* Specimens repeat the style's name, and heading specimens would add to the
                  page's outline, so assistive tech skips them. */}
              <TableCell>
                <VStack aria-hidden>{specimen}</VStack>
              </TableCell>
              <TableCell>
                <Text hasTabularNumbers>
                  {values.size} / {values.leading}
                </Text>
              </TableCell>
              <TableCell>
                <Text hasTabularNumbers>{values.weight}</Text>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

/** Each control size's height at the desktop scale and under the touch rule. */
export function ControlSizes() {
  return (
    <VStack gap={2}>
      <Table density="compact">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Size</TableHeaderCell>
            <TableHeaderCell>Token</TableHeaderCell>
            <TableHeaderCell>Desktop</TableHeaderCell>
            <TableHeaderCell>Touch</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {controlSizes().map(({ size, token, desktop, touch }) => (
            <TableRow key={size}>
              <TableCell>
                <Code>{size}</Code>
              </TableCell>
              <TableCell>
                <Code>{token}</Code>
              </TableCell>
              <TableCell>
                <Text hasTabularNumbers>{desktop}px</Text>
              </TableCell>
              <TableCell>
                <Text hasTabularNumbers>{touch}px</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Text type="supporting">Touch applies on: {touchCondition()}.</Text>
    </VStack>
  );
}

/** Draws its children at touch size, whatever the pointer, with the touch rule's tokens. */
function AtTouchSize({ children }: { children: ReactNode }) {
  return (
    <HStack vAlign="center" style={touchTokens() as CSSProperties}>
      {children}
    </HStack>
  );
}

type ControlSizeName = ControlSize["size"];

/** A menu row drawn on its own, outside a popover. */
function MenuRow({ size }: { size: ControlSizeName }) {
  // The row is drawn at hover, as in the Design file, so its box shows. A menu row paints its
  // hover on focus, which follows the pointer, so the fill is set here with the same token.
  return (
    <DropdownMenuContext value={{ closeMenu: () => {}, menuSize: size }}>
      <VStack role="menu" aria-label="Edit">
        <DropdownMenuItem
          label="Duplicate"
          icon="copy"
          style={{ backgroundColor: "var(--color-overlay-hover)" }}
        />
      </VStack>
    </DropdownMenuContext>
  );
}

const ACTION_CONTROLS: {
  name: string;
  variant: string;
  render: (size: ControlSizeName) => ReactNode;
}[] = [
  {
    name: "Button",
    variant: "secondary",
    render: (size) => <Button label="Button" size={size} />,
  },
  {
    name: "ToggleButton",
    variant: "toggled",
    render: (size) => (
      <ToggleButton label="Filter" size={size} isPressed>
        Filter
      </ToggleButton>
    ),
  },
  {
    name: "SegmentedControl",
    variant: "label",
    render: (size) => (
      <SegmentedControl label="View" value="list" onChange={() => {}} size={size}>
        <SegmentedControlItem value="list" label="List" />
        <SegmentedControlItem value="board" label="Board" />
      </SegmentedControl>
    ),
  },
  {
    name: "Menu row",
    variant: "DropdownMenu · hover",
    render: (size) => <MenuRow size={size} />,
  },
  {
    name: "Dropdown trigger",
    variant: "DropdownMenu · secondary",
    render: (size) => (
      <DropdownMenu
        button={{ label: "Options", size }}
        items={[{ label: "Rename" }, { label: "Duplicate" }]}
      />
    ),
  },
];

/** Each sized Action control at every size, drawn at the desktop scale and at touch size. */
export function ActionTouchSizes() {
  const sizes = controlSizes();

  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Control</TableHeaderCell>
          <TableHeaderCell>Size</TableHeaderCell>
          <TableHeaderCell>Desktop</TableHeaderCell>
          <TableHeaderCell>Touch</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ACTION_CONTROLS.flatMap(({ name, variant, render }) =>
          sizes.map(({ size, desktop, touch }, index) => (
            <TableRow key={`${name}-${size}`}>
              {index === 0 && (
                <TableCell rowSpan={sizes.length}>
                  <VStack gap={0.5}>
                    <Text weight="medium">{name}</Text>
                    <Text type="supporting">{variant}</Text>
                  </VStack>
                </TableCell>
              )}
              <TableCell>
                <Code>{size}</Code>
                <Text type="supporting" display="inline" hasTabularNumbers>
                  {` ${desktop} → ${touch}`}
                </Text>
              </TableCell>
              <TableCell>
                <HStack vAlign="center">{render(size)}</HStack>
              </TableCell>
              <TableCell>
                <AtTouchSize>{render(size)}</AtTouchSize>
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}

/** The text colour roles on light and dark surfaces. */
export function TextColours() {
  const roles = [
    { color: "primary", text: "Invoices due this week" },
    { color: "secondary", text: "Sent 3 days ago · reminder scheduled for Friday" },
    { color: "accent", text: "View invoice" },
    { color: "disabled", text: "Mark as paid (awaiting approval)" },
  ] as const;

  return (
    <ModePanels>
      <VStack gap={3}>
        {roles.map(({ color, text }) => (
          <VStack key={color} gap={0.5}>
            <Text color={color}>{text}</Text>
            <Code>{`--color-text-${color}`}</Code>
          </VStack>
        ))}
      </VStack>
    </ModePanels>
  );
}

const RADII = [
  { name: "None", token: "--radius-none", usage: "No rounding: sections, headers and dividers." },
  {
    name: "Inner",
    token: "--radius-inner",
    usage: "Checkboxes and inner corners of grouped controls.",
  },
  {
    name: "Element",
    token: "--radius-element",
    usage: "Buttons, inputs, selectors and segment items.",
  },
  {
    name: "Container",
    token: "--radius-container",
    usage: "Cards, menus, popovers, toasts and dialogs.",
  },
  { name: "Page", token: "--radius-page", usage: "The AppShell main surface." },
  { name: "Chat", token: "--radius-chat", usage: "Chat bubbles, composer and drawer." },
  {
    name: "Full",
    token: "--radius-full",
    usage: "Pills: badges, chips and segment tracks. Never buttons.",
  },
];

/** The radius scale, each step drawn on a square. */
export function RadiusScale() {
  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Radius</TableHeaderCell>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Value</TableHeaderCell>
          <TableHeaderCell>Specimen</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {RADII.map(({ name, token, usage }) => (
          <TableRow key={token}>
            <TableCell>
              <VStack gap={0.5}>
                <Text weight="medium">{name}</Text>
                <Text type="supporting">{usage}</Text>
              </VStack>
            </TableCell>
            <TableCell>
              <Code>{token}</Code>
            </TableCell>
            <TableCell>
              <Text hasTabularNumbers>{formatLength(tokenValue(token, "light"))}</Text>
            </TableCell>
            <TableCell>
              <Chip
                width="var(--spacing-12)"
                height="var(--spacing-12)"
                className="border border-border-strong bg-muted"
                style={{ borderRadius: `var(${token})` }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/** Hairlines and control outlines, drawn by live components in light and dark mode. */
export function BorderSamples() {
  return (
    <ModePanels>
      <VStack gap={4}>
        <VStack gap={2}>
          <Text>Acme Corp</Text>
          <Divider />
          <Text>Northwind</Text>
        </VStack>
        <TextInput label="Search invoices" value="" onChange={() => {}} placeholder="Search" />
        <TextInput
          label="Email"
          value="acme@"
          onChange={() => {}}
          status={{ type: "error", message: "Enter a full email address." }}
        />
        <HStack gap={2}>
          <Button label="Schedule" />
          <Button label="Send" variant="primary" />
        </HStack>
      </VStack>
    </ModePanels>
  );
}

const SHADOWS = [
  { token: "--shadow-low", name: "Low", usage: "Menus and popovers." },
  { token: "--shadow-med", name: "Med", usage: "Toasts." },
  { token: "--shadow-high", name: "High", usage: "Dialogs." },
];

/** The elevation scale on floating surfaces, plus the selected segment, in light and dark mode. */
export function ShadowSamples() {
  const [segment, setSegment] = useState("week");

  return (
    <ModePanels>
      <VStack gap={6}>
        <Grid columns={3} gap={4}>
          {SHADOWS.map(({ token, name }) => (
            <Center
              key={token}
              height="var(--spacing-12)"
              className="bg-popover"
              style={{ borderRadius: "var(--radius-container)", boxShadow: `var(${token})` }}
            >
              <Text type="supporting" color="primary">
                {name}
              </Text>
            </Center>
          ))}
        </Grid>
        <SegmentedControl label="Range" value={segment} onChange={setSegment}>
          <SegmentedControlItem value="day" label="Day" />
          <SegmentedControlItem value="week" label="Week" />
          <SegmentedControlItem value="month" label="Month" />
        </SegmentedControl>
      </VStack>
    </ModePanels>
  );
}

/** The shadow tokens, what each is for, and each layer of its value. */
export function ShadowTokens() {
  return (
    <Table density="compact" verticalAlign="top">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Token</TableHeaderCell>
          <TableHeaderCell>Layers</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SHADOWS.map(({ token, usage }) => (
          <TableRow key={token}>
            <TableCell>
              <VStack gap={0.5}>
                <Code>{token}</Code>
                <Text type="supporting">{usage}</Text>
              </VStack>
            </TableCell>
            <TableCell>
              <VStack gap={1}>
                {splitLayers(tokenValue(token, "light")).map((layer) => (
                  <Text key={layer} type="supporting" color="primary">
                    {layer}
                  </Text>
                ))}
              </VStack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const ICON_SIZES = [
  { size: "xsm", px: 12 },
  { size: "sm", px: 16 },
  { size: "md", px: 20, isDefault: true },
  { size: "lg", px: 24 },
] as const;

const SIZE_SPECIMENS = ["search", "calendar", "upload", "success"] as const;

/** Every icon size with its glyph and stroke, at a 16px root. */
export function IconSizes() {
  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Size</TableHeaderCell>
          <TableHeaderCell>Glyph</TableHeaderCell>
          <TableHeaderCell>Stroke</TableHeaderCell>
          <TableHeaderCell>Specimen</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ICON_SIZES.map(({ size, px, ...rest }) => (
          <TableRow key={size}>
            <TableCell>
              <Code>{size}</Code>
              {"isDefault" in rest && (
                <Text type="supporting" display="inline">
                  {" "}
                  (default)
                </Text>
              )}
            </TableCell>
            <TableCell>
              <Text hasTabularNumbers>{px}px</Text>
            </TableCell>
            <TableCell>
              <Text hasTabularNumbers>{iconStroke(px)}</Text>
            </TableCell>
            <TableCell>
              <HStack gap={3} vAlign="center">
                {SIZE_SPECIMENS.map((icon) => (
                  <Icon key={icon} icon={icon} size={size} color="primary" />
                ))}
              </HStack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const INLINE_ICON_ROLES = [
  { color: "primary", icon: "search", label: "Search" },
  { color: "secondary", icon: "calendar", label: "Schedule" },
  { color: "accent", icon: "externalLink", label: "Changelog" },
  { color: "disabled", icon: "upload", label: "Upload" },
] as const;

const STATUS_ICON_ROLES = [
  { color: "success", label: "Invoice sent to Acme" },
  { color: "error", label: "Payment failed" },
  { color: "warning", label: "Card expires in 3 days" },
  { color: "info", label: "Sync runs every hour" },
] as const;

const FEATURE_HUES = ["blue", "green", "orange", "purple", "pink", "teal"] as const;

/** The three ways an icon takes colour, in light and dark mode. */
export function IconColours() {
  return (
    <ModePanels>
      <VStack gap={5}>
        <VStack gap={2}>
          <Text type="supporting" weight="semibold">
            Inline
          </Text>
          {INLINE_ICON_ROLES.map(({ color, icon, label }) => (
            <HStack key={color} gap={2} vAlign="center">
              <Icon icon={icon} color={color} />
              <Text color={color === "disabled" ? "disabled" : "primary"}>{label}</Text>
              <Code>{color}</Code>
            </HStack>
          ))}
        </VStack>
        <VStack gap={2}>
          <Text type="supporting" weight="semibold">
            Status
          </Text>
          {STATUS_ICON_ROLES.map(({ color, label }) => (
            <HStack key={color} gap={2} vAlign="center">
              <Icon icon={color} color={color} />
              <Text>{label}</Text>
            </HStack>
          ))}
        </VStack>
        <VStack gap={2}>
          <Text type="supporting" weight="semibold">
            Feature
          </Text>
          <HStack gap={2} wrap="wrap">
            {FEATURE_HUES.map((hue) => (
              <Center
                key={hue}
                width="var(--spacing-10)"
                height="var(--spacing-10)"
                style={{
                  ...fill(`--color-background-${hue}`),
                  borderRadius: "var(--radius-element)",
                }}
              >
                <Icon icon="info" color={hue} label={hue} />
              </Center>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </ModePanels>
  );
}

type StatusIcon = "success" | "error" | "warning" | "info";

/** Status icons are drawn in their status colour, as in the Design file; the rest in primary. */
const STATUS_ICONS = new Set<string>([
  "success",
  "error",
  "warning",
  "info",
] satisfies StatusIcon[]);

/** One group of the semantic icon mapping: each name, its glyph, its Hugeicon and its users. */
export function SemanticIcons({ group }: { group: string }) {
  const icons = SEMANTIC_ICON_GROUPS.find((candidate) => candidate.title === group)?.icons;
  if (!icons) {
    const titles = SEMANTIC_ICON_GROUPS.map((candidate) => candidate.title).join(", ");
    throw new Error(`No semantic icon group "${group}". Groups: ${titles}`);
  }

  return (
    <Table density="compact" verticalAlign="top">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Semantic icon</TableHeaderCell>
          <TableHeaderCell>Hugeicon</TableHeaderCell>
          <TableHeaderCell>Used by</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {icons.map(({ name, hugeicon, usedBy }) => (
          <TableRow key={name}>
            <TableCell>
              <HStack gap={2} vAlign="center">
                <Icon
                  icon={name}
                  color={STATUS_ICONS.has(name) ? (name as StatusIcon) : "primary"}
                />
                <Code>{name}</Code>
              </HStack>
            </TableCell>
            <TableCell>
              <Code>{hugeicon}</Code>
            </TableCell>
            <TableCell>
              <Text type="supporting">{usedBy}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
