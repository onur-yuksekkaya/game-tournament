/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddSchema from '../schema/AddSchema';
import { useTournaments } from '../context/TournamentContext';
import Button from './Button';

import './AddForm.style.scss';
import useSweetAlert from '../hooks/useSweetAlert';

const AddForm = () => {
  const { createTournament } = useTournaments();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(AddSchema),
  });
  const { successAlert } = useSweetAlert();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const onSubmit = async (data) => {
    console.log('data', data);
    const { tournamentName, winner, image } = data;

    createTournament({
      tournamentName,
      tournamentWinner: winner,
      tournamentImageUrl: image,
    }).then(() => {
      successAlert('New nominee added to nominees!');
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-form">
      <div className="add-form__block">
        <label htmlFor="tournamentName">Tournament Name</label>
        <input
          id="tournamentName"
          placeholder="Tournament Name"
          type="text"
          {...register('tournamentName')}
        />
        <p>{errors.tournamentName?.message}</p>
      </div>
      <div className="add-form__block">
        <label htmlFor="tournamentWinner">Tournament Winner Team</label>
        <input
          id="tournamentWinner"
          placeholder="Tournament Winner"
          type="text"
          {...register('winner')}
        />
        <p>{errors.winner?.message}</p>
      </div>
      <div className="add-form__block">
        <label htmlFor="tournamentImage">Cover Image URL</label>
        <input
          id="tournamentImage"
          placeholder="image url"
          type="text"
          {...register('image')}
        />
        <p>{errors.image?.message}</p>
      </div>
      <Button type="submit" text="Add Nominee" variant="submit"></Button>
    </form>
  );
};

export default AddForm;
