import React from "react";
import Header from "../component/Header";
import Messages from "../component/Messages";
import AppLayout from "../component/AppLayout";
import SendMessage from "../component/SendMessage";
import Sidebar from "../containers/SideBar";
export default () => (
  <AppLayout>
    <Sidebar currentTeamId={10} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);
