import { useEffect, useState } from 'react';
import {
  get,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  ref,
} from 'firebase/database';
import { db } from 'server/firebaseConfig.js';

const PAGE_SIZE = 4;

export const useLoadMore = ({ teachers, setTeachers }) => {
  const [lastKey, setLastKey] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    let dataQuery;
    const dbRef = ref(db, 'teachers/');
    if (lastKey) {
      dataQuery = query(
        dbRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE)
      );
    } else {
      dataQuery = query(dbRef, orderByKey(), limitToFirst(PAGE_SIZE));
    }

    const snapshot = await get(dataQuery);

    const newData = snapshot.val();

    if (!newData) {
      setHasMore(false);
      return;
    }

    const keys = Object.keys(newData);
    setLastKey(keys[keys.length - 1]);
    setTeachers(prevData => [
      ...prevData,
      ...Object.entries(newData).map(([id, value]) => ({ id, ...value })),
    ]);

    if (keys.length < PAGE_SIZE) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return { teachers, hasMore, loadMore };
};
