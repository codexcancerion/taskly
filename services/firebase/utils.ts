/* eslint-disable */

import { deleteDoc, getDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

import { db } from "./config";

/**
 * Add a document to an existing collection (or create if not exists)
 * @param {string} collectionName - The name of the collection
 * @param {object} data - The document data
 * @param {string} [docId] - Optional document ID
 * @returns {Promise<string>} The document ID
 */
export async function addDocument(
  collectionName: string,
  data: object,
  docId?: string,
): Promise<string> {
  if (docId) {
    await setDoc(doc(db, collectionName, docId), data);

    return docId;
  } else {
    const docRef = await addDoc(collection(db, collectionName), data);

    return docRef.id;
  }
}

/**
 * Update a document in a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} docId - The document ID
 * @param {object} data - The data to update (partial fields)
 * @returns {Promise<void>}
 */
export async function updateDocument(
  collectionName: string,
  docId: string,
  data: object,
): Promise<void> {
  await setDoc(doc(db, collectionName, docId), data, { merge: true });
}

/**
 * Read all documents from a collection with inferred types
 * @param collectionName - The name of the collection
 * @returns Array of documents with IDs
 */
export async function getAllDocuments<T = DocumentData>(
  collectionName: string
): Promise<(T)[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const res: T[] = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as T)
  );
  return res;
}


/**
 * Delete a document from a Firestore collection
 * @param {string} collectionName - The name of the collection
 * @param {string} docId - The document ID
 * @returns {Promise<void>}
 */
export async function deleteDocument(
  collectionName: string,
  docId: string,
): Promise<void> {
  await deleteDoc(doc(db, collectionName, docId));
}

export async function getDocumentById<T = DocumentData>(
  collectionName: string,
  docId: string,
): Promise<(T) | null> {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as T;
}

