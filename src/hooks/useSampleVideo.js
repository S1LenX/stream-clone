import { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const useSampleVideo = (movieId) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchVideo = async () => {
      setVideoLoading(true);
      try {
        const docRef = doc(db, "sampleVideos", String(movieId));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideoUrl(docSnap.data().videoUrl);
        } else {
          setVideoUrl(null);
        }
      } catch (err) {
        console.error("Error fetching sample video:", err);
        setVideoUrl(null);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideo();
  }, [movieId]);

  return { videoUrl, videoLoading };
};

export default useSampleVideo;