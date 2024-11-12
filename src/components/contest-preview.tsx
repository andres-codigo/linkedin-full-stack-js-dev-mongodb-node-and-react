import * as React from "react";

interface Contest {
  id: string;
  categoryName: string;
  contestName: string;
}

const ContestPreview: React.FC<{
  contest: Contest;
  onClick: (id: string) => void;
}> = ({ contest, onClick }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    onClick(contest.id);
  };

  return (
    <div className="contest-preview link" onClick={handleClick}>
      <div className="category">{contest.categoryName}</div>
      <div className="contest">{contest.contestName}</div>
    </div>
  );
};

export default ContestPreview;
