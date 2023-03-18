# rollup-plugin-lightningcss

![latest version](https://img.shields.io/npm/v/rollup-plugin-lightningcss?label=version&style=flat-square)
![downloads per month](https://img.shields.io/npm/dm/rollup-plugin-lightningcss?style=flat-square)
![license](https://img.shields.io/github/license/thearchitector/rollup-plugin-lightningcss?style=flat-square)

A Rollup plugin for using [LightningCSS](https://lightningcss.dev/) to transform and minify your application's CSS files.

## Usage

Currently the plugin supports transforming separate CSS files using a shared configuration block. Specific options for that configuration block can be found in the [LightningCSS documentation](https://lightningcss.dev/docs.html), or [via the source code](https://github.com/parcel-bundler/lightningcss/blob/master/node/index.d.ts) for a more complete overview.

Source maps will be generated if the `sourceMap` option is passed as `true` in the configuration.

This plugin doesn't use anything special, so it should work with virtually all Rollup versions (as long as it implements the `generateBundle` hook).

## Limitations

Both CSS files and their maps are packaged into the bundle produced when Rollup processes another genuine JS file (the entrypoint). As such, their output destination is not currently configurable and all CSS files will be placed at the same level of the output.
