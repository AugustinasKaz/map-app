import React from 'react';
import '../static/loading_error.css'

class Tmp extends React.Component {


    render(){
        if(this.props.info === 'Loading'){
        return(
            <div className="main">
            <h1 className="head">Loading</h1>
            <div className="spinner">

            </div>
            </div>
        )
        }
        else{
        return(
            <h1>Error occured</h1>
        )
        }
    }

}    

export default Tmp;