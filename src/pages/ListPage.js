import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTournaments } from '../context/TournamentContext';

import Button from '../components/Button';
import TournamentCard from '../components/TournamentCard';

import PageLayout from '../layouts/PageLayout';
import PageHeader from '../layouts/PageHeader';
import PageContent from '../layouts/PageContent';

import './ListPage.style.scss';
import PageButtons from '../components/PageButtons';

const orderTournaments = ({ tournamentsData = [], lowToHigh = true }) => {
  const sortedTournaments = tournamentsData.sort((a, b) => {
    if (a.points < b.points) return lowToHigh ? -1 : 1;
    if (a.points > b.points) return lowToHigh ? 1 : -1;
    else {
      if (a.voteUpdateDate > b.voteUpdateDate) return -1;
      else return +1;
    }
  });

  return sortedTournaments;
};

const getTournaments = ({
  page = 1,
  pageCount = 6,
  tournamentsData = [],
  lowToHigh = true,
}) => {
  const orderedTournamentsData = orderTournaments({
    tournamentsData,
    lowToHigh,
  });
  const start = (page - 1) * pageCount;
  const end = page * pageCount;

  return orderedTournamentsData.slice(start, end);
};

const pageCount = 6;
const ListPage = () => {
  const navigate = useNavigate();
  const { tournaments, deleteTournament, upPoint, downPoint } =
    useTournaments();
  const [lowToHigh, setLowToHigh] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(tournaments.length / pageCount);

  console.log('totalPages', totalPages);

  return (
    <PageLayout>
      <PageHeader>
        <Button
          text="Add Nominee"
          variant="addnom"
          onClick={() => navigate('add')}
        />
        <Button
          onClick={() => {
            setLowToHigh(!lowToHigh);
          }}
          text="Sort By"
          variant="sortby"
        />
      </PageHeader>
      <PageContent>
        <div className="list-page__heading">
          <strong>VOTE</strong> FOR <strong>THE BEST TOURNAMENT</strong>{' '}
          STREAMED!
        </div>
        <div className="list-page__tournaments">
          {tournaments &&
            getTournaments({
              tournamentsData: tournaments,
              lowToHigh,
              page,
              pageCount,
            }).map((tournament) => (
              <TournamentCard
                key={tournament.id}
                img={tournament.imageUrl}
                title={tournament.name}
                winner={tournament.winner}
                date={tournament.voteUpdateDate}
                points={tournament.points}
                id={tournament.id}
                upPoint={upPoint}
                downPoint={downPoint}
                updatePoint={() => {
                  console.log('Vote');
                }}
                deleteTournament={deleteTournament}
              />
            ))}
        </div>
        <div className="list-page__page-buttons">
          <PageButtons
            totalPages={totalPages}
            setPage={setPage}
            currentPage={page}
          />
        </div>
      </PageContent>
    </PageLayout>
  );
};

export default ListPage;
