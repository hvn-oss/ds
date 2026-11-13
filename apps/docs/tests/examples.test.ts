import { describe, expect, test } from "vite-plus/test";
import { createExampleRegistry } from "#/lib/examples.ts";

function Default() {
  return null;
}

function Variants() {
  return null;
}

// The shapes `import.meta.glob` returns for the examples and for their `?raw` source.
const modules = {
  "../examples/button/default.tsx": { default: Default },
  "../examples/button/variants.tsx": { default: Variants },
};
const sources = {
  "../examples/button/default.tsx": "export default function Default() {}\n",
  "../examples/button/variants.tsx": "export default function Variants() {}\n",
};

describe("createExampleRegistry", () => {
  test("finds an example by its component and file name, with the source of that file", () => {
    const getExample = createExampleRegistry(modules, sources);

    expect(getExample("button/variants")).toEqual({
      Component: Variants,
      code: "export default function Variants() {}",
    });
  });

  test("throws on a name with no example file, listing the names there are", () => {
    const getExample = createExampleRegistry(modules, sources);

    expect(() => getExample("button/sizes")).toThrow(
      'No example "button/sizes". Examples: button/default, button/variants',
    );
  });

  test("throws when an example file has no default export", () => {
    expect(() => createExampleRegistry({ "../examples/button/default.tsx": {} }, sources)).toThrow(
      "../examples/button/default.tsx",
    );
  });
});
