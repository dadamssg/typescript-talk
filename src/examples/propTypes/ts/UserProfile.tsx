import React from "react";
import { connect } from "react-redux";
import { Map } from "immutable";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
};

type UserProfileProps = {
  profile: Profile;
  color: string;
};

export function UserProfile({ profile, color }: UserProfileProps) {
  return (
    <div style={{ background: color }}>
      <span>{profile.firstName}</span>
      <span>{profile.lastName}</span>
      <span>{profile.email}</span>
    </div>
  );
}

type SelectorProps = { id: string };
type State = Map<string, unknown>;

function stateToProps(state: State, props: SelectorProps) {
  return {
    profile: state.getIn(["people", props.id]) as Profile,
    color: state.getIn(["user-colors", props.id]) as string,
  };
}

export default connect(stateToProps)(UserProfile);
