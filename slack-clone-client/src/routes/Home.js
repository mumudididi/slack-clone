import { React } from "react";
import { gql, useQuery } from "@apollo/client";

const Home = () => {
  const { loading, error, data } = useQuery(allUserQuery);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1> `Error! ${error.message}`</h1>;

  return (
    <div>
      {data.allUsers.map((user) => (
        <h1 key={user.id}>{user.email}</h1>
      ))}
    </div>
  );
};

const allUserQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default Home;
