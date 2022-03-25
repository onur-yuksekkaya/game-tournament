import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TournamentsContext = createContext();

const useTournaments = () => useContext(TournamentsContext);
/*
  [
    {
      id,
      name,
      winner,
      points,
      imageUrl,
      voteUpdateDate,
      updateDate,
    }
  ]
*/

function TournamentProvider({ children }) {
  const [tournaments, setTournaments] = useLocalStorage(
    'cg_tournament_data',
    []
  );
  const [lastId, setLastId] = useLocalStorage('tournament_id_bank', 1);

  const deleteTournament = ({ tournamentId }) => {
    const excludedTournamentData = (tournaments || []).filter(
      (t) => t.id !== tournamentId
    );

    setTournaments(excludedTournamentData);
  };
  const createTournament = async ({
    tournamentName,
    tournamentWinner,
    tournamentImageUrl,
  }) => {
    const newTournament = {
      id: lastId + 1,
      name: tournamentName,
      winner: tournamentWinner,
      imageUrl: tournamentImageUrl,
      points: 0,
      voteUpdateDate: Date.now(),
      updateDate: Date.now(),
    };
    const oldTournamentsData = tournaments || [];
    const populatedTournamentData = [...oldTournamentsData, newTournament];

    setTournaments(populatedTournamentData);
    setLastId(lastId + 1);
  };
  const upPoint = async ({ tournamentId }) => {
    const selectedTournament = tournaments.find((t) => t.id === tournamentId);
    const excludedTournamentsData = tournaments.filter(
      (t) => t.id !== tournamentId
    );
    // Update point
    selectedTournament.points += 1;
    selectedTournament.voteUpdateDate = Date.now();
    excludedTournamentsData.push(selectedTournament);

    setTournaments(excludedTournamentsData);
  };
  const downPoint = async ({ tournamentId }) => {
    const selectedTournament = tournaments.find((t) => t.id === tournamentId);
    const excludedTournamentsData = tournaments.filter(
      (t) => t.id !== tournamentId
    );
    // Update point
    selectedTournament.points -= 1;
    selectedTournament.voteUpdateDate = Date.now();
    excludedTournamentsData.push(selectedTournament);

    setTournaments(excludedTournamentsData);
  };

  return (
    <TournamentsContext.Provider
      value={{
        tournaments,
        deleteTournament,
        createTournament,
        upPoint,
        downPoint,
      }}
    >
      {children}
    </TournamentsContext.Provider>
  );
}

export { TournamentProvider, useTournaments };
