const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    outputDir: 'target/dist',
    pages: {
        'index': {
            entry: 'src/main/frontend/index.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        'login': {
            entry: 'src/main/frontend/login.js',
            template: 'public/login.html',
            filename: 'login.html',
            chunks: ['chunk-vendors', 'chunk-common', 'login']
        }
    },
    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src/main/frontend'))
            .set('@$', resolve('src/main/frontend'))
            .set('@api', resolve('src/main/frontend/api'))
            .set('@assets', resolve('src/main/frontend/assets'))
            .set('@comp', resolve('src/main/frontend/components'))
            .set('@views', resolve('src/main/frontend/views'))
            .set('@layout', resolve('src/main/frontend/layout'))
            .set('@static', resolve('src/main/frontend/static'))
            .set('@config', resolve('src/main/frontend/config'))
            .set('@store', resolve('src/main/frontend/store'))
            .set('@utils', resolve('src/main/frontend/utils'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })
        config.plugins.delete('preload-index')
        config.plugins.delete('prefetch-index')
    },
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        port: 9020,
        hotOnly: false,
        hot: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8090/',
                changeOrigin: true,
                ws: false
            },
            '/login': {
                target: 'http://localhost:8090/',
                changeOrigin: true,
                ws: false
            }
        }
    },
    runtimeCompiler: true,
    productionSourceMap: true,
    assetsDir: 'assets',
    css: {
        sourceMap: true,
        loaderOptions: {
            less: {
                modifyVars: {
                    'border-radius-base': '2px'
                },
                javascriptEnabled: true
            }
        }
    }
}
