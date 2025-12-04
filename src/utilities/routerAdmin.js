import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";

function routersDoc() {
  const db = getFirestore();
  // Use the singular 'router' collection to match DynamicRedirect.vue
  return doc(db, "router", "routerDoc");
}

export async function getRoutes() {
  const ROUTERS_DOC = routersDoc();
  try {
    const snap = await getDoc(ROUTERS_DOC);
    if (!snap.exists()) return {};
    const data = snap.data();
    return data.routes || {};
  } catch (e) {
    console.warn("routerAdmin.getRoutes: read failed", e);
    return {};
  }
}

export async function setRoute(from, to) {
  const ROUTERS_DOC = routersDoc();
  const fieldPath = `routes.${from}`;
  try {
    // Use updateDoc with a field path so we only set the single entry in the map
    await updateDoc(ROUTERS_DOC, { [fieldPath]: to });
  } catch (err) {
    // If the doc doesn't exist yet, fall back to setDoc to create it
    // (setDoc with merge here only runs when doc missing)
    await setDoc(ROUTERS_DOC, { routes: { [from]: to } }, { merge: true });
  }
}

export async function deleteRoute(from) {
  const ROUTERS_DOC = routersDoc();
  // Remove the specific field from the map
  const field = `routes.${from}`;
  await updateDoc(ROUTERS_DOC, { [field]: deleteField() });
}

export default {
  getRoutes,
  setRoute,
  deleteRoute,
};
