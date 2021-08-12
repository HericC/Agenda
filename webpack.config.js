const path = require('path');

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: './frontend/assets/ts/index.ts',
    devtool: 'source-map',
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.frontend.json',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
    },
};
