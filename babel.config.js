module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
            'module-resolver',
            {
                alias: {
                    '@': './src',
                    '@config': './src/config',
                    '@modules': './src/modules',
                    '@shared': './src/shared',
                    '@entities': './src/entities',
                },
            },
        ],
    ],
    ignore: ['**/**/*.spec.ts'],
}