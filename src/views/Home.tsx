import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/DBStore';
import { NavLink } from 'react-router';

const Home = () => {
  const { faces, votes, deleteAllFromDB } = useStore();

  const handleResetDB = () => {
    deleteAllFromDB();
  };

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
          <p>Positives: 0</p>
          <p>Negatives: 0</p>
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
