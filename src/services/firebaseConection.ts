import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDOBdNBuWSskSos4QmJyyKeN_t1RVwZZRY',
  authDomain: 'webcarros-5cfae.firebaseapp.com',
  projectId: 'webcarros-5cfae',
  storageBucket: 'webcarros-5cfae.appspot.com',
  messagingSenderId: '350674790835',
  appId: '1:350674790835:web:03d07e9b38d018d60503c6',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };
