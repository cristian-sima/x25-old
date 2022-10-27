// @flow

import React from "react";

import ModalRoot from "./Modal/Root";

import type { Dispatch, State } from "src\\types";

import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";

import { deleteNotification } from "./actions";

const
  mapStateToProps = (state : State) => ({
    notifications: state.get("notifications", []),
  }),
  mapDispatchToProps = (dispatch : Dispatch) => ({
    handleDismiss: (notification) => {
      dispatch(deleteNotification(notification.key));
    },
  });

const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications);

const Things = () => (
  <React.Fragment>
    <div className="d-print-none">
      <NotificationsContainer />
    </div>
    <ModalRoot />
  </React.Fragment>
);

export default Things;
