import * as yup from 'yup';

const AddSchema = yup.object().shape({
  tournamentName: yup.string().required('Tournament Name is required'),
  winner: yup.string().required('Tournament Winner is required'),
  image: yup.string().required('Image url is required'),
});

export default AddSchema;
