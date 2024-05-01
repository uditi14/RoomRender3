import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARPlane,
  ViroNode,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials
} from '@viro-community/react-viro';
// import {objects_3D} from './viroRes/resources';

const HelloWorldSceneAR = () => {
  ViroMaterials.createMaterials({
    rock:{
      lightingModel:"Lambert",
      diffuseTexture: require('../assets/RockingChair/wood.png'),
      //metalnessTexture:require('./assets/RockingChair/rocking-chair-011-col-metalness-4k.png'),
      //roughnessTexture:require('./assets/RockingChair/rocking-chair-011-col-specular-4k.png')
    }
  })
  const [rotation, setRotation] = useState([0,0,0])
  const [position, setPosition] = useState([0,0,-2])
  const [scale, setScale] = useState([1,1,1])

  //to move objects on drag
  const moveObject = (newPosition) => {
    //console.log(newPosition);
    setPosition(newPosition);
  }

  const rotateObject = (rotateState, rotateFactor, source) => {
    if(rotateState===3){
      let currentRotation = [rotation[0] - rotateFactor, rotation[1] - rotateFactor, rotation[2] - rotateFactor]
      setRotation(currentRotation)
    }
  }

  const scaleObject = (pinchState, scaleFactor, source) => {
    if(pinchState===3){
      let currentScale = scale[0]
      let newScale = currentScale * scaleFactor;
      let newScaleArray = [newScale,newScale,newScale]
      setScale(newScaleArray)
    }
  }

  // const onPinch = (scaleFactors, rotationFactor) => {
  //   const newScale = [myscale[0] * scaleFactors, myscale[1] * scaleFactors, myscale[2] * scaleFactors];
  //   setScale(newScale);
  // };
  return (
    <ViroARScene>
        <ViroNode position={[0,0,-1]}>
          <ViroAmbientLight color="#ffffff" intensity={200} />
          <Viro3DObject
            source={require('../assets/RockingChair/rock.obj')}
            resources={[
              require('../assets/RockingChair/rocking-chair-011.mtl'),
              require('../assets/RockingChair/rocking-chair-011-ao-metalness-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-ao-specular-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-col-metalness-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-col-specular-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-gloss-specular-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-height-metalness-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-height-specular-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-metalness-metalness-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-nrm-metalness-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-nrm-specular-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-rfl-specular-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-roughness-metalness-4k.png'),
              require('../assets/RockingChair/rocking-chair-011-specular-specular-4k.png')
            ]}
            scale={scale}
            position={position}
            rotation={rotation}
            materials={["rock"]}
            type="OBJ"
            onDrag={moveObject}
            //onRotate={rotateObject}
            //onPinch={scaleObject}
            dragType='FixedToWorld'
          />
        </ViroNode>
    </ViroARScene>
  );

};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
    />
  );
};
