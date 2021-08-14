import { auth, firestore, storage } from "./firebase";
import { Redirect,Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import "./home.css"
let Home = (props) => {
    let value = useContext(AuthContext);
    const [posts, setposts] = useState([]);
    useEffect(() => {
        let unsubscribe = firestore.collection("posts").onSnapshot((querySnapshot) => {
            setposts(querySnapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            })
            )
        })
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div>
            {value ?
                <>
                    <div className="post-container">
                        {posts.map((post, index) => {
                            return <VideoCard key={index} post={post} />;
                        })}
                    </div>
                    <Link to="/profile">
                        <button id="profile">Profile</button>
                    </Link>
                    <button className="logOut" onClick={() => {
                        auth.signOut();
                    }}>Sign Out</button>
                    <input type="file" className="upload-btn"
                        onClick={(e) => {
                            e.target.value = null;
                        }}
                        onChange={(e) => {
                            let { name, size, type } = e.target.files[0];

                            let file = e.target.files[0];
                            size = size / 1000000;
                            type = type.split('/')[0];
                            if (type != 'video') {
                                alert("Please upload a video");
                                return;
                            }
                            else if (size > 10) {
                                alert("File is too big");
                                return;
                            }
                            else {

                                //gives these two functions
                                let f1 = (snapshot) => {
                                    let bytesTransferred = snapshot.bytesTransferred;
                                    let totalBytes = snapshot.totalBytes;
                                    console.log((bytesTransferred / totalBytes) * 100);
                                }

                                //gives error
                                let f2 = (error) => {
                                    console.log(error);
                                }

                                //gets activated when upload is complete functions
                                let f3 = () => {
                                    let prom = taskToUpload.snapshot.ref.getDownloadURL();
                                    prom.then((url) => {
                                        firestore.collection("posts").add({
                                            url,
                                            uid: value.uid,
                                            username: value.displayName,
                                            song: "",
                                            Likes: 0,
                                            Comments: [],
                                        });
                                    })

                                }
                                let taskToUpload = storage.ref(`/posts/${value.uid}/${name + Date.now()}`).put(file);

                                taskToUpload.on("state_changed", f1, f2, f3);
                            }
                        }} />
                </>

                : <Redirect to="/" />
            }
        </div>
    )
}
export default Home