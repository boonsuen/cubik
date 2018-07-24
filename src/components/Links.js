import React from "react";

export default class Links extends React.Component {
  render() {
    return (
      <div className="links-container">
        {this.props.links.map(link => (
          <a key={link.id} className="links" href={link.url} target="_blank">
            {link.title}
          </a>
        ))}
      </div>
    );
  }
}
