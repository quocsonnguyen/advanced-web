import React from 'react';
import { Layout } from './components/common'
import { LoginPage } from './components/modules'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function Test(props) {
    return (
        <Router>
            <Switch>

                <Route exact path="/" component={LoginPage}/>
     
                


                <Route exact path="/layout">
                    <div>
                        <Layout />
                    </div>
                </Route>


                
            </Switch>
        </Router>
    );
}

export default Test;