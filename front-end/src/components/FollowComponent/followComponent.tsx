import React from 'react';
import FirebaseContext from '../../firebase/context';
import { FirebaseRequirements } from '../../interfaces/common';



export default class followComponent extends React.Component {

    followCheckkkk() {
        const app = this.context as FirebaseRequirements;
        //Add current username to targets followers list
        app.db.ref("users/followers").push
        console.log("added to followers")

        //Adds targets username to current followings list
        app.db.ref("users/following").push
        console.log("added to following")

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <button onClick={this.followCheckkkk}>
                    {"Follow"}
                </button>
            </div>
        )
    }
}
followComponent.contextType = FirebaseContext;