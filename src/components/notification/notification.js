import React, { useState, useEffect, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import moment from 'moment';


import { Bell, BookOpen, AlertTriangle } from 'react-feather';
import { getNotification } from '../../redux/action/notification';
import { useDispatch, useSelector } from 'react-redux';
import { convert_datetime_to_day } from '../../utils/time';


const NotifyMe = props => {
    const notification = useSelector((state) => state.notification);
    // State variabls
    const [showCount, setShowCount] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [data, setData] = useState([])
    const [raedIndex, setReadIndex] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNotification())
    }, [])

    useEffect(() => {
        if (notification && notification.notifications) {
            setData(notification.notifications.item)
            setMessageCount(notification.notifications.number_not_read)
            if (notification.notifications.number_not_read > 0) {
                setShowCount(true)
            } else {
                setShowCount(false)
            }
        }
    }, [notification])

    // Useref for the overlay
    const ref = useRef(null);

    // Props passed to the component
    // const data = [{
    //     "is_read": false,
    //     "content": "Hello world!",
    //     "created_at": 1641662161000,
    // }

    // ];
    const storageKey = props.storageKey || 'notification_timeline_storage_id';
    const key = props.notific_key;
    const heading = props.heading || 'Notifications';
    const bellSize = props.size || 27;
    const multiLineSplitter = props.multiLineSplitter || '\n';
    const showDate = props.showDate || false;
    const Icon = props.icon || Bell;

    // Handle the click on the notification bell
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }

    // Calculate the day diff
    const getDayDiff = timestamp => {
        let a = moment();
        let b = moment(timestamp);
        let diff = a.diff(b, 'year');
        if (diff === 0) {
            diff = a.diff(b, 'month');
            if (diff === 0) {
                diff = a.diff(b, 'days');
                if (diff === 0) {
                    diff = a.diff(b, 'hour');
                    if (diff === 0) {
                        diff = a.diff(b, 'minute');
                        if (diff === 0) {
                            diff = a.diff(b, 'second');
                            return `${diff} giây trước`;
                        } else {
                            return `${diff} phút trước`;
                        }
                    } else {
                        return `${diff} giờ trước`;
                    }
                } else {
                    return `${diff} ngày trước`;
                }
            } else {
                return convert_datetime_to_day(timestamp);
            }
        } else {
            return convert_datetime_to_day(timestamp);
        }
    };

    const getWhen = timestamp => {
        let when = `${moment(timestamp).format('L')} ${moment(timestamp).format('LTS')}`;
        return when;
    }

    // Get the notification message
    const getContent = message => {
        if (message.indexOf(multiLineSplitter) >= 0) {
            let splitted = message.split(multiLineSplitter);
            let ret = '<ul>';

            for (let i = 0; i <= splitted.length - 1; i++) {
                if (splitted[i] !== '') {
                    ret = ret + '<li>' + splitted[i] + '</li>';
                }
            }

            ret = ret + '</ul>';
            return {
                __html: ret
            };
        }
        return {
            __html: `<ul><li>${message}</li></ul>`
        };
    };

    // Hide the notification on clicking outside
    const hide = () => {
        setShow(false);
    }

    // Call the function when mark as read link is clicked
    const markAsRead = () => {
        setShowCount(false);
        reactLocalStorage.setObject(storageKey, { 'id': data[0][key] });
        setReadIndex(0);
    }

    return (
        <>
            <div className={`notification ${showCount ? 'notify show-count' : 'notify'}`}
                data-count={messageCount}
                onClick={event => handleClick(event)}>
                <Icon color="#000000" size={bellSize} />
            </div>
            <div ref={ref}>
                <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref.current}
                    containerPadding={20}
                    rootClose={true}
                    onHide={hide}
                >
                    <Popover >
                        <Popover.Content >
                            {/* {showCount && <div>
                                <Button variant="link" onClick={props.markAsReadFn || markAsRead}>
                                    <BookOpen size={24} />
                                    Đánh dấu đã đọc
                                </Button>
                            </div>
                            } */}
                            <div className="dropdown-menu notification-ui_dd show" aria-labelledby="navbarDropdown">
                                <div className="notification-ui_dd-header">
                                    <h3 className="text-notification">Thông báo</h3>
                                </div>
                                <div className="notification-ui_dd-content">
                                    {
                                        data && data.length > 0 ?
                                            data.map((message, index) =>
                                            (
                                                <a href="#!" className="notification-list notification-list--unread text-dark">
                                                    <div className="notification-list_img">
                                                        <i className="far fa-comment-alt" />
                                                    </div>
                                                    <div className="notification-list_detail">
                                                        <p><b>{message && message.title}</b> <br /><span className="text-muted">{message && message.content}</span></p>
                                                    </div>
                                                    <p><small>{message && getDayDiff(message.created_at)}</small></p>
                                                </a>
                                            )
                                            ) :
                                            <>
                                                {/* <AlertTriangle color='#000000' size={32} /> */}
                                                <div className="notification-list notification-list--unread text-dark">
                                                    <div className="text-center">Không có thông báo nào!</div>
                                                </div>

                                            </>
                                    }

                                    {/* <a href="#!" className="notification-list text-dark">
                                        <div className="notification-list_img">
                                            <i className="far fa-comment-alt" />
                                        </div>
                                        <div className="notification-list_detail">
                                            <p><b>Giao hàng miễn phí</b> <br /><span className="text-muted">Nhập mã FREESHIP để giảm 30000Đ phí giao hàng</span></p>
                                        </div>
                                        <p><small>10 mins ago</small></p>
                                    </a> */}
                                </div>
                                <div className="notification-ui_dd-content">
                                    <a href="#!" className="btn-notification btn-success-notification btn-block-notification">Xem tất cả</a>
                                </div>
                            </div>

                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>
        </>
    )
};

export default NotifyMe;
