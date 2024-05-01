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


interface HelloWorldSceneARProps {
    item: { ARobjSrc: any; material: string }; // Define the type of 'item' prop
  }

  const HelloWorldSceneAR: React.FC<HelloWorldSceneARProps> = ({ item }) => {
    // Create materials if needed
    console.log("Obj:", item.ARobjSrc)
    ViroMaterials.createMaterials({
      wood: {
        lightingModel: 'Lambert',
        diffuseTexture: require('../assets/RockingChair/wood.png'),
      },
      blue_cloth: {
        lightingModel: 'Lambert',
        diffuseTexture: require('../assets/Sofa/blue_cloth.JPG'),
      },
      brown_leather: {
        lightingModel:'Lambert',
        diffuseTexture: require('../assets/SofaChair/brown_leather.JPG'),
      },
      bed: {
        lightingModel:'Lambert',
        diffuseTexture: require('../assets/Bed/bed.JPG'),
      },
      white_laminate: {
        lightingModel: 'Lambert',
        diffuseTexture: require('../assets/Wardrobe/white_laminate.JPG'),
      }
    });
  
    // State hooks for rotation, position, scale
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [position, setPosition] = useState([0, 0, -2]);
    const [scale, setScale] = useState([1, 1, 1]);
  
    const rotateObject = (rotateState, rotateFactor, source) => {
      if(rotateState===3){
        let currentRotation = [rotation[0], rotation[1] - rotateFactor, rotation[2]]
        console.log("Rotation:",currentRotation)
        console.log("Scale after rotation: ", scale)
        setRotation(currentRotation)
      }
    }

    // Function to move object on drag
    const moveObject = (newPosition: number[]) => {
      const updatedPosition = [newPosition[0], newPosition[1], position[2]];
      setPosition(updatedPosition);
    };
  
    return (
      <ViroARScene>
        <ViroNode position={[0, 0, -1]}>
          <ViroAmbientLight color="#ffffff" intensity={200} />
          <Viro3DObject
            source={item.ARobjSrc}
            scale={scale}
            position={position}
            rotation={rotation}
            materials={[item.material]} // Use the defined material here
            type="OBJ"
            onDrag={moveObject}
            dragType="FixedToWorld"
            onRotate={rotateObject}
          />
        </ViroNode>
      </ViroARScene>
    );
  };


  type RootStackParamList = {
    ProductInfo: { item: Product };
  };

  interface Product {
    id: number;
    title: string;
    ARobjSrc : any;
    material : string;
    description: string;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    price: string;
    image: any;
    link: string;
  }

const ARSceneNavigator: React.FC<{
  route: { params: { item: Product } };
  navigation: { navigate: (screen: keyof RootStackParamList, params?: any) => void };
}
> = ({ route, navigation }) => {
  console.log("Route:", route.params.it)
  const item = route.params.it;
  console.log("Inside outer ar navigator:", item)
    return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <HelloWorldSceneAR item={item} />, // Pass 'item' prop to HelloWorldSceneAR
        }}
      />
    );
  };
  
  export default ARSceneNavigator;
