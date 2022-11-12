import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { requestTeams } from "../api/teams";
import TeamsBox from "../components/TeamsBox";
import Button from "./Button";

function TeamApplication({ name, logo_url, onClose }) {
  // const [approve, setApprove] = useState("Approve")

  const requestTeam = useQuery(["teams"], () => requestTeams(), {
    onError: (error) => {
      alert(error.message);
    }
  });
  if (requestTeam.isLoading) {
    return <span>Loading...</span>
  }

  const onApprove = () => {
  }
  return (
    <div className="team-application">
      <div className="title-wrapper">
        <div className="logo-wrapper">
          <img src={logo_url} alt="company's logo" />
           <h2>{name}</h2>
        </div>
        <Button label={"Close Project"} variant={"secondary"} onClick={onClose} />
      </div>
      <div>
      {requestTeam.data.map((team, index) => (
          <TeamsBox 
          team_name={team.team_name} 
          members={team.members} 
          onApprove={onApprove} 
          key={index}/>
        ))}
       
      </div>
    </div>
  )
}

export default TeamApplication
