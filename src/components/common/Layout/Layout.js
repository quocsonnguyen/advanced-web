import React from 'react';

const Layout = (props) => {
    return (
        <div className="row">
            <div className="col-3">
                hehe
            </div>

            <div className="col-9">
                {props.children}
                <p>{props.text}</p>
            </div>
        </div>
    );
};

export default Layout;