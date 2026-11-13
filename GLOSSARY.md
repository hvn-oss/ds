# hvn design system

hvn ds is a UI library and design system built on top of a base library, in the same spirit as shadcn. It ships themes and components, and documents them on its docs site.

## Language

### Product

**Design system**:
hvn ds itself: the themes, components and guidance published as `@hvn-oss/ds`.
_Avoid_: DS package, UI kit

**Base library**:
The UI library the design system builds on (Astryx). Its components and tokens are the raw material the design system themes and extends.
_Avoid_: Core, upstream

**Theme**:
A named set of colours, fonts and tokens that gives the base library the design system's look. `hvn` is the only theme today.
_Avoid_: Skin, palette

**Design file**:
The Paper file where the design system's look is designed and documented, as pages of artboards. The theme is its counterpart in code.
_Avoid_: Figma file, design library, Paper doc

### Design file

**Artboard**:
One board in the design file that documents a single foundation or component.
_Avoid_: Frame, sheet, board

**Component frame**:
One rendered combination of a component's props on its artboard, named by those prop values in a fixed order.
_Avoid_: Variant, master component, instance

**Frame key**:
The note beside a set of component frames that gives the order of the prop values in their names.
_Avoid_: Legend, naming guide

### Docs site

**Docs site**:
The public website for the design system: a landing page plus the docs.
_Avoid_: Docs app, website

**Landing page**:
The docs site's front page: a navbar and a hero that points readers into the docs.
_Avoid_: Home page, marketing page

**Docs page**:
A single page of documentation, written as content rather than code.
_Avoid_: Article, doc

**Section**:
A named group of docs pages shown together in the sidebar, such as "Getting Started" or "Components". A section's index page is listed first in the sidebar, as Overview.
_Avoid_: Category, folder, group

### Kinds of docs page

**Guide page**:
A docs page of prose or step-by-step instructions, such as the introduction, installation or theming.
_Avoid_: Technical page

**Component page**:
A docs page that documents one component through a live preview, examples and a link to the base library's docs for it.
_Avoid_: Design page

**Catalog page**:
A docs page that only links into the other pages of its section, such as the Components overview.
_Avoid_: Wayfinding page, index page

### Component pages

**Live preview**:
The main rendering of a component at the top of its component page.
_Avoid_: Hero preview, demo

**Example**:
A titled, rendered variation of a component shown together with its source code.
_Avoid_: Demo, sample
