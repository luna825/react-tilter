import React, {Component, PropTypes} from 'react'
import anime from 'animejs'
import {deepAssign} from '../utils/util'

import '../css/tilter.css'


export default class TilTer extends Component {

  state = {
    imgWrapper:{},
    lines:{},
    caption:{},
    shine:{},
    overlay:{}
  };

  defaultMovement = {
    imgWrapper : {
      translation : {x: 0, y: 0, z: 0},
      rotation : {x: -5, y: 5, z: 0},
      reverseAnimation : {
        duration : 1200,
        easing : 'easeOutElastic',
        elasticity : 600
      }
    },
    lines : {
      translation : {x: 10, y: 10, z: [0,10]},
      reverseAnimation : {
        duration : 1000,
        easing : 'easeOutExpo',
        elasticity : 600
      }
    },
    caption : {
      translation : {x: 20, y: 20, z: 0},
      rotation : {x: 0, y: 0, z: 0},
      reverseAnimation : {
        duration : 1500,
        easing : 'easeOutElastic',
        elasticity : 600
      }
    },
    overlay : {
      translation : {x: 10, y: 10, z: [0,50]},
      reverseAnimation : {
        duration : 500,
        easing : 'easeOutExpo'
      }
    },
    
    shine : {
      translation : {x: 50, y: 50, z: 0},
      reverseAnimation : {
        duration : 1200,
        easing : 'easeOutElastic',
        elasticity: 600
      }
    }
  };

  static propTypes = {
    movement:PropTypes.shape({
      imgWrapper:PropTypes.object,
      lines:PropTypes.object,
      caption:PropTypes.object,
      overlay:PropTypes.object,
      shine:PropTypes.object
    }),
    img:PropTypes.string,
    className: PropTypes.string
  };

  constructor(props){
    super(props)
    this.movement = deepAssign({}, this.defaultMovement,this.props.movement )
  }


  componentDidMount() {
  }

  _setRange = (obj) =>{
    for (let k in obj){
      if (typeof obj[k] === 'number'){
        obj[k] = [-1*obj[k],obj[k]];
      }
    }
  }

  handleMove = ({pageX, pageY}) => {
    const bodyScrollTop = document.body.scrollTop;
    const bodyScrollLeft = document.body.scrollLeft;
    const offsets = this.root.getBoundingClientRect();
    const offsetX = pageX - bodyScrollLeft - offsets.left;
    const offsetY = pageY - bodyScrollTop - offsets.top;

    for (let key in this.movement){

      const t = this.movement[key].translation || {x:0,y:0,z:0}
      const r = this.movement[key].rotation || {x:0,y:0,z:0}

      this._setRange(t)
      this._setRange(r)
      
      const transforms = {
        translation: {
          x: (t.x[1]-t.x[0])/offsets.width*offsetX + t.x[0],
          y: (t.y[1]-t.y[0])/offsets.height*offsetY + t.y[0],
          z: (t.z[1]-t.z[0])/offsets.height*offsetY + t.z[0]
        },
        rotation:{
          x: (r.x[1]-r.x[0])/offsets.height*offsetY + r.x[0],
          y: (r.y[1]-r.y[0])/offsets.width*offsetX + r.y[0],
          z: (r.z[1]-r.z[0])/offsets.width*offsetX + r.z[0]
        }
      }

      this.setState({
        [key]:{
          transform: 
            `rotateX(${transforms.rotation.x}deg) rotateY(${transforms.rotation.y}deg) rotateZ(${transforms.rotation.z}deg) 
             translateX(${transforms.translation.x}px) translateY(${transforms.translation.y}px) translateZ(${transforms.translation.z}px)
            `
        }
      })

    }

  }

  handleLeave = () =>{

    Object.keys(this.refs).forEach(key=>{
      anime({
        targets: this.refs[key],
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        ...this.movement[key].reverseAnimation
      })
    })
  }

  handleEnter = () =>{
    for (let key in this.refs){
      anime.remove(this.refs[key])
    }
  }

  render(){
    const {imgWrapper, lines, caption, shine, overlay, animeDom} = this.state;
    const {img, className} = this.props;

    return(
      <a className={"tilter " + className} href="#" 
        ref={(dom)=>{this.root = dom}}
        onMouseMove={this.handleMove}
        onMouseLeave= {this.handleLeave}
        onMouseEnter={this.handleEnter}
      >
        <figure className="tilter_figure" style={{...imgWrapper}} ref="imgWrapper"> 
          <img className="tilter_image" src={img} alt=""/>
          <div className="tilter_deco tilter_deco_shine"><div ref="shine" style={shine}></div></div>
          <div ref="overlay" style={overlay} className="tilter_deco tilter_deco_overlay"></div>
          <figcaption ref="caption" style={caption} className="tilter_caption">
            <h3 className="tilter_title">Helen Portland</h3>
            <p className="tilter_description">Seattle</p>
          </figcaption>
          <svg ref="lines" style={lines} className="tilter_deco tilter_deco_lines" viewBox="0 0 300 415">
            <path d="M20.5,20.5h260v375h-260V20.5z" />
          </svg>
        </figure>
      </a>
    )
  }
}