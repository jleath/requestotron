import axios from 'axios';

const BIN_CREATOR_PATH = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://requestotron.joshleath.com';

const requestNewBin = async () => {
  const response = await axios.post(BIN_CREATOR_PATH);
  return response.data.url;
};

const bins = {
  requestNewBin,
};

export default bins;