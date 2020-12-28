import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import Channels from "../component/Channels";
import Teams from "../component/Teams";
import decode from "jwt-decode";

export default ({ currentTeamId }) => {
  const { loading, error, data } = useQuery(allTeamsQuery);
  if (loading) return null;
  //get user
  let username = "";
  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {
    console.log(err);
  }
  console.log(username);

  // get teams
  const { allTeams } = data;
  console.log(allTeams);
  const teamIdx = _.findIndex(allTeams, ["id", currentTeamId]);
  console.log(teamIdx);
  const team = allTeams[teamIdx];
  console.log(team);
  return (
    <React.Fragment>
      <Teams
        teams={data.allTeams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      >
        Teams
      </Teams>
      <Channels
        teamName={team.name}
        username={username}
        channels={team.channels}
        users={[
          { id: 1, name: "slackbot" },
          { id: 2, name: "user1" },
        ]}
      >
        Channels
      </Channels>
    </React.Fragment>
  );
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
