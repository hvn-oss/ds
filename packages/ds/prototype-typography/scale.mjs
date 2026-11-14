import { expandTypeScale } from "../node_modules/@astryxdesign/core/dist/theme/expandTypeScale.js";
const keys=["display-1","display-2","display-3","heading-1","heading-2","heading-3","heading-4","heading-5","heading-6","large","body","label","code","supporting"];
for (const ratio of [1.125,1.15,1.2,1.25]) {
  const t = expandTypeScale({ base: 14, ratio });
  const sz = k => { const v=t[`--text-${k}-size`]; const m=v.match(/--font-size-(\w+)/); const raw=t[`--font-size-${m[1]}`]; return parseFloat(raw)*16; };
  console.log(ratio, keys.map(k=>`${k}=${sz(k)}/${Math.round(sz(k)*parseFloat(t[`--text-${k}-leading`]))}`).join(" "));
}
