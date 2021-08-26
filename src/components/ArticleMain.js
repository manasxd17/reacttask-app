import React, { useEffect, useState } from 'react'
import Navbar from './ArticleComponents/Navbar';
import ArticleForm from './ArticleComponents/ArticleForm';
import { Route, Switch } from 'react-router-dom';
import { tokenHeader } from '../HeaderService';
import axios from 'axios';
import MyArticles from './ArticleComponents/MyArticles';
export default function ArticleMain() {
    let i = 1;
    const [Articles, setArticles] = useState('');
    useEffect(() => {
        async function getallArticles() {
            try {
                let structure = {
                    'method': 'get',
                    'url': 'https://manasxd17.herokuapp.com/articles',
                    'headers': tokenHeader()
                }
                const allArticles = await axios(structure)
                const articles = allArticles.data.articles.map((article) => {
                    return {
                        'id': article._id,
                        'author': article.author,
                        'title': article.title,
                        'desc': article.body
                    }
                })
                setArticles(articles);

            }
            catch (err) {
                alert(err.response.data.error);
            }
        }
        getallArticles();
    })
    return (
        <div>
            <Navbar></Navbar>
            <Switch>
                <Route path="/articles/articleform">
                    <ArticleForm></ArticleForm>
                </Route>
                <Route path="/articles/myarticles">
                    <MyArticles></MyArticles>
                </Route>
            </Switch>
            <div>
                <h1 style={{ fontFamily: "Brush Script MT,cursive", textAlign: "center" }}>All articles</h1>
            </div>

            <div>
                <div className="container mt-4">
                    <div className="row">
                        {Articles && Articles.map((perArticle) => {
                            return (
                                <div className="col-sm-6 col-md-4" key={perArticle.id}>
                                    <div className="card border-dark mb-3">
                                        <div className="card-header">Article {i++}</div>
                                        <div className="card-body text-dark">
                                            <h5 className="card-title">{perArticle.title}</h5>
                                            <p className="card-text">{perArticle.desc}</p>
                                            <small className="card-footer text-muted">Created by : {perArticle.author}</small>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
