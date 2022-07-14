import React from "react";
import PropTypes from "prop-types";

export default function Avatar({ url }) {
  return <img alt="avatar" src={url} className="some-css-classes" />;
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
};
