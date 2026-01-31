import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/DBStore';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const Home = () => {
  const { faces, votes, deleteAllFromDB, isReady } = useStore();
  const [result, setResult] = useState({ positives: 0, negatives: 0 });

  const handleResetDB = () => {
    deleteAllFromDB();
    setResult({ positives: 0, negatives: 0 });
  };

  useEffect(() => {
    const pos = votes.filter((vote) => vote.vote === 'Thumb_Up').length;
    const neg = votes.filter((vote) => vote.vote === 'Thumb_Down').length;
    setResult({ positives: pos, negatives: neg });
  }, [isReady]);

  return (
    <>
      <h1 className="text-center p-4 text-lg">Home</h1>
      <section className="text-center">
        <p>Number of faces in database: {faces.length}</p>
        <p>Number of votes in database: {votes.length}</p>
      </section>
      <section className="p-4">
        <h3>Results</h3>
        <div>
          <p>Positives: {result.positives}</p>
          <p>Negatives: {result.negatives}</p>
        </div>
      </section>
      <section className="p-8">
        <h3 className="p-4 text-lg text-center">Actions</h3>
        <div className="flex justify-around">
          <NavLink to={'/face'}>
            <Button>Start Voting</Button>
          </NavLink>
          <Button onClick={handleResetDB}>Reset Database</Button>
        </div>
      </section>
    </>
  );
};

export default Home;