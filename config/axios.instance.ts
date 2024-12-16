import axios  from 'axios';

const api = axios.create({
  baseURL: 'https://8dcf-103-135-175-162.ngrok-free.app/api',
  headers: {
    Authorization: 'token <YOUR_GithubPersonalAccessToken_HERE>',
  },
});

export default api