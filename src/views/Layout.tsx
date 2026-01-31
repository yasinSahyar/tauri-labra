import { Outlet, NavLink } from 'react-router';
import { Button } from '@/components/ui/button';

const Layout = () => {
  return (
    <>
      <header className="p-4 bg-stone-900 text-stone-50 flex flex-wrap items-center justify-between">
        <div>
          <img src="/tauri.svg" alt="logo" className="w-12 h-12" />
        </div>
        <div>
          <h1 className="text-2xl">Facevote V2</h1>
        </div>
        <div>
          <NavLink to={'/'}>
            <Button variant={'secondary'}>Home</Button>
          </NavLink>
        </div>
      </header>
      <section className="bg-stone-800 text-stone-50">
        <Outlet />
      </section>
    </>
  );
};

export default Layout;