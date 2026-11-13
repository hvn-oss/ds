import type { ComponentType } from "react";

// Previews and examples are `.tsx` files in `examples/<component>/<name>.tsx`. MDX names them
// `<component>/<name>`, and the code shown is the source of the same file, so it matches what renders.

export interface DocsExample {
  Component: ComponentType;
  code: string;
}

/**
 * Pairs each example module with its source, both keyed by file path as `import.meta.glob`
 * returns them. The returned lookup throws on an unknown name, so a typo in MDX fails loudly.
 */
export function createExampleRegistry(
  modules: Record<string, { default?: ComponentType }>,
  sources: Record<string, string>,
): (name: string) => DocsExample {
  const examples = new Map<string, DocsExample>();

  for (const [path, module] of Object.entries(modules)) {
    if (!module.default) throw new Error(`Example file has no default export: ${path}`);
    examples.set(toExampleName(path), {
      Component: module.default,
      code: (sources[path] ?? "").replace(/\n$/, ""),
    });
  }

  return (name) => {
    const example = examples.get(name);
    if (!example) {
      throw new Error(`No example "${name}". Examples: ${[...examples.keys()].join(", ")}`);
    }
    return example;
  };
}

/** `../examples/button/variants.tsx` → `button/variants`. */
function toExampleName(path: string): string {
  return path.replace(/^.*\/examples\//, "").replace(/\.tsx$/, "");
}
