import axios from "axios";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

export default {
  siteRoot: "https://cubikapp.com",
  stagingSiteRoot: "http://localhost:3001",
  getSiteData: () => ({
    title: "Cubik"
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return [
      {
        path: "/",
        component: "src/containers/Home"
      },
      {
        path: "/about",
        component: "src/containers/About"
      },
      {
        path: "/blog",
        component: "src/containers/Blog",
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: "src/containers/Post",
          getData: () => ({
            post
          })
        }))
      },
      {
        path: "/login",
        component: "src/containers/Login"
      },
      {
        path: "/signup",
        component: "src/containers/Signup"
      },
      {
        path: "/amnesia",
        component: "src/containers/Amnesia"
      },
      {
        path: "/app",
        component: "src/components/CubikApp"
      },
      {
        is404: true,
        component: "src/containers/404"
      }
    ];
  },
  webpack: (config, { defaultLoaders, stage }) => {
    let loaders = [];

    if (stage === "dev") {
      loaders = [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ];
    } else {
      loaders = [
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            minimize: stage === "prod",
            sourceMap: false
          }
        },
        {
          loader: "sass-loader",
          options: { includePaths: ["src/"] }
        }
      ];

      // Don't extract css to file during node build process
      if (stage !== "node") {
        loaders = ExtractTextPlugin.extract({
          fallback: {
            loader: "style-loader",
            options: {
              sourceMap: false,
              hmr: false
            }
          },
          use: loaders
        });
      }

      // UglifyJS for production build
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
              beautify: false
            }
          }
        })
      );
    }

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: loaders
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader
        ]
      }
    ];

    return config;
  },
  disableRouteInfoWarning: true
};
