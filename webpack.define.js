const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

module.exports = {
  commonInclude: /(ClientApp)/,
  commonExclude: /(node_modules|bower_components)/,
  modeProduction: 'production',
  modeDevelopment: 'development',
  devProxyPort: 44376,
  devServerProxyTarget: `http://localhost:${this.devProxyPort}/`,
  devServerPort: 8080,
  expressDevServerPort: 3000,
  osCpusLength: require('os').cpus().length,
  // htmlWebpackPlugin 設定
  htmlWebpackPluginSetting: function (mode) {
    let htmlWebpackPluginList = []
    const enableHtmlWebpackHarddiskPlugin = true
    const htmlWebpackPluginListData = [
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/index_2.ejs'),
        filename: path.resolve(__dirname, 'index.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/contactUs.ejs'),
        filename: path.resolve(__dirname, 'contactUs.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/experienceCase.ejs'),
        filename: path.resolve(__dirname, 'experienceCase.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/introduction.ejs'),
        filename: path.resolve(__dirname, 'introduction.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/professionTeam.ejs'),
        filename: path.resolve(__dirname, 'professionTeam.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/columnIntroduction.ejs'),
        filename: path.resolve(__dirname, 'columnIntroduction.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/ejs/index_2/columnIntroduction2.ejs'),
        filename: path.resolve(__dirname, 'columnIntroduction2.html'),
      },
      {
        template: path.resolve(__dirname, 'ClientApp/indexTemplate.html'),
        filename: path.resolve(__dirname, 'indexTemplate.html'),
      },
    ]
    
    // setting HtmlWebpackPlugin param
    let minify
    let isProd

    switch (mode) {
      case module.exports.modeDevelopment:
        minify = false
        isProd = false
        break;
        case module.exports.modeProduction:
        minify = {
          removeComments: true,
          collapseWhitespace:true,
          collapseInlineTagWhitespace:true
        }
        isProd = true
        break;
      default:
        break;
    }

    // common setting
    for (let index = 0; index < htmlWebpackPluginListData.length; index++) {
      const element = htmlWebpackPluginListData[index]
      
      htmlWebpackPluginList.push(
        new HtmlWebpackPlugin({
          inject: false,
          template: element.template,
          filename: element.filename,
          chunks: ['index'],
          HtmlWebpackPluginOverride: true,
          // hash:true,//防止缓存
          outputFile: {
            vendor: 'wwwroot/vendor/dll.vendor.js',
            isProd: isProd,
            port: module.exports.devServerPort
          },
          minify: minify,
          // 啟用手動排序
          chunksSortMode: 'manual'
          // 跟著HtmlWebpackHarddiskPlugin套件
          // alwaysWriteToDisk: true
        })
      )
    }

      // setting HtmlWebpackHarddiskPlugin
    if (enableHtmlWebpackHarddiskPlugin) {
      for (let index = 0; index < htmlWebpackPluginList.length; index++) {
        let element = htmlWebpackPluginList[index]
        element.options.alwaysWriteToDisk = true
      }

      //強制"HtmlWebpackPlugin"進行編譯成實體檔案
      htmlWebpackPluginList.push(new HtmlWebpackHarddiskPlugin())
    }

    return htmlWebpackPluginList
  }
}
