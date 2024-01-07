import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import Container from 'components/Container/Container';

export default function Layout() {
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
