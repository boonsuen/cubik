import React from 'react';
import { withRouteData, Link } from 'react-static';

const Blog = withRouteData(({ posts }) => (
  <React.Fragment>
    <h1>It’s blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </React.Fragment>
));

export default Blog;