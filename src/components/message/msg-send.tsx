import * as React from 'react'
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import moment from 'moment';
import {useState} from "react";
import figure from '../../static/boy.png'
import {sendMsg} from "../../API";

const { TextArea } = Input;

export interface Props {
    sender: string,
    receiver: string
}

function MsgSender(props: Props) {
    const [value, setVal] = useState('');
    const [submitting, setSubmitting] = useState(false);

    let handleSubmit = async () => {

        let data = await sendMsg(props.sender, props.receiver, value);
        message.success('成功发送消息！');
        setSubmitting(true);
        setVal("")
    };

    const Editor = (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={(e:any)=>{setVal(e.target.value)}} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit"  onClick={handleSubmit} type="primary">
                    发送
                </Button>
            </Form.Item>
        </div>
    );


    return (
            <div>
                <Comment
                    avatar={
                        <Avatar
                            src={figure}
                            alt="me"
                        />
                    }
                    content={
                        Editor
                    }
                />
            </div>
        );
}

export default MsgSender