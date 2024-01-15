import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import Container from 'components/Container/Container';
import useAuth from 'hooks/useAuth';

export default function Layout() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>; // Или любой другой индикатор загрузки
  }

  return (
    <>
      <Container>
        <Header />
      </Container>
      <main>
        <Suspense fallback={<Loader />}>
          {/* <Section isNotFoundPage={isNotFoundPage}> */}
          <Container>
            <Outlet />
          </Container>
          {/* </Section> */}
        </Suspense>
      </main>
    </>
  );
}
