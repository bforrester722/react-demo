import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Create a new user with email and password
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Sign in an existing user with email and password
export function signin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign in with Google
export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// Sign in with GitHub
export function signInWithGitHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

// Sign in with Facebook
export function signInWithFacebook() {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
}

// Log out the current user
export function logout() {
  return signOut(auth);
}
