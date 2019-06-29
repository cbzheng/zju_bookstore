import * as React from 'react'
import 'react-bootstrap'
// import {Container, Jumbotron, Image, CardDeck} from "react-bootstrap";
import {useEffect, useState} from "react";
import {List, Avatar, Button, Divider, Tag, Drawer} from 'antd'
import {getAllMsg} from "../../API";
import log from '../../static/boy.png'
import MsgPanel from "./msg-panel";
import bookLogo from "../../static/book.png";
import {JSX} from "@babel/types";

export interface Props {
    username: string
}

interface msgItem {
    user: string,
    unread: number,
    communicator: string,
    msg_set: Array<object>
}

function MsgPage(props: Props) {

    let defaultItem = {
        communicator: '',
        msg_set: [{
            time: '',
            content: '',
            isRead: true
        }],
        unread: 0,
        user: ''
    };

    const [msgList, setMsgList] = useState([<></>]);

    let data: any = [];

    const fetchBooks = async () => {
        data = await getAllMsg(props.username);
        let mList = [];

        for (let communicator in data) {

            let unread = 0;
            for (let i in data[communicator]) {
                if (data[communicator][i].isRead === false) {
                    unread++
                }
            }
            mList.push(<MsgPanel
                user={props.username}
                communicator={communicator}
                msg_set={data[communicator]}
                unread={unread}/>);
            // mList.push({user:props.username, communicator: communicator, msg_set: data[communicator],unread:unread});
        }

        setMsgList(mList);
        // console.log('m list', mList);
    };

    useEffect(() => {
        // setMsgList([defaultItem]);
        fetchBooks();
        console.log('msg list', msgList);
    }, []);


    return (
        <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '10%'}}>
            <Divider>消息列表</Divider>
            {/*<List*/}
            {/*itemLayout="horizontal"*/}
            {/*dataSource={msgList}*/}
            {/*renderItem={item => (*/}
            {/*<MsgPanel*/}
            {/*user={props.username}*/}
            {/*communicator={item.communicator}*/}
            {/*msg_set={data[item.communicator]}*/}
            {/*unread={item.unread}/>*/}
            {/*)}*/}
            {/*/>*/}
            {msgList}
        </div>
    )
}

export default MsgPage