import React from 'react';


function FullSend() {

var isf = false;

    function follow()
    {

        if(isf===false)
        {
            
            //Not Following

            //Follow
            isf = true;
        }

    }

    function unfollow()
    {
        if(isf===true)
        {
            //Following

            //Unfollow
            isf = false;
        }
    }

    return(
        <button onClick={isf ? unfollow : follow}>
        {isf ? 'Unfollow' : 'Follow'}
        </button>

    );
}

export default FullSend;