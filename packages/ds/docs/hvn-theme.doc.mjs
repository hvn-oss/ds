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
          text: "HVN uses Montserrat for headings, Figtree for body text, and JetBrains Mono for code. theme add imports the exported @hvn-oss/ds/themes/hvn.fonts.css stylesheet, which self-hosts all three as variable fonts.",
        },
      ],
    },
  ],
};
