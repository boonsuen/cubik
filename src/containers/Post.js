import React from 'react';
import { withRouteData, Link } from 'react-static';

const Post = withRouteData(({ post }) => (
  <React.Fragment>
    <Link to="/blog" style={{
      marginTop: '30px',
      display: 'inline-block'
    }}>{'<'} Back</Link>
    <br />
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </React.Fragment>
));

export default Post;