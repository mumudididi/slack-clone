import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import findIndex from "lodash/findIndex";
import Channels from "../component/Channels";
import Teams from "../component/Teams";
import decode from "jwt-decode";
import ConnectedAddChannelModal from "../component/ConnectedAddChannelModal";

export default ({ currentTeamId }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState(false);
  const toggleModalOpen = () => {
    setOpenAddChannelModal(!openAddChannelModal);
  };
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

  // get teams
  const { allTeams } = data;
  const teamIdx = currentTeamId
    ? findIndex(allTeams, ["id", parseInt(currentTeamId, 10)])
    : 0;
  const team = allTeams[teamIdx];
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
        onClickAddChannel={toggleModalOpen}
      >
        Channels
      </Channels>
      <ConnectedAddChannelModal
        teamId={currentTeamId}
        open={openAddChannelModal}
        handleClose={toggleModalOpen}
      />
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
