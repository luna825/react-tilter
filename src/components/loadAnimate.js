import React, { Component, PropTypes} from 'react'
import imagesLoaded from 'imagesLoaded'
import '../css/loadAnimate.css'



export default class LoadAnimate extends Component{

  constructor(props){
    super(props)
    this.state = {
      imagesLoading:true
    }
  }

  componentDidMount() {
    imagesLoaded(this.root, ()=>{
      this.setState({
        imagesLoading:false
      })
    })
  }

  renderLoadAnimate = () => 
    <div className='load_wrapper'>
      <div className='load_before'></div>
      <div className='load_after'></div>
    </div>

  render(){
    const {imagesLoading} = this.state;

    return(
      <main className='content' ref={(dom)=>this.root=dom}>
        { imagesLoading && this.renderLoadAnimate() }      
        {this.props.children}
      </main>
    )
  }
}