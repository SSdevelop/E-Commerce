import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCwSJ92nd6Y_chTyxjuqlmrSa4ch0Quy-k',
	authDomain: 'crwn-db-77919.firebaseapp.com',
	projectId: 'crwn-db-77919',
	storageBucket: 'crwn-db-77919.appspot.com',
	messagingSenderId: '652490849439',
	appId: '1:652490849439:web:ccbae23678d472126d76aa',
	measurementId: 'G-C43RNP9XHQ',
};

firebase.initializeApp(config);

export const createUserProfileRequest = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (err) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
