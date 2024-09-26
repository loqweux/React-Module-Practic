import React from "react";
import styles from "./Tournament.module.scss";

const TournamentDisplay = (props) => {
  const tournamentData = props.data;
  const countryElements = [];
  for (let i = 0; i < Object.keys(tournamentData).length; i++) {
    const country = Object.keys(tournamentData)[i];
    const countryData = tournamentData[country];
    const tournamentsList = [];
    if (countryData.tournaments.length > 0) {
      for (let i = 0; i < countryData.tournaments.length; i++) {
        const tournament = countryData.tournaments[i];
        tournamentsList.push(
          <TournamentCard
            key={tournament.tournament_id}
            tournament={tournament}
          />
        );
      }
    } else {
      tournamentsList.push(
        <p key="no-tournaments">Нет турниров для этой страны</p>
      );
    }
    const countryElement = (
      <div key={countryData.country_id}>
        <h2>{country}</h2>
        {tournamentsList}
      </div>
    );
    countryElements.push(countryElement);
  }
  return <div id="data-container">{countryElements}</div>;
};

const TournamentCard = (props) => {
  const tournament = props.tournament;
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {tournament.name} ({tournament.year})
      </div>
      <p className={styles.cardLocation}>Локация: {tournament.location}</p>
      <p className={styles.cardPrize}>Выигрыш: ${tournament.prize_money}</p>
      <h4>Команды:</h4>
      <ul className={styles.teams}>
        {(() => {
          const teamElements = [];
          for (let i = 0; i < tournament.teams.length; i++) {
            const team = tournament.teams[i];
            teamElements.push(
              <li key={`${team.team_id}-${i}`}>{team.name}</li>
            );
          }
          return teamElements;
        })()}
      </ul>
      <h4>События:</h4>
      <ul className={styles.events}>
        {(() => {
          const eventElements = [];
          for (let i = 0; i < tournament.events.length; i++) {
            const event = tournament.events[i];
            let eventContent;
            if (event.type === "goal") {
              eventContent = `${event.player} забил гол (${event.minute} минут)`;
            } else if (event.type === "yellow_card") {
              eventContent = `${event.player} получил желтую карточку (${event.minute} минут)`;
            } else if (event.type === "red_card") {
              eventContent = `${event.player} получил красную карточку (${event.minute} минут)`;
            } else {
              eventContent = null;
            }
            if (eventContent) {
              eventElements.push(
                <li key={`${event.match_id}-${i}`}>
                  <p>{eventContent}</p>
                </li>
              );
            }
          }
          return eventElements;
        })()}
      </ul>
    </div>
  );
};

export default TournamentDisplay;
