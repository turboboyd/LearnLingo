import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          {/* <Section isNotFoundPage={isNotFoundPage}> */}
            {/* <Container> */}
              <Outlet />
            {/* </Container>
          </Section> */}
        </Suspense>
      </main>
    </>
  );
}
