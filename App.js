import React from 'react';
import { Animated, Text, View, Button, ActivityIndicator, ART, Easing } from 'react-native';

const AnimatedShape = Animated.createAnimatedComponent(ART.Shape)
const AnimatedGroup = Animated.createAnimatedComponent(ART.Group)

const animatedTiming = (prop, to, duration) => {
  return Animated.timing(
    prop,
    {
      toValue: to,
      duration: duration,
    }
  )
}

class SvgTest extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    eyeAnim: new Animated.Value(15),
    mouthAnim: new Animated.Value(0)
  }

  runSadFace() {
    Animated.sequence([

      // turn left
      animatedTiming(this.state.fadeAnim, -animationSettings.headTurn, animationSettings.duration),

      // turn right and lift eyebrow
      Animated.parallel([
        animatedTiming(this.state.fadeAnim, animationSettings.headTurn, animationSettings.duration),
        animatedTiming(this.state.eyeAnim, -animationSettings.eyePosition, animationSettings.duration),
      ]),

      // back to center
      animatedTiming(this.state.fadeAnim, 0, animationSettings.duration),

      //mouth up and down
      animatedTiming(this.state.mouthAnim, 5, animationSettings.duration),
      animatedTiming(this.state.mouthAnim, 0, animationSettings.duration),

      //pause
      Animated.delay(200),

      //lift eyebrow
      animatedTiming(this.state.eyeAnim, 7, animationSettings.duration),
      animatedTiming(this.state.eyeAnim, -animationSettings.eyePosition, animationSettings.duration),

      // turn left and mouth down
      Animated.parallel([
        animatedTiming(this.state.fadeAnim, -animationSettings.headTurn, animationSettings.duration),
        animatedTiming(this.state.mouthAnim, -5, animationSettings.duration),
      ]),

      // turn right and mouth center
      Animated.parallel([
        animatedTiming(this.state.fadeAnim, animationSettings.headTurn, animationSettings.duration),
        animatedTiming(this.state.mouthAnim, 0, animationSettings.duration),
      ]),

      // back to center
      animatedTiming(this.state.fadeAnim, 0, animationSettings.duration),

    ]).start(); // start the sequence group

  }

  resetAnimation() {
    this.setState({
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
      eyeAnim: new Animated.Value(15),
      mouthAnim: new Animated.Value(0)
    })
  }

  render() {

    return (
      <View>

        <View style={{ marginBottom: 20 }}>
          <Button title="run animation" onPress={this.runSadFace.bind(this)} />
          <Button title="reset animation" onPress={this.resetAnimation.bind(this)} />
        </View>

        <ART.Surface width={161} height={161}>

          <ART.Shape d={sadFacePaths.outerCircle} fill='#000' />
          <ART.Shape d={sadFacePaths.innerCircle} fill='white' />

          <AnimatedGroup x={this.state.fadeAnim} >
            <ART.Shape d={sadFacePaths.leftEye} fill='#000' />
            <ART.Shape d={sadFacePaths.leftEyebrow} fill='#000' />
            <ART.Shape d={sadFacePaths.rightEye} fill='#000' />
            <AnimatedShape y={this.state.eyeAnim} d={sadFacePaths.rightEyebrow} fill='#000'/>
            <AnimatedShape y={this.state.mouthAnim} d={sadFacePaths.mouth} fill='#000' />
          </AnimatedGroup>

        </ART.Surface>

      </View>
    );
  }
}

const animationSettings = {
  duration: 300,
  headTurn: 9,
  eyePosition: 2

}

