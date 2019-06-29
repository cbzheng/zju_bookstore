import {Drawer, Button, Radio, Tag, Comment, Avatar, Tooltip, Badge} from 'antd';
import * as React from 'react'
import {Card} from 'react-bootstrap'
import {useState} from "react";
import Item from "antd";
import {getAllMsg, getUserWant, readMsg} from "../../API";
import {useEffect} from "react";
import boy from '../../static/boy.png'
import MsgSender from "./msg-send";

const RadioGroup = Radio.Group;

interface msgInfo {
    time: string,
    content: string,
    isRead: boolean,
    sender: string
}

export interface Props {
    user: string,
    communicator: string,
    msg_set: Array<msgInfo>
    unread: number
}

function MsgPanel(props: Props) {
    const [visible, setVisible] = useState(false);
    const [unread, setUnread ] = useState(props.unread);
    const [msgList, setMsgList] = useState([<></>]);


    const fetchBooks = async () => {
        console.log('msg', props.msg_set);
        let mList = [];
        for (let i in props.msg_set) {
            mList.push(
                <Comment
                    author={props.msg_set[i].sender}
                    avatar={
                        <Avatar
                            src={boy}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                            {props.msg_set[i].content}
                        </p>
                    }
                    datetime={
                        <Tooltip title={props.msg_set[i].time}>
                            <span>{props.msg_set[i].time}</span>
                        </Tooltip>
                    }
                />
            );
        }
        setMsgList(mList);

    };

    useEffect(() => {
        fetchBooks();
    }, []);


    return (
        <div style={{width: '100%'}}>
            <Card>

                <Card.Header>
                    <Badge count={unread}>
                        来自{props.communicator}的消息：
                    </Badge>
                </Card.Header>
                <Card.Body>
                <a onClick={() => {
                    if (unread != 0){
                        readMsg(props.user, props.communicator);
                    }
                    setUnread(0);
                    setVisible(true);

                }}>
                    <p
                        className="text-muted"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '14px'
                        }}>
                        {props.msg_set[0].content}
                    </p>
                </a>
                </Card.Body>
                <Drawer
                    title="消息记录"
                    placement={'left'}
                    closable={false}
                    onClose={() => {
                        setVisible(false)
                    }}
                    visible={visible}
                    width={'40%'}
                    // height={'60%'}
                >
                    {msgList}
                    <MsgSender sender={props.user} receiver={props.communicator}/>
                </Drawer>
            </Card>
        </div>
    );

}

export default MsgPanel;