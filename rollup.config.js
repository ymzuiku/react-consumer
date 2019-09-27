const rollupTypescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');

module.exports = [
  {
    input: './example/src/react-consumer/index.ts',
    output: {
      file: './umd/index.js',
      format: 'umd',
      name: 'react-consumer',
      sourcemap: true,
    },
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      immer: 'produce',
    },
    plugins: [
      rollupTypescript({
        // tsconfigDefaults:{
        //   compilerOptions: {
        //     declaration:true,
        //   }
        // },
        useTsconfigDeclarationDir: false,
      }),
      uglify({
        sourcemap: true,
      }),
    ],
  },
];
