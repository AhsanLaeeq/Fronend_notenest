// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // Modify devServer configuration to resolve deprecation warnings
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          setupMiddlewares: (middlewares, devServer) => {
            // You can add custom middleware here if needed
            devServer.app.use((req, res, next) => {
              console.log("Custom middleware before request");
              next(); // Proceed to the next middleware
            });
  
            // Return the modified middlewares
            return middlewares;
          },
        };
        return webpackConfig;
      },
    },
  };
  