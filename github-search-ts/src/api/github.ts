const GITHUB_API_URL = 'https://api.github.com/search/users?q=';

export interface GitHubUser {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  liked: boolean;
  s3Key: string;
}

export interface ApiResponse {
  queryId: string;
  items: GitHubUser[];
}

export const fetchGitHubUsers = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    const items = data.items.map((user: any) => ({
      id: user.id,
      login: user.login,
      html_url: user.html_url,
      avatar_url: user.avatar_url,
      liked: false,
      s3Key: `${user.login}.pdf`,
    }));
    return { queryId: query, items };
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
