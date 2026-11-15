# Patched skills

Installed skills that carry local edits. A skill update overwrites these edits, so before you update one of these skills, check whether the new upstream version fixes the problem. If it does, remove the skill's entry. If it doesn't, apply the patch again. Patched files also no longer match their `computedHash` in `skills-lock.json`.

## `hugeicons-migrate`

- **Source**: `hugeicons/hugeicons`, `skills/hugeicons-migrate`. The patch applies on top of the copy installed in `bea86be`, whose upstream hash is `8676f0821615a492d2778b057bf2b61b9d86b4d282cff9e3cbbe588088471550` in `skills-lock.json`.
- **Problem**: the upstream skill still teaches the 4.3 names. `@hugeicons/core-free-icons` 4.4.0 renamed 49 icons back to digits (`LayoutThreeColumnIcon` → `Layout3ColumnIcon`), and the 4.3 names now ship only as `@deprecated` aliases. Following the skill brings deprecated names into the code.
- **Patch**:
  - In `references/from-lucide.md`, `from-heroicons.md` and `from-react-icons.md`, the target names now use the 4.4 names.
  - In `references/legacy-hugeicons.md` §5, the legacy 0.x rows whose names are current again are removed, the naming-pattern paragraph is corrected, and a "4.3.x → 4.4.x" table lists all 49 renames.
  - `SKILL.md` names 4.4 in the description and has a troubleshooting entry for deprecated imports.
- **Drop the patch when**: upstream's `legacy-hugeicons.md` covers the 4.4 renames and its tables no longer point at deprecated names. To check, run the "4.3.x → 4.4.x" grep from §5 against the installed package and compare its output with the names the skill recommends.
