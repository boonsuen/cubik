import axios from 'axios';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  plugins: ['react-static-plugin-styled-components'],
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
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post
          })
        }))
      },
      {
        path: '/login',
        component: 'src/containers/Login'
      },
      {
        path: '/signup',
        component: 'src/containers/Signup'
      },
      {
        path: '/amnesia',
        component: 'src/containers/Amnesia'
      },
      {
        path: '/app',
        component: 'src/components/CubikApp'
      },
      {
        path: '/nolayout',
        component: 'src/containers/NoLayout'
      },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ];
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends React.Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
  webpack: (config, { defaultLoaders, stage }) => {
    if (stage !== "dev") {
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

    return config;
  },
  disableRouteInfoWarning: true
};
