const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  // modifyVars: { '@primary-color': '#04f' }, // optional
  lessVarsFilePath: "/assets/styles/less/variables/index.less", // optional
  lessVarsFilePathAppendToEndOfContent: false, // optional
  // reactStrictMode: true,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // ...
    mode: "local",
    // localIdentName: __DEV__ ? "[local]--[hash:base64:4]" : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: "camelCase",
    exportOnlyLocals: false,
    // ...
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "sk-default";
    },
  },

  // // for Next.js ONLY
  nextjs: {
    localIdentNameFollowDev: false, // default false, for easy to debug on PROD mode
  },

  experimental: {
    forceSwcTransforms: true,
    swcMinify:true,
  },

  // Other Config Here...

  webpack(config) {
    return config;
  },

  // ONLY for Next.js 10, if you use Next.js 11, delete this block
  future: {
    webpack5: true,
  },
});
// next.config.js
module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/home' },
    };
  },
};