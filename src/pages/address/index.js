import React ,{Component} from 'react';
import { Route, Switch , Redirect} from "react-router-dom";
import Add from "./add.js"
import Edit from "./edit.js"
import List from "./list.js"
import "./index.css";

export default class Address extends Component{
    render(){

        return(
            <Switch>
                <Route path="/static/address/add" exact render={()=>{return <Add {...this.props} />}} />
                <Route path="/static/address/edit/:id" exact render={()=>{return <Edit {...this.props} />}} />
                <Route path="/static/address/list" exact render={()=>{return <List {...this.props} />}} />
                <Redirect to="/static/address/list" />
            </Switch>
        )
    }
}




