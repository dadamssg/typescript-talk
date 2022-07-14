import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export function UserProfile({ profile, color }) {
  return (
    <div style={{ background: color }}>
      <span>{profile.firstName}</span>
      <span>{profile.lastName}</span>
      <span>{profile.email}</span>
    </div>
  );
}

UserProfile.propTypes = {
  id: PropTypes.string,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  color: PropTypes.string.isRequired,
};

function stateToProps(state, { id }) {
  return {
    profile: state.getIn(["people", id]),
    color: state.getIn(["user-colors", id]),
  };
}

export default connect(stateToProps)(UserProfile);
