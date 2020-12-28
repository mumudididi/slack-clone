import React from "react";
import Channels from "../component/Channels";
import Teams from "../component/Teams";
import Header from "../component/Header";
import Messages from "../component/Messages";
import AppLayout from "../component/AppLayout";
import SendMessage from "../component/SendMessage";
export default () => (
  <AppLayout>
    <Teams
      teams={[
        { id: 1, letter: "T" },
        { id: 2, letter: "Q" },
      ]}
    >
      Teams
    </Teams>
    <Channels
      teamName="team name"
      username="username"
      channels={[
        { id: 1, name: "general" },
        { id: 2, name: "random" },
      ]}
      users={[
        { id: 1, name: "slackbot" },
        { id: 2, name: "user1" },
      ]}
    >
      Channels
    </Channels>
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
