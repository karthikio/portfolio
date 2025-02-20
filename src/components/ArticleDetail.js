import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import "../styles/ArticleDetail.css";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle(docSnap.data());
          setError(false);
        } else {
          setArticle(null); // Ensure article is set to null if not found
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        setArticle(null); // Ensure article is set to null on error
        setError(true);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or error
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="article-detail-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail-container">
        <h2>No article found</h2>
        <p>Sorry, the article you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="article-detail-container">
      {article.date ? (
        <p className='article-date'>
          Published on: {new Date(article.date.seconds * 1000).toLocaleDateString()}
        </p>
      ) : (
        <p className='article-date'>No date available</p>
      )}
      <img className="article-image" src={article.imageURL} alt={article.title} />
      <h1>{article.title}</h1>
      <div 
        className="article-body" 
        dangerouslySetInnerHTML={{ __html: article.body }} // Render HTML content
      />
    </div>
  );
};

export default ArticleDetail;