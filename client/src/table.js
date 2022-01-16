import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import './styles/global.css'

class Thumbnail extends React.Component {
  constructor(props) {
		super(props)
  }

  state = {
    li : `/${this.props.image_itemId}`,
    status: ''
  }
  componentWillMount(){
    /*let stats = this.props.image_status.toString();
    if(stats == 'true'){
      this.setState({
        status: 'sold'
      })
    }
    else{
      this.setState({
        status: 'available'
      })
    }
*/
  }
  render() {
    return (
      <>
        <a href= {this.state.li} className="card link">
          <div>
            <div className="tryguy content meta button ">
            {this.props.task_desc}
            <br />
            {this.props.task_topic}
            </div>
            {this.props.task_ddline}
          </div>
          </a>
        </>
    )
  }
}
export default Thumbnail
