import React from 'react';
import '../static/loading_error.css'

class Tmp extends React.Component {


    render(){
        if(this.props.info === 'Loading'){
        return(
            <div className="main">
            <h1 className="head">Loading...</h1><br/>
            <h5 className="head_info">Fetching GraphQl data</h5><br/>
            <div className="spinner">
              <div className="loader"></div>
            </div>
            </div>
        )
        }
        else{
        return(
            <div className="main">
            <h1 className="head">Error occured {this.props.info}</h1>
            </div>
        )
        }
    }

}    

export default Tmp;