import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '../icons/google.png';
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ9cLex-z8woLW1cwt-5s0mIwZ67KXWcs",
  authDomain: "shs-course-choice-auth-2021.firebaseapp.com",
  projectId: "shs-course-choice-auth-2021",
  storageBucket: "shs-course-choice-auth-2021.appspot.com",
  messagingSenderId: "810594559995",
  appId: "1:810594559995:web:8d5c63ddb167f496180d5e"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default function Login({ profile, setProfile }) {

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      'hd': 'stirlingschools.net' // Restrict to stirlingschools.net hosted domain
    });

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successful login
        setProfile(result.user)
        toast.success("Successfully signed in!")
      }).catch(() => {
        // Error occured
        toast.error("An error occured while trying to sign in!")
      });
  }

  function signOutPls() {
    const auth = getAuth();

    signOut(auth).then(() => {
      // Successfully sign out, set profile to null
      setProfile(null)
      toast.success("Successfully signed out!")
    }).catch(() => {
      // Error occured
      toast.error("An error occured while trying to sign out!")
    });
  }

  return (
    profile ?
      (
        // User is logged in
        <div className="flex flex-col items-center justify-center m-8">
          <p>Signed in as:</p>
          {/* Display profile information */}
          <div className="flex items-center justify-center m-2">
            <img
              src={profile.photoURL}
              alt="profile"
              className="h-6 w-6 mr-2" />
            <p className="text-xl">{profile.displayName}</p>
          </div>
          <button className="hover:underline text-blue-700" onClick={signOutPls}>Log out</button>
        </div>
      ) : (
        // User is logged out
        <div className="flex flex-col items-center justify-center">
          <p className="flex justify-center mt-5 mb-1">To get started, please:</p>
          {/* Sign in with Google button */}
          <button onClick={googleSignIn} className="m-2 flex justify-items-start items-center bg-blue-100 rounded-full py-3 px-5">
            <img
              src={GoogleIcon}
              alt="google login"
              className="w-5 h-5 mr-5" />
            <p className="justify-items-center w-full mr-5 font-medium text-blue-700">Sign in with Google</p>
          </button>
        </div>
      )
  )
}