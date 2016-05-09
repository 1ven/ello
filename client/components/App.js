import React from 'react';
import NoticeContainer from '../containers/NoticeContainer';
import Header from './Header';

export default ({ children }) => (
    <div>
        <Header
            user={{
                username: 'roaiven',
                role: 'web developer'
            }}
        />
        <div className="b-route-handler">
            {children}
        </div>
        <NoticeContainer />
    </div>
);
