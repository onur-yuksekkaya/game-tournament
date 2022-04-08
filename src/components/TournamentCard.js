import React from 'react';
import moment from 'moment';
import useSweetAlert from '../hooks/useSweetAlert';

import Button from './Button';
import PointCard from './PointCard';

import './TournamentCard.style.scss';
import { useTournaments } from '../context/TournamentContext';

const TournamentCard = ({ title, winner, date, imageUrl, points, id }) => {
  const { confirmAlert, successAlert } = useSweetAlert();
  const { deleteTournament, upPoint, downPoint } = useTournaments();
  async function handleDelete(tournamentId) {
    const confirmRemove = await confirmAlert(
      `Do you want to remove ${title} from nominee?`,
      'Yes, delete it!',
      'Nope!'
    );

    if (confirmRemove.isConfirmed) {
      deleteTournament({ tournamentId: tournamentId });
      successAlert(`${title} removed from nominees!`);
    }
  }
  return (
    <div className="tournament-card">
      <PointCard point={points} />
      <div className="tournament-card__image">
        <img src={imageUrl} alt="" />
      </div>
      <div className="tournament-card__content">
        <div className="tournament-card__content__title">{title}</div>
        <div className="tournament-card__content__subtitle">
          <span>Winner:</span>
          {winner}
        </div>
        <div className="tournament-card__content__subtitle">
          <span>Last Vote Date:</span>
          {moment(date).format('MMMM Do YYYY h:mm')}
        </div>
        <div className="tournament-card__content__buttons">
          <Button
            onClick={async () => {
              downPoint({ tournamentId: id });
            }}
            text="down"
            variant="down"
          />
          <Button
            onClick={() => {
              upPoint({ tournamentId: id });
            }}
            text="up"
            variant="up"
          />
          <Button
            onClick={() => handleDelete(id)}
            text="delete"
            variant="delete"
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
