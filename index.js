import { basename, win32, posix } from "node:path";
import { readFile } from "node:fs/promises";
import browserslist from "browserslist";
import { transform, browserslistToTargets } from "lightningcss";

export default function lightningcss(config = {}) {
  const { files, options } = config;
  const transformOpts = { minify: true, ...options };

  if (!("targets" in transformOpts))
    transformOpts["targets"] = browserslistToTargets(browserslist());

  return {
    name: "lightningcss",
    async generateBundle() {
      const filesToTransform = files.map(async (file) => {
        file = file.split(win32.sep).join(posix.sep);
        const filename = basename(file);

        console.debug(
          "\x1b[1;38;2;255;203;78m%s\x1b[0m",
          `⚡ [rollup-lightningcss] Processing ${file}...`
        );

        let { code, map } = transform({
          ...transformOpts,
          filename: filename,
          code: await readFile(file),
        });

        this.emitFile({
          type: "asset",
          fileName: filename,
          source: code,
        });

        // if sourceMaps is enabled
        if (map) {
          this.emitFile({
            type: "asset",
            fileName: `${filename}.map`,
            source: map.toString(),
          });
        }
      });

      await Promise.all(filesToTransform);
    },
  };
}
