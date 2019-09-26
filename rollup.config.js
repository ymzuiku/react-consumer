const rollupTypescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');

module.exports = [
  {
    input: './lib/index.ts',
    output: {
      file: './es/react-consumer.umd.js',
      format: 'umd',
      name: 'react-consumer',
      sourcemap: true,
    },
    plugins: [
      rollupTypescript({
        useTsconfigDeclarationDir: true,
      }),
      uglify({
        sourcemap: true,
      }),
    ],
  },
];
