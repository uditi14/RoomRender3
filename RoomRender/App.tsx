// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroARPlane,
  ViroNode,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
} from '@viro-community/react-viro';
// import {objects_3D} from './viroRes/resources';

const HelloWorldSceneAR = () => {
  const [rotation, setRotation] = useState([0,0,0])
  const [position, setPosition] = useState([0,0,-2])
  const [scale, setScale] = useState([.5,.5,.5])

  //to move objects on drag
  const moveObject = (newPosition) => {
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
            source={require('./assets/coffee_table/CoffeeO.obj')}
            resources={[
              require('./assets/coffee_table/coffee-table-037.mtl'),
              require('./assets/coffee_table/textures/coffee-table-037-ao-metalness-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-ao-specular-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-col-metalness-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-col-specular-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-gloss-specular-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-height-metalness-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-height-specular-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-metalness-metalness-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-nrm-metalness-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-nrm-specular-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-rfl-specular-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-roughness-metalness-4k.png'),
              require('./assets/coffee_table/textures/coffee-table-037-specular-specular-4k.png'),
            ]}
            scale={scale}
            position={position}
            rotation={rotation}
            type="OBJ"
            onDrag={moveObject}
            onRotate={rotateObject}
            onPinch={scaleObject}
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
