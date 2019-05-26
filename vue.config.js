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
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
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
            .set('@', resolve('packages'))
            .set('@$', resolve('packages'))
            .set('@utils', resolve('packages/_utils'))

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
        port: 9040,
        hotOnly: false,
        hot: true,
        compress: true
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
