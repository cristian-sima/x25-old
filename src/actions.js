// @flow

import type { Action } from "src\\types";

import Notifications from "react-notification-system-redux";

const createNotification = (level : string) => (title : any, options : any) : Action => (
  Notifications.show({
    title,
    position    : "tc",
    autoDismiss : 3,
    ...options,
  }, level)
);

export const notify = createNotification("success");
// export const notifyWarning = createNotification("warning");
export const notifyError = createNotification("error");

export const deleteNotification = (position : number) : Action => ({
  type    : "DELETE_NOTIFICATION",
  payload : position,
});

export const showCaptcha = (payload : { id: string ; name : string }) : Action => ({
  type: "SHOW_CAPTCHA",
  payload,
});

export const hideCaptcha = (payload : string) : Action => ({
  type: "HIDE_CAPTCHA",
  payload,
});

export * from "./Modal/actions";
export * from "./Account/actions";
