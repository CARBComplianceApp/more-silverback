import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create/update user document
    const userRef = doc(db, 'users', user.uid);
    // Simple set on login to ensure record exists
    if (!user.isAnonymous) {
      // First check if it exists so we don't overwrite createdAt
      const existing = await getDocFromServer(userRef);
      if (!existing.exists()) {
        await setDoc(userRef, {
          email: user.email,
          createdAt: serverTimestamp()
        });
      }
    }
    
    return user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// Connection test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
