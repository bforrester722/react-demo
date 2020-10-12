// helper functions
import {firestore } from '../firebase/firestore';

// wait for awaiting a specific time
export function wait(waitTime, callback) {
	return new Promise(resolve => {
		window.setTimeout(() => {
			window.requestAnimationFrame(() => {
				if (!callback) { resolve(); }
				if (typeof callback === 'function') {
	    		resolve(callback());
	    	}
			});
		}, waitTime);
	});
};

// gets doc from firebase
export const get = async ({coll, doc}) => {
  const docData = await firestore.collection(coll).doc(doc).get();
  if (docData.exists) {
    return docData.data();
  }
  throw new Error(`No such document! ${coll}/${doc}`);
};

// saves doc to firebase
export const set = async ({coll, doc, data, merge = true}) => {
	// 'set' with merge true create a document if one does not already exist
	// and will only overwrite specified fields that are passed in
	await firestore.collection(coll).doc(doc).set(data, {merge});
  return `${doc} document set`;
};