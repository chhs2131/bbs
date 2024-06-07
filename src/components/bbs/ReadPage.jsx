import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import {fs} from "../../firebaseInit";
import {collection, query, orderBy, getDoc, deleteDoc, doc} from 'firebase/firestore';

const ReadPage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id} = useParams();
    const [post, setPost] = useState('')
    const myEmail = sessionStorage.getItem("email");

    const callAPI = async() => {
        setLoading(true);
        const docRef = doc(fs,`posts/${id}`);
        const res = await getDoc(docRef);

        setPost(res.data());
        setLoading(false);
    }
    const {email, date, title, contents} = post;

    useEffect(()=>{
        callAPI();
    }, []);

    if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col xs={10} md={8} lg={7}>
                <h1>게시글정보</h1>
                {myEmail===email &&
                <div className='text-end'>
                    <Button variant='success' size="sm" className='me-2'>수정</Button>
                    <Button variant='danger' size="sm">삭제</Button>
                </div>
                }
                <Card>
                    <Card.Body>
                        <h5>{title}</h5>
                        <div className='text-muted'>
                            <span className='me-3'>{date}</span>
                            <span>{email}</span>
                        </div>
                        <hr/>
                        <div style={{whiteSpace: 'pre-wrap'}}>{contents}</div>
                    </Card.Body>
                </Card>
           </Col>
        </Row>
    );
};

export default ReadPage;
