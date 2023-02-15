// local imports 
import { useGratulateOne, useSwipeInFromBottom } from "../../../hooks/animations/animations"

// package imports
import { useCallback } from "react"
import { createPortal } from "react-dom";
import Particles from 'react-particles'
import { loadFull } from "tsparticles";


const GratulationComoponent = ({ nightOut, userData }) => {

    // animation
    useGratulateOne(GratulationComoponent, '#wellDone')

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div
            className="container is-justify-content-center mb-1 has-text-centered px-2"
            id="wellDone"
            style={{ marginTop: '20vh' }}
        >
            <p className="is-size-2 is-size-3-touch">🎉</p>
            <p className="dancing-script-header is-size-2 is-size-4-touch">Hey {userData.username}, here is your final Nightout for:</p>
            <p className="dancing-script-header" style={{fontSize: '50px'}}>{nightOut.title}</p>
            
            {createPortal(<Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{"fullScreen": {
                "zIndex": 1
              },
              "emitters": {
                "position": {
                  "x": 50,
                  "y": 100
                },
                "rate": {
                  "quantity": 5,
                  "delay": 0.15
                }
              },
              "particles": {
                "color": {
                  "value": [
                    "#1E00FF",
                    "#FF0061",
                    "#E1FF00",
                    "#00FF9E"
                  ]
                },
                "move": {
                  "decay": 0.05,
                  "direction": "top",
                  "enable": true,
                  "gravity": {
                    "enable": true
                  },
                  "outModes": {
                    "top": "none",
                    "default": "destroy"
                  },
                  "speed": {
                    "min": 50,
                    "max": 100
                  }
                },
                "number": {
                  "value": 0
                },
                "opacity": {
                  "value": 1
                },
                "rotate": {
                  "value": {
                    "min": 0,
                    "max": 360
                  },
                  "direction": "random",
                  "animation": {
                    "enable": true,
                    "speed": 30
                  }
                },
                "tilt": {
                  "direction": "random",
                  "enable": true,
                  "value": {
                    "min": 0,
                    "max": 360
                  },
                  "animation": {
                    "enable": true,
                    "speed": 30
                  }
                },
                "size": {
                  "value": 3,
                  "animation": {
                    "enable": true,
                    "startValue": "min",
                    "count": 1,
                    "speed": 16,
                    "sync": true
                  }
                },
                "roll": {
                  "darken": {
                    "enable": true,
                    "value": 25
                  },
                  "enlighten": {
                    "enable": true,
                    "value": 25
                  },
                  "enable": true,
                  "speed": {
                    "min": 5,
                    "max": 15
                  }
                },
                "wobble": {
                  "distance": 30,
                  "enable": true,
                  "speed": {
                    "min": -7,
                    "max": 7
                  }
                },
                "shape": {
                  "type": [
                    "circle",
                    "square"
                  ],
                  "options": {}
                }
              },
              "responsive": [
                {
                  "maxWidth": 1024,
                  "options": {
                    "particles": {
                      "move": {
                        "speed": {
                          "min": 33,
                          "max": 66
                        }
                      }
                    }
                  }
                }
              ]
            }
            }
        />, document.body)}
        </div>
    )
}

export default GratulationComoponent
