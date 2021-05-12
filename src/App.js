import React, { Component } from 'react';
import Particles from "react-tsparticles";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';



const particlesOptions={
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 100,
      enable: true,
      opacity: 0.5,
      width: .5,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 1.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value:100,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
}

const initialState = {
    input: '',
    imageurl: '',
    box:{},
    route: 'signin',
    isSignedin: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined

    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return{
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});

  }

  OnButtonSubmit = () => {
    this.setState({imageurl: this.state.input});
      fetch('https://mysterious-scrubland-92986.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'content-Type' : 'application/json'},
        body:JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('https://mysterious-scrubland-92986.herokuapp.com/image', {
            method: 'put',
            headers: {'content-Type' : 'application/json'},
            body:JSON.parse(JSON.stringify({
                id: this.state.user.id
            }))
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries: count}) )
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedin: true})
    }
    this.setState({route: route})
  }
  
  render(){
    const {isSignedin, imageurl, route, box, } = this.state;
    return (
      <div className="App">
        <Particles
            className='particles'
            options={particlesOptions}
        />
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange}/>
        { route === 'home' ? 
          <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} OnButtonSubmit={this.OnButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageurl={imageurl}/>
          </div>
          : (
            route === 'signin' ?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
          }
        </div>
    );
   }
}
 
export default App;
