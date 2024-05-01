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
    });
  
    // State hooks for rotation, position, scale
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [position, setPosition] = useState([0, 0, -2]);
    const [scale, setScale] = useState([1, 1, 1]);
  
    // Function to move object on drag
    const moveObject = (newPosition: number[]) => {
      setPosition(newPosition);
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
