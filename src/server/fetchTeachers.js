import { get, query, orderByKey, ref } from 'firebase/database';
import { db } from 'components/firebaseConfig.js';

export async function fetchTeachers() {
  const dbRef = ref(db, 'teachers/');
  const dataQuery = query(dbRef, orderByKey());

  const snapshot = await get(dataQuery);

  const data = snapshot.val();

  if (!data) {
    return [];
  }

  return Object.entries(data).map(([id, value]) => ({
    id,
    ...value,
  }));
}