const sadFacePaths = {
  outerCircle: 'M 0 80.5 C -0.01 69.74 2.15 59.09 6.33 49.18 C 10.38 39.62 16.24 30.93 23.59 23.59 C 30.93 16.24 39.62 10.38 49.18 6.33 C 59.09 2.15 69.74 -0.01 80.5 0 C 91.26 -0.01 101.91 2.15 111.82 6.33 C 121.38 10.38 130.07 16.24 137.41 23.59 C 144.76 30.93 150.62 39.62 154.67 49.18 C 158.85 59.09 161.01 69.74 161 80.5 C 161.01 91.26 158.85 101.91 154.67 111.82 C 150.62 121.38 144.76 130.07 137.41 137.41 C 130.07 144.76 121.38 150.62 111.82 154.67 C 101.91 158.85 91.26 161.01 80.5 161 C 69.74 161.01 59.09 158.85 49.18 154.67 C 39.62 150.62 30.93 144.76 23.59 137.41 C 16.24 130.07 10.38 121.38 6.33 111.82 C 2.15 101.91 -0.01 91.26 0 80.5 Z',
  innerCircle: 'M 10 80.5 C 9.99 71.08 11.88 61.75 15.54 53.07 C 19.09 44.7 24.22 37.09 30.66 30.66 C 37.09 24.22 44.7 19.09 53.07 15.54 C 61.75 11.88 71.08 9.99 80.5 10 C 89.92 9.99 99.25 11.88 107.93 15.54 C 116.3 19.09 123.91 24.22 130.34 30.66 C 136.78 37.09 141.91 44.7 145.46 53.07 C 149.12 61.75 151.01 71.08 151 80.5 C 151.01 89.92 149.12 99.25 145.46 107.93 C 141.91 116.3 136.78 123.91 130.34 130.34 C 123.91 136.78 116.3 141.91 107.93 145.46 C 99.25 149.12 89.92 151.01 80.5 151 C 71.08 151.01 61.75 149.12 53.07 145.46 C 44.7 141.91 37.09 136.78 30.66 130.34 C 24.22 123.91 19.09 116.3 15.54 107.93 C 11.88 99.25 9.99 89.92 10 80.5 Z',
  leftEye: 'M 55 62 C 55 58.137 58.137 55 62 55 C 65.863 55 69 58.137 69 62 C 69 65.863 65.863 69 62 69 C 58.137 69 55 65.863 55 62 Z ',
  rightEye: 'M 94 62 C 94 58.137 97.137 55 101 55 C 104.863 55 108 58.137 108 62 C 108 65.863 104.863 69 101 69 C 97.137 69 94 65.863 94 62 Z ',
  leftEyebrow: 'M 59.68 44.41 C 60.6 43.88 61.69 43.74 62.72 44.01 C 63.74 44.28 64.62 44.95 65.15 45.87 C 65.68 46.79 65.83 47.88 65.55 48.91 C 65.28 49.93 64.61 50.81 63.69 51.34 L 50.63 58.9 C 49.71 59.43 48.62 59.58 47.59 59.3 C 46.57 59.03 45.69 58.36 45.16 57.44 C 44.63 56.52 44.49 55.43 44.76 54.41 C 45.03 53.38 45.7 52.51 46.62 51.98 L 59.68 44.41 Z ',
  rightEyebrow: 'M 92.58 31.89 L 108.3 33.07 C 109.36 33.15 110.34 33.65 111.03 34.46 C 111.72 35.26 112.07 36.31 111.99 37.36 C 111.91 38.42 111.41 39.4 110.61 40.1 C 109.8 40.79 108.76 41.13 107.7 41.05 L 91.98 39.86 C 90.92 39.78 89.94 39.29 89.25 38.48 C 88.56 37.68 88.21 36.63 88.29 35.57 C 88.37 34.52 88.87 33.53 89.67 32.84 C 90.48 32.15 91.53 31.81 92.58 31.89 Z',
  mouth: 'M 55.32 115.58 C 54.85 116.53 54.01 117.25 53 117.58 C 52 117.92 50.9 117.83 49.95 117.36 C 49 116.88 48.28 116.05 47.95 115.04 C 47.62 114.03 47.7 112.93 48.18 111.99 C 49.05 110.25 50.03 108.57 51.1 106.95 C 52.08 105.48 53.16 104.07 54.32 102.74 C 55.41 101.51 56.58 100.35 57.82 99.27 C 59.02 98.23 60.29 97.27 61.62 96.41 C 62.95 95.55 64.34 94.78 65.78 94.12 C 67.25 93.44 68.77 92.86 70.32 92.39 C 71.97 91.88 73.66 91.49 75.36 91.22 C 77.22 90.92 79.1 90.73 80.98 90.66 C 82.8 90.59 84.63 90.65 86.45 90.82 C 88.16 90.98 89.84 91.26 91.5 91.67 C 93.1 92.05 94.66 92.55 96.18 93.17 C 97.7 93.78 99.17 94.49 100.58 95.31 C 102.03 96.16 103.41 97.1 104.73 98.14 C 106.12 99.25 107.44 100.44 108.67 101.72 C 110.03 103.14 111.3 104.64 112.47 106.22 C 113.78 108.01 114.99 109.87 116.1 111.8 C 116.62 112.72 116.76 113.81 116.48 114.83 C 116.21 115.86 115.53 116.73 114.61 117.26 C 113.69 117.78 112.6 117.92 111.58 117.64 C 110.55 117.37 109.68 116.69 109.15 115.77 C 108.2 114.11 107.16 112.51 106.02 110.97 C 105.07 109.67 104.03 108.44 102.91 107.28 C 101.92 106.25 100.87 105.29 99.76 104.41 C 98.74 103.61 97.67 102.88 96.56 102.23 C 95.48 101.6 94.36 101.05 93.2 100.59 C 92.03 100.12 90.84 99.74 89.62 99.44 C 88.33 99.13 87.02 98.91 85.7 98.78 C 84.23 98.64 82.75 98.6 81.27 98.66 C 79.72 98.71 78.17 98.87 76.64 99.11 C 75.29 99.33 73.96 99.64 72.65 100.04 C 71.45 100.41 70.27 100.85 69.13 101.38 C 68.04 101.89 66.98 102.47 65.97 103.12 C 64.95 103.78 63.98 104.51 63.06 105.31 C 62.09 106.15 61.18 107.06 60.33 108.02 C 59.4 109.08 58.55 110.2 57.77 111.37 C 56.87 112.73 56.05 114.13 55.32 115.58 Z'


}


export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center', position: 'relative' }}>
        <SvgTest />
      </View>
    )
  }
}
