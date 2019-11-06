import React from 'react'


const Notification = ({msg, isError}) => {

    if(msg === null) return null
    else if(isError){

        return (
            <div className="error">
                {msg}
            </div>
        )

    }else{

        return(

            <div className="note">
                {msg}
            </div>

        )
    }

}

export default Notification