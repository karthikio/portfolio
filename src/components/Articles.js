import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/Articles.css';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articlesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
    <h1>My Articles</h1>
      <div className="articles-card-container">
      {articles.map((article, index) => (
          article.link ? ( // Check if the article has an external link
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              <div className="article">
                <img className="article-image" src={article.imageURL} alt={article.title} />
                <h2>{article.title} 🔗</h2>
                <p>{article.about}</p>
              </div>
            </a>
          ) : ( // If no external link, use internal Link to the detail page
            <Link key={index} to={`/articles/${article.id}`} className="article-link">
              <div className="article">
                <img className="article-image" src={article.imageURL} alt={article.title} />
                <h2>{article.title}</h2>
                <p>{article.about}</p>
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default Articles;