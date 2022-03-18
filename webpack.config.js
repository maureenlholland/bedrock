/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

'use strict';

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const staticBundles = require('./media/static-bundles.json');
const { readdirSync } = require('fs');
const sveltePreprocess = require('svelte-preprocess');

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
                },
                {
                    // Copy minified careers pages JS.
                    from: path.resolve(__dirname, 'media/js/careers/libs/'),
                    to: 'js/careers/libs/'
                }
            ]
        }),
        new Dotenv()
    ]
};

function getSvelteApps() {
    // go to svelte/apps folder
    // create bundle for each main.js file named for the folder it lives in (i.e. newsletter-all)
    return new Promise((resolve) => {
        const apps = path.resolve(__dirname, 'media/svelte/apps');
        const allFiles = {};
        try {
            const files = readdirSync(apps, { withFileTypes: true });
            files.forEach((file) => {
                const name = file['name'];
                allFiles[name] = path.resolve(
                    __dirname,
                    'media/svelte/apps',
                    name,
                    'main.js'
                );
            });
        } catch (err) {
            console.error(err); // eslint-disable-line no-console
        }
        resolve(allFiles);
    });
}

// should consider emitting CSS: https://github.com/sveltejs/svelte-loader#extracting-css
const svelteConfig = {
    entry: () => getSvelteApps(),
    output: {
        filename: 'js/svelte-[name].js',
        path: path.resolve(__dirname, 'assets/'),
        publicPath: '/media/'
    },
    resolve: {
        // see below for an explanation
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: sveltePreprocess({
                            scss: {
                                renderSync: true,
                                includePaths: ['media', 'node_modules'],
                                prependData: `@import '${path.resolve(
                                    'node_modules',
                                    '@mozilla-protocol/core/protocol/css/includes/lib'
                                )}';`
                            }
                        })
                    }
                }
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
svelteConfig.plugins.push(browserSync);
cssConfig.plugins.push(browserSync);

module.exports = [jsConfig, svelteConfig, cssConfig];
