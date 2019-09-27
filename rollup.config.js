const rollupTypescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');

module.exports = [
  {
    input: './example/src/react-consumer/index.ts',
    output: {
      file: './umd/react-consumer.umd.js',
      format: 'umd',
      name: 'ReactConsumer',
      sourcemap: true,
      globals: {
        'querystring-number': 'queryString',
        react: 'React',
        'react-dom': 'ReactDOM',
        immer: 'immer',
      },
    },
    plugins: [
      rollupTypescript({
        // tsconfigDefaults: {
        //   compilerOptions: {
        //     declaration: true,
        //   },
        // },
        useTsconfigDeclarationDir: false,
      }),
      uglify({
        sourcemap: true,
      }),
    ],
  },
];
