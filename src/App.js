import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';

import useStyles from './styles.js';

const alankey = 'f6d183dac41c7023e511e1f176dbc9212e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const classes = useStyles();

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        alanBtn({
            key: alankey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                  setNewsArticles(articles);
                  setActiveArticle(-1);
                } else if (command === 'instructions') {
                  setIsOpen(true);
                } else if (command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
              },
            });
          }, []);

          return (
            <div>
                <div className={classes.logoContainer}>
                    <img src="https://i.pinimg.com/736x/43/69/c7/4369c70f12ebfe37f52981f5559243ba.jpg" className={classes.alanLogo} />
                </div>
                <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            </div>
          );
        };
        
        export default App;