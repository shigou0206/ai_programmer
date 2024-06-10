import React from 'react';
import { GitHubUser } from '../api/github';
import { getSignedUrl } from '../api/s3';

interface UserListProps {
  items: GitHubUser[];
  onToggleLike: (id: number) => void;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  items, onToggleLike, isLoading, error, currentPage, itemsPerPage, onPageChange
}) => {
  const handleGenerateLink = async (s3Key: string) => {
    const signedUrl = await getSignedUrl(s3Key);
    window.open(signedUrl, '_blank');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          &laquo;
        </button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => onPageChange(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div>
      <ul className="user-list">
        {currentItems.map(user => (
          <li key={user.id} className="user-item">
            <img src={user.avatar_url} alt={user.login} width={50} height={50} />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
            <button onClick={() => onToggleLike(user.id)}>
              {user.liked ? 'Unlike' : 'Like'}
            </button>
            <a href="#" onClick={async (e) => { 
                e.preventDefault(); 
                await handleGenerateLink(user.s3Key);
              }}>
              View PDF
            </a>
          </li>
        ))}
      </ul>
      {renderPageNumbers()}
    </div>
  );
};

export default UserList;
