// api.js
const GITHUB_API_URL = 'https://api.github.com/search/users?q=';

export const fetchGitHubUsers = async (query) => {
  const response = await fetch(`${GITHUB_API_URL}${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data.items;
};
