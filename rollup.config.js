const rollupTypescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');

module.exports = [
  {
    input: './example/src/react-consumer/index.ts',
    output: {
      file: './umd/react-consumer.umd.js',
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
