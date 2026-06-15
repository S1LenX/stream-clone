import { db } from "../utils/firebase";
import { doc, setDoc, collection, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

const useWatchHistory = () => {
  const user = useSelector(store => store.user);

  const addToHistory = async (movie, isTV = false) => {
    if (!user) return;
    try {
      const ref = doc(db, "watchHistory", user.uid, "movies", String(movie.id));
      await setDoc(ref, {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        isTV: isTV,
        watchedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to save watch history", err);
    }
  };

  const getHistory = async () => {
    if (!user) return [];
    try {
      const ref = collection(db, "watchHistory", user.uid, "movies");
      const q = query(ref, orderBy("watchedAt", "desc"), limit(10));
      const snap = await getDocs(q);
      return snap.docs.map(doc => doc.data());
    } catch (err) {
      console.error("Failed to fetch watch history", err);
      return [];
    }
  };

  return { addToHistory, getHistory };
};

export default useWatchHistory;