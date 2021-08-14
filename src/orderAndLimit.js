import { useEffect } from "react";
import { firestore } from "./firebase";
function orderAndLimit() {

    useEffect(() => {
        let f = async () => {
            let querySnapshot = await firestore.collection("posts").limit(5).orderBy('idx', 'asc').get();
            querySnapshot.forEach((el) => {
                console.log(el.data());
            })
        }
        f();
    }, []);
}

export default orderAndLimit;