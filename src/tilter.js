import React, {Component, PropTypes} from 'react'

import img from './assets/images/1.jpg'
import './assets/style/tilter.css'

export default class TilTer extends Component {

  state = {
    imgWrapper:{},
    lines:{},
    caption:{},
    shine:{},
    overlay:{}
  };

  static defaultProps = {
    movement:
    {
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
      overlay : {
        translation : {x: 10, y: -10, z: 0},
        rotation : {x: 0, y: 0, z: 2},
        reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
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
      shine : {
        translation : {x: 50, y: 50, z: 0},
        reverseAnimation : {
          duration : 1200,
          easing : 'easeOutElastic',
          elasticity: 600
        }
      }
    }
  }

  constructor(props){
    super(props)
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
    const {movement} = this.props;

    for (let key in movement){

      const t = movement[key].translation || {x:0,y:0,z:0}
      const r = movement[key].rotation || {x:0,y:0,z:0}

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
    this.setState({
      imgWrapper:{},
      lines:{},
      caption:{},
      shine:{},
      overlay:{}
    })
  }

  render(){
    const {imgWrapper, lines, caption, shine, overlay} = this.state;

    return(
      <a className="tilter" href="#" 
        ref={(dom)=>{this.root = dom}}
        onMouseMove={this.handleMove}
        onMouseLeave= {this.handleLeave}
      >
        <figure className="tilter_figure" style={{...imgWrapper}}> 
          <img className="tilter_image" src={img} alt=""/>
          <div className="tilter_deco tilter_deco_shine"><div style={shine}></div></div>
          <div style={overlay} className="tilter_deco tilter_deco_overlay"></div>
          <figcaption style={caption} className="tilter_caption">
            <h3 className="tilter_title">Helen Portland</h3>
            <p className="tilter_description">Seattle</p>
          </figcaption>
          <svg style={lines} className="tilter_deco tilter_deco_lines" viewBox="0 0 300 415">
            <path d="M20.5,20.5h260v375h-260V20.5z" />
          </svg>
        </figure>
      </a>
    )
  }
}