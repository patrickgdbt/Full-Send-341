import React from 'react';

export default class ProfilePosts extends React.Component<UserProps, UserState>{
    constructor(props: any){
        super(props);
        this.state = {posts: ["POST NUMBER ONE", "POST NUMBER TWO", "POST NUMBER THREE", "POST NUMBER FOUR", "POST NUMBER FIVE", "POST NUMBER SIX",]};
    }

    render(){
        return(
            <div>
                {this.state.posts.map((item: any) => (<li key={item}> This user posted:<br/> {item} </li> ))}
            </div>
        );
    }
}

interface UserProps{}

interface UserState{
    posts: any
}