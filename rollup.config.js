const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');
const { resolve } = require('path');
const pwd = (...args) => resolve(process.cwd(), ...args);
const fs = require('fs-extra');

function clearDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      fs.remove(`${dir}/${file}`);
    });
  }
}

clearDir(pwd('umd'));

const watchOptions = {
  input: './example/src/react-consumer/index.ts',
  output: {
    file: './umd/index.js',
    format: 'umd',
    name: 'queryString',
    sourcemap: true,
    globals: {
      react: 'React',
    },
  },
  plugins: [
    rollupTypescript({
      useTsconfigDeclarationDir: false,
    }),
    uglify({
      sourcemap: true,
    }),
  ],
};
const watcher = rollup.watch(watchOptions);

// event.code can be one of:
//   START        — the watcher is (re)starting
//   BUNDLE_START — building an individual bundle
//   BUNDLE_END   — finished building a bundle
//   END          — finished building all bundles
//   ERROR        — encountered an error while bundling
//   FATAL        — encountered an unrecoverable error
watcher.on('event', event => {
  if (event.code === 'BUNDLE_END') {
    console.log(event);
  }
  if (event.code === 'END') {
    watcher.close();
    // const files = fs.readdirSync(pwd('umd/react-consumer'));
    // files.forEach(file => {
    //   fs.moveSync(pwd('umd/react-consumer', file), pwd('umd', file));
    // });
    // fs.removeSync(pwd('umd/react-consumer'));
  }
});
