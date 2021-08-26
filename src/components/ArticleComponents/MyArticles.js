import React, { useState, useEffect } from 'react'
import { tokenHeader } from '../../HeaderService';
import axios from 'axios';
export default function MyArticles() {
    let i = 1;
    const [Articles, setArticles] = useState('');
    useEffect(() => {
        async function getmyArticles() {
            try {
                let structure = {
                    'method': 'get',
                    'url': 'https://manasxd17.herokuapp.com/myarticles',
                    'headers': tokenHeader()
                }
                const myArticles = await axios(structure)
                const myarticles = myArticles.data.articles.map((myarticle) => {
                    return {
                        'id': myarticle._id,
                        'author': myarticle.author,
                        'title': myarticle.title,
                        'desc': myarticle.body
                    }
                })
                setArticles(myarticles);
            }
            catch (err) {
                alert(err.response.data.error);
            }
        }
        getmyArticles();
    })

    const delArticle = async (e, _id) => {
        e.preventDefault();
        try{
            let structure = {
                'method': 'delete',
                'url': 'https://manasxd17.herokuapp.com/article',
                'headers': tokenHeader(),
                'data':{
                    '_id':_id
                }
            }
            const deleteData = await axios(structure)
            console.log(deleteData);
        }
        catch(err){
            alert(err.response.data.error);
        }
    }
    return (
        <div>
            <div>
                <h1 style = {{fontFamily:"Brush Script MT,cursive",textAlign:"center"}}>My articles</h1>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {Articles && Articles.map((perArticle) => {
                        return (
                            <div className="col-sm-6 col-md-4" key={perArticle.id}>
                                <div className="card border-dark mb-3">
                                    <div className="card-header">
                                    <p style = {{float:"left",fontSize:"15px"}}>Article {i++}</p>
                                    <button className ="btn btn-light" style = {{float:"right"}} onClick = {(e) => delArticle(e,perArticle.id)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i></button>
                                    </div>
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
    )
}
