import React ,{Component} from "react";
import { HashRouter as Router, Route , Switch } from "react-router-dom";
import Home from '../../pages/home';
import privilegeMember from '../../pages/privilege_member'
import purseWater from '../../pages/purseWater';
import systemMessage from '../../pages/systemMessage';
import confirmPayment from '../../pages/confirmPayment';
import myWallet from '../../pages/myWallet';
import bindUpPhone from '../../pages/bindUpPhone';
import personal from '../../pages/personal';
import Address from '../../pages/address';
import Help from '../../pages/help';

import { mapStateToProps,mapDispatchToProps } from "../../redux/store";
import { connect } from 'react-redux';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            ...this.props
        }
    }
    render(){
        return (
            (<Router>
                <Switch>
                    <Route path="/static/home" component={Home} />
                    <Route path="/static/privilegeMember" component={privilegeMember} />
                    <Route path="/static/purseWater" component={purseWater} />
                    <Route path="/static/systemMessage" component={systemMessage} />
                    <Route path="/static/confirmPayment" component={confirmPayment} />
                    <Route path="/static/myWallet" component={myWallet} />
                    <Route path="/static/bindUpPhone" component={bindUpPhone} />
                    <Route path="/static/personal" component={personal} />
                    <Route path="/static/address" component={Address} />
                    <Route path="/static/help" component={Help} />
                    
                </Switch>
            </Router>)
        );
    }
}

let WrapApp=connect(mapStateToProps,mapDispatchToProps)(App);
export default WrapApp;