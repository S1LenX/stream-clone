import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const useFetchHistory = () => {
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const user = useSelector(store => store.user);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      setHistoryLoading(true);
      try {
        const ref = collection(db, "watchHistory", user.uid, "movies");
        const q = query(ref, orderBy("watchedAt", "desc"), limit(10));
        const snap = await getDocs(q);
        setHistory(snap.docs.map(doc => doc.data()));
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetch();
  }, [user]);

  return { history, historyLoading };
};

export default useFetchHistory;