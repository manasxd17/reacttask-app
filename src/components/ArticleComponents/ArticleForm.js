import React,{ useState, useEffect} from 'react'
import { tokenHeader } from '../../HeaderService';
import axios from 'axios';

export default function ArticleForm() {
    const [email, setEmail] = useState(null);
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }
    const descHandler = (event) => {
        setDescription(event.target.value);
    }

    useEffect(() => {
        async function fetchEmail(){
            try{
                let structure = {
                    'method':'get',
                    'url':'https://manasxd17.herokuapp.com/self',
                    'headers':tokenHeader()
                }
                const selfData = await axios(structure);
                setEmail(selfData.data.email)
            }
            catch(err){
                alert(err.response.data.error);
            }
        }
        fetchEmail();
    },[])

    const formData = {
        'title':Title,
        'body':Description,
        'author':email
    }
    
    const onPublish = async (event) => {
        event.preventDefault();
        try{
            let structure = {
                'method':'post',
                'url':'https://manasxd17.herokuapp.com/article',
                'headers':tokenHeader(),
                'data': formData
            }
            const res = await axios(structure);
            alert(`Article created with title : ${Title}`)
            setTitle('');
            setDescription('')
        }
        catch(err){
            alert(err.response.data.error);
        }
        
    }

    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <div className="card text-white bg-dark mb-3 col-sm-6">
                    <form className="mx-auto" onSubmit={onPublish}>
                        <h3 style={{ textAlign: "center", fontFamily: "Brush Script MT,cursive" }}>Create Article</h3>
                        <div className="form-group">
                            <label>Article Title</label>
                            <input type="text" className="form-control" placeholder="Enter Title" onChange={titleHandler} value={Title} required />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" rows="5" placeholder="Write your blog content here" onChange={descHandler} value={Description} required></textarea>
                        </div>
                        <br />
                        <div className="pl-5 mb-2">
                            <button className="btn btn-light" type="submit">Publish <i className="fa fa-database" aria-hidden="true"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
