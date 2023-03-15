import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
  