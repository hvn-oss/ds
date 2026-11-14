/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: "generic",
  name: "hvn-theme",
  extends: "theme",
  title: "HVN theme",
  description: "Use the HVN theme from @hvn-oss/ds.",
  sections: [
    {
      id: "use-the-hvn-theme",
      title: "Use the HVN theme",
      content: [
        {
          type: "prose",
          text: "Install @hvn-oss/ds, then run astryx theme add hvn --package @hvn-oss/ds and apply it from the generated app theme module. To customize it, define your own theme with extends instead of copying the source.",
        },
        {
          type: "prose",
          text: "HVN uses Inter for body text and headings, and JetBrains Mono for code. theme add imports the exported @hvn-oss/ds/themes/hvn.fonts.css stylesheet, which self-hosts both as variable fonts. Icons are free Hugeicons (stroke rounded), from @hugeicons/core-free-icons.",
        },
      ],
    },
  ],
};
