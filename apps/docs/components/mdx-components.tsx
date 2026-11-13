import {
  Children,
  createContext,
  isValidElement,
  use,
  type ComponentProps,
  type ReactNode,
} from "react";
import type { MDXComponents } from "mdx/types";
import { Blockquote } from "@astryxdesign/core/Blockquote";
import { Code } from "@astryxdesign/core/Code";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@astryxdesign/core/Table";
import { Text } from "@astryxdesign/core/Text";
import { Example, Preview } from "./component-page-components";
import { Callout, NextSteps, Step, Steps } from "./guide-components";
import { RouterLink } from "./router-link";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** A heading that links to itself, for headings the page frame adds alongside the MDX ones. */
export function AnchorHeading({
  level,
  id,
  children,
}: {
  level: HeadingLevel;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <Heading level={level} id={id} className="scroll-mt-16 max-lg:scroll-mt-32">
      {id ? (
        // A plain anchor, since Astryx `Link` wraps its children in body-type `Text` and would
        // override the heading's type scale. Preflight makes it inherit the heading's styles.
        <a href={`#${id}`} className="group">
          {children}
          <Text
            type="inherit"
            color="secondary"
            aria-hidden
            className="ms-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            #
          </Text>
        </a>
      ) : (
        children
      )}
    </Heading>
  );
}

function createHeading(level: HeadingLevel) {
  return function MdxHeading({ id, children }: ComponentProps<"h1">) {
    return (
      <AnchorHeading level={level} id={id}>
        {children}
      </AnchorHeading>
    );
  };
}

/** `Blockquote` sets its own text colour, which a paragraph's default `primary` would override. */
const InBlockquoteContext = createContext(false);

function MdxParagraph({ children }: ComponentProps<"p">) {
  const isInBlockquote = use(InBlockquoteContext);

  return (
    <Text as="p" display="block" color={isInBlockquote ? "inherit" : undefined}>
      {children}
    </Text>
  );
}

function isExternal(href: string) {
  return /^([a-z][a-z\d+.-]*:|\/\/)/i.test(href);
}

function MdxLink({ href = "", children }: ComponentProps<"a">) {
  if (isExternal(href)) {
    return (
      <Link href={href} isExternalLink>
        {children}
      </Link>
    );
  }

  return (
    <Link as={RouterLink} href={href}>
      {children}
    </Link>
  );
}

/** Fenced code arrives as `<pre><code class="language-x">…</code></pre>`, since Shiki is off. */
function MdxPre({ children }: ComponentProps<"pre">) {
  const code = Children.only(children);
  if (!isValidElement<{ className?: string; children?: ReactNode }>(code)) return null;

  const language = code.props.className?.match(/language-(\S+)/)?.[1] ?? "plaintext";
  const source = typeof code.props.children === "string" ? code.props.children : "";

  return <CodeBlock code={source.replace(/\n$/, "")} language={language} width="100%" />;
}

export const mdxComponents: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: MdxParagraph,
  a: MdxLink,
  code: ({ children }) => <Code>{children}</Code>,
  pre: MdxPre,
  table: ({ children }) => <Table>{children}</Table>,
  thead: ({ children }) => <TableHeader>{children}</TableHeader>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => <TableHeaderCell>{children}</TableHeaderCell>,
  td: ({ children }) => <TableCell>{children}</TableCell>,
  ul: ({ children }) => (
    <List listStyle="disc" density="compact" edge="flush">
      {children}
    </List>
  ),
  ol: ({ children, start }) => (
    <List listStyle="decimal" start={start} density="compact" edge="flush">
      {children}
    </List>
  ),
  li: ({ children }) => <ListItem label={children} />,
  blockquote: ({ children }) => (
    <Blockquote>
      <InBlockquoteContext value={true}>{children}</InBlockquoteContext>
    </Blockquote>
  ),
  Steps,
  Step,
  Callout,
  NextSteps,
  Preview,
  Example,
};
