import React, { Component, PropTypes} from 'react'
import imagesLoaded from 'imagesLoaded'



export default class ImagesLoader extends Component{

  constructor(props){
    super(props)
    this.state = {
      imagesLoaded:false
    }
  }

  componentDidMount() {
    document.documentElement.className = 'js'
    document.body.className = 'loading'
    imagesLoaded(this.root, ()=>{
      this.setState({
        imagesLoaded:true
      })
    })
  }

  render(){
    const {imagesLoaded} = this.state;
    if (imagesLoaded){
      document.body.classList.remove('loading')
    }
    return(
      <g ref={(dom)=>this.root=dom}>      
        {this.props.children}
      </g>
    )
  }
}