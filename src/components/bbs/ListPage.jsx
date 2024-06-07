import React, {useEffect, useState} from 'react';
import {Col, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

import {fs} from "../../firebaseInit";
import {addDoc, collection, onSnapshot, query, orderBy} from 'firebase/firestore';
import {useNavigate} from "react-router-dom";

import Pagination from 'react-js-pagination';
import './paging.css'

const ListPage = () => {
    const email = sessionStorage.getItem('email');
    const uid = sessionStorage.getItem('uid');
    const [posts, setPosts] = useState([]);

    // 페이지네이션
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(1);


    const navi = useNavigate();

    const callAPI = () => {
        const q = query(collection(fs, 'posts'), orderBy('date', 'desc'));

        onSnapshot(q, snapshot => {
            // onSnapshot(collection(fs, 'posts'), snapshot => {
            let rows = [];
            let no = 0;
            snapshot.forEach(row => {
                no++;
                rows.push({no, id:row.id, ...row.data()});
            });
            const start = (page-1) * size + 1;
            const end = page * size;

            let data = rows.map((row,index) => row && {seq:no-index, ...row});
            data = rows.filter(row => row.no >= start && row.no <= end);

            setCount(no);
            setPosts(data);
        })
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    return (
        <Row>
            <Col xs={12} md={10} lg={8}>
                <h1>게시글목록</h1>
                {uid && <div><Button className='px-5'>글쓰기</Button></div>}

                <Table>
                    <thead>
                    <tr>
                        <td>No.</td>
                        <td>Title</td>
                        <td>Writer</td>
                        <td>Date</td>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map(post =>
                        <tr key={post.id}>
                            <td>{post.no}</td>
                            <td><a href={`/bbs/read/${post.id}`}>{post.title}</a></td>
                            <td>{post.email}</td>
                            <td>{post.date}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                <Pagination className="pagination"
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={count}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={(e)=>setPage(e)}/>
            </Col>
        </Row>
    );
};

export default ListPage;
