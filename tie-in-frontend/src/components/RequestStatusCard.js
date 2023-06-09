// Student Dashboard Application Status

import {useQuery} from "@tanstack/react-query";
import React from 'react';
import {requestTeamsByTeamId} from "../api/teams";

function RequestStatusCard({application}) {
    const {team, created_at, status, business} = application;

    const requestTeam = useQuery(["teams"], () => requestTeamsByTeamId(team.team_id))
    return (
        <div className="request-status-card">
            <h2>{business.business_name}</h2>
            <div className="team-wrapper team-wrapper-content">
                <p>{team.team_name}</p>
                <div className="team-images-wrapper" id={`${team.team_id}`}>
                    {
                        requestTeam.data?.members?.map((member, index) => {
                            return <img key={index} src={member.photo_url} alt="student"/>
                        })
                    }
                </div>
            </div>
            <p>{new Date(created_at).toDateString()}</p>
            <p>{status}</p>
        </div>
    );
}

export default RequestStatusCard;
