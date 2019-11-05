import React from 'react'


const Notification = ({msg, isError}) => {

    if(msg === null) return null
    else if(isError){

        return (
            <div class="error">
                {msg}
            </div>
        )

    }else{

        return(

            <div class="note">
                {msg}
            </div>

        )
    }

}

export default Notification