import React from "react";
import TournamentDisplay from "./components/Tournament";
import tournamentData from "./data/data.json";
import styles from "./app.module.scss";

function App() {
  const formattedData = transformData(tournamentData);
  return (
    <div className={styles.container}>
      <h1>Турниры</h1>
      <TournamentDisplay data={formattedData} />
    </div>
  );
}

function transformData(data) {
  const result = {};
  for (let i = 0; i < data.countries.length; i++) {
    const country = data.countries[i];
    const countryId = country.country_id;
    const tournaments = data.tournaments
      .filter((t) => t.country_id === countryId)
      .map((t) => {
        const tournamentId = t.tournament_id;
        const events = data.events.filter(
          (e) => e.tournament_id === tournamentId
        );
        return {
          tournament_id: tournamentId,
          name: t.name,
          year: t.year,
          location: t.location,
          prize_money: t.prize_money,
          teams: t.teams,
          events: events,
        };
      });
    result[country.name] = {
      country_id: countryId,
      tournaments: tournaments,
    };
  }
  return result;
}

export default App;
