import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import { Wrapper } from '../components/wrapper';

export function LayoutDefault() {
  return (
    <div className="">
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
}
