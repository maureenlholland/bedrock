/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const staticBundles = require('./media/static-bundles.json');

function resolveBundles(fileList) {
    return fileList.map((f) => {
        if (f.match(/^protocol\//)) {
            return `./node_modules/@mozilla-protocol/core/${f}`;
        }
        return path.resolve(__dirname, 'media', f);
    });
}

function getCSSBundles() {
    return new Promise((resolve) => {
        const allFiles = {};
        staticBundles['css'].forEach((bundle) => {
            const name = `${bundle['name']}--css`;
            const files = resolveBundles(bundle['files']);
            allFiles[name] = files;
        });
        resolve(allFiles);
    });
}

function getJSBundles() {
    return new Promise((resolve) => {
        const allFiles = {};
        staticBundles['js'].forEach((bundle) => {
            const name = bundle['name'];
            const files = resolveBundles(bundle['files']);
            allFiles[name] = files;
        });
        resolve(allFiles);
    });
}

const jsConfig = {
    entry: () => getJSBundles(),
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'assets/'),
        publicPath: '/media/'
    },
    module: {
        rules: [
            {
                test: /\.es6\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        ie: '10'
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 600,
        ignored: './node_modules/'
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    // Copy legacy IE scripts that aren't bundled.
                    from: path.resolve(__dirname, 'media/js/ie/'),
                    to: 'js/ie/'
                }
            ]
        })
    ]
};

const cssConfig = {
    entry: () => getCSSBundles(),
    output: {
        filename: 'temp/[name].js',
        path: path.resolve(__dirname, 'assets/'),
        publicPath: '/media/'
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'media'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 600,
        ignored: './node_modules/'
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: ({ chunk }) =>
                `css/${chunk.name.replace('--css', '')}.css`
        })
    ]
};

const svelteConfig = {
    entry: () => path.resolve(__dirname, 'media', 'svelte/main.js'),
    output: {
        filename: 'svelte/test-svelte.js',
        path: path.resolve(__dirname, 'assets/'),
        publicPath: '/media/'
    },
    resolve: {
        // see below for an explanation
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        // whut: https://webpack.js.org/configuration/resolve/#resolvemainfields
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: 'svelte-loader'
            },
            {
                // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false
                }
            }
        ]
    },
    plugins: []
};

// Plugin will only start when Webpack is in watch mode.
const browserSync = new BrowserSyncPlugin({
    port: 8000,
    proxy: process.env.BS_PROXY_URL || 'localhost:8080',
    open: false,
    notify: true,
    reloadDebounce: 1000,
    injectChanges: false,
    files: ['./bedrock/**/*.html'],
    ui: {
        port: 8001
    },
    serveStatic: [
        {
            route: './media',
            dir: './assets'
        }
    ]
});

jsConfig.plugins.push(browserSync);
cssConfig.plugins.push(browserSync);
svelteConfig.plugins.push(browserSync);

module.exports = [jsConfig, cssConfig, svelteConfig];
