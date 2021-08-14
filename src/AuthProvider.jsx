import { createContext, useEffect, useState } from "react";
import { auth, firestore } from './firebase';
export const AuthContext = createContext();
let AuthProvider = ({ children }) => {
    const [currUser, setcurrUser] = useState(null);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        let cleanup = auth.onAuthStateChanged(async (user) => {
            if (user) {
                let { displayName, email, uid, photoURL } = user;
                let docRef = firestore.collection("users").doc(uid);
                let doc = await docRef.get();
                if (!doc.exists) {
                    docRef.set({
                        displayName,
                        email,
                        photoURL,
                    })
                }
                setcurrUser({ displayName, email, uid,photoURL });
            }
            else {
                setcurrUser(user);
            }
            setLoading(false);
        })
        return () => {
            cleanup();
        }
    }, []);
    return (
        <AuthContext.Provider value={currUser}>
            {!Loading && children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;