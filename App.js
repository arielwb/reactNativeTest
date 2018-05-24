import React from 'react';
import { Animated, Text, View, Button, ActivityIndicator, ART, Easing } from 'react-native';
import { MapView, Marker } from 'expo';

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

class SadFaceAnimation extends React.Component {
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
            <AnimatedShape y={this.state.eyeAnim} d={sadFacePaths.rightEyebrow} fill='#000' />
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

const happyFacePaths = {
  leftEye: 'M 57.592 44.598 C 57.853 45.21 58.084 45.841 58.264 46.493 C 58.465 47.225 58.625 47.967 58.735 48.719 C 58.886 49.641 58.655 50.574 58.104 51.326 C 57.552 52.078 56.73 52.579 55.808 52.719 C 54.885 52.87 53.953 52.639 53.201 52.088 C 52.449 51.536 51.947 50.714 51.807 49.792 C 51.727 49.31 51.627 48.829 51.496 48.358 C 51.406 48.037 51.296 47.716 51.155 47.405 C 51.045 47.155 50.915 46.904 50.764 46.673 C 50.664 46.513 50.544 46.373 50.413 46.232 C 50.303 46.112 50.173 45.992 50.032 45.901 C 49.892 45.801 49.742 45.721 49.581 45.651 C 49.401 45.571 49.2 45.51 49 45.47 C 48.689 45.41 48.368 45.38 48.057 45.37 C 47.756 45.36 47.466 45.38 47.165 45.43 C 46.964 45.47 46.764 45.52 46.563 45.601 C 46.383 45.661 46.212 45.751 46.052 45.861 C 45.871 45.982 45.701 46.112 45.54 46.272 C 45.19 46.613 44.899 47.004 44.678 47.446 C 44.227 48.308 43.876 49.22 43.625 50.163 C 43.385 51.055 42.793 51.827 41.991 52.288 C 41.189 52.76 40.226 52.89 39.324 52.649 C 38.432 52.409 37.66 51.817 37.198 51.015 C 36.727 50.213 36.597 49.25 36.837 48.348 C 37.218 46.914 37.76 45.52 38.452 44.207 C 39.013 43.114 39.745 42.121 40.627 41.259 C 41.119 40.778 41.65 40.347 42.222 39.976 C 42.793 39.605 43.395 39.294 44.026 39.053 C 44.678 38.803 45.35 38.622 46.032 38.502 C 46.754 38.392 47.476 38.341 48.198 38.351 C 48.929 38.372 49.651 38.442 50.363 38.592 C 51.035 38.722 51.697 38.923 52.328 39.194 C 52.93 39.444 53.502 39.765 54.033 40.136 C 54.574 40.507 55.066 40.938 55.517 41.41 C 55.948 41.861 56.329 42.352 56.66 42.873 C 57.021 43.425 57.332 43.996 57.592 44.598 Z',
  mouth: 'M 85.115 72.492 C 85.576 71.69 86.338 71.088 87.231 70.837 C 88.133 70.597 89.086 70.707 89.898 71.168 C 90.71 71.629 91.302 72.392 91.552 73.284 C 91.803 74.176 91.683 75.139 91.231 75.951 C 89.848 78.387 88.153 80.643 86.178 82.639 C 84.143 84.744 81.867 86.599 79.4 88.193 C 76.903 89.808 74.226 91.121 71.409 92.074 C 68.591 93.046 65.644 93.557 62.666 93.578 C 59.748 93.557 56.84 93.066 54.073 92.124 C 51.306 91.191 48.669 89.928 46.202 88.354 C 43.776 86.82 41.52 85.015 39.484 82.98 C 37.529 81.054 35.825 78.889 34.421 76.522 C 33.94 75.72 33.809 74.768 34.03 73.865 C 34.261 72.963 34.842 72.191 35.644 71.71 C 36.436 71.238 37.399 71.098 38.301 71.329 C 39.204 71.559 39.976 72.131 40.447 72.933 C 41.55 74.788 42.893 76.492 44.428 77.996 C 46.102 79.681 47.967 81.165 49.972 82.428 C 51.957 83.701 54.093 84.724 56.329 85.476 C 58.364 86.168 60.51 86.539 62.666 86.559 C 64.872 86.539 67.047 86.158 69.133 85.436 C 71.409 84.664 73.575 83.611 75.58 82.298 C 77.615 80.994 79.49 79.46 81.165 77.726 C 82.709 76.161 84.032 74.407 85.115 72.492 Z',
  outerCircle: 'M 0 63 C -0.008 54.579 1.683 46.244 4.954 38.489 C 8.124 31.007 12.71 24.206 18.462 18.462 C 24.206 12.71 31.007 8.124 38.489 4.954 C 46.244 1.683 54.579 -0.008 63 0 C 71.421 -0.008 79.756 1.683 87.511 4.954 C 94.993 8.124 101.794 12.71 107.538 18.462 C 113.29 24.206 117.876 31.007 121.046 38.489 C 124.317 46.244 126.008 54.579 126 63 C 126.008 71.421 124.317 79.756 121.046 87.511 C 117.876 94.993 113.29 101.794 107.538 107.538 C 101.794 113.29 94.993 117.876 87.511 121.046 C 79.756 124.317 71.421 126.008 63 126 C 54.579 126.008 46.244 124.317 38.489 121.046 C 31.007 117.876 24.206 113.29 18.462 107.538 C 12.71 101.794 8.124 94.993 4.954 87.511 C 1.683 79.756 -0.008 71.421 0 63 Z',
  innerCircle: 'M 7.826 63 C 7.818 55.628 9.297 48.326 12.162 41.533 C 14.94 34.983 18.955 29.027 23.995 23.995 C 29.027 18.955 34.983 14.94 41.533 12.162 C 48.326 9.297 55.628 7.818 63 7.826 C 70.372 7.818 77.674 9.297 84.467 12.162 C 91.017 14.94 96.973 18.955 102.005 23.995 C 107.045 29.027 111.06 34.983 113.838 41.533 C 116.703 48.326 118.182 55.628 118.174 63 C 118.182 70.372 116.703 77.674 113.838 84.467 C 111.06 91.017 107.045 96.973 102.005 102.005 C 96.973 107.045 91.017 111.06 84.467 113.838 C 77.674 116.703 70.372 118.182 63 118.174 C 55.628 118.182 48.326 116.703 41.533 113.838 C 34.983 111.06 29.027 107.045 23.995 102.005 C 18.955 96.973 14.94 91.017 12.162 84.467 C 9.297 77.674 7.818 70.372 7.826 63 Z',
  rightEye: 'M 76.522 50.163 C 76.282 51.055 75.7 51.827 74.888 52.288 C 74.086 52.76 73.123 52.89 72.231 52.649 C 71.329 52.409 70.567 51.817 70.095 51.015 C 69.624 50.213 69.504 49.25 69.745 48.348 C 70.126 46.914 70.657 45.52 71.349 44.207 C 71.91 43.114 72.652 42.121 73.525 41.259 C 74.016 40.778 74.547 40.347 75.129 39.976 C 75.69 39.605 76.302 39.294 76.934 39.053 C 77.575 38.803 78.247 38.622 78.939 38.502 C 79.651 38.392 80.373 38.341 81.105 38.351 C 81.826 38.372 82.548 38.442 83.26 38.592 C 83.932 38.722 84.594 38.923 85.225 39.194 C 85.827 39.444 86.399 39.765 86.94 40.136 C 87.471 40.507 87.973 40.938 88.424 41.41 C 88.845 41.861 89.226 42.352 89.567 42.873 C 89.918 43.425 90.229 43.996 90.489 44.598 C 90.76 45.21 90.981 45.841 91.161 46.493 C 91.362 47.225 91.522 47.967 91.642 48.719 C 91.783 49.641 91.552 50.574 91.001 51.326 C 90.459 52.078 89.627 52.579 88.715 52.719 C 87.792 52.87 86.85 52.639 86.098 52.088 C 85.346 51.536 84.844 50.714 84.704 49.792 C 84.624 49.31 84.524 48.829 84.393 48.358 C 84.303 48.037 84.193 47.716 84.062 47.405 C 83.952 47.155 83.812 46.904 83.661 46.673 C 83.561 46.513 83.451 46.373 83.32 46.232 C 83.2 46.112 83.07 45.992 82.929 45.901 C 82.789 45.801 82.639 45.721 82.488 45.651 C 82.298 45.571 82.097 45.51 81.897 45.47 C 81.586 45.41 81.275 45.38 80.954 45.37 C 80.663 45.36 80.363 45.38 80.072 45.43 C 79.861 45.47 79.661 45.52 79.46 45.601 C 79.29 45.661 79.119 45.751 78.959 45.861 C 78.768 45.982 78.598 46.112 78.448 46.272 C 78.097 46.613 77.806 47.004 77.575 47.446 C 77.124 48.308 76.773 49.22 76.522 50.163 Z',
}

class HappyFaceAnimation extends React.Component {
  state = {
    happyFaceAnim: new Animated.Value(0)
  }

  runHappyFace() {


    Animated.loop(
      Animated.sequence([
        animatedTiming(this.state.happyFaceAnim, -8, animationSettings.duration),
        animatedTiming(this.state.happyFaceAnim, 8, animationSettings.duration),
        animatedTiming(this.state.happyFaceAnim, 0, animationSettings.duration),
        Animated.delay(300)
      ]),
      { iterations: 2 }
    ).start()
  }

  resetAnimation() {
    this.setState({
      happyFaceAnim: new Animated.Value(0)
    })
  }

  render() {

    return (
      <View>

        <View style={{ marginBottom: 20 }}>
          <Button title="run animation" onPress={this.runHappyFace.bind(this)} />
          <Button title="reset animation" onPress={this.resetAnimation.bind(this)} />
        </View>

        <ART.Surface width={126} height={126}>

          <ART.Shape d={happyFacePaths.outerCircle} fill='black' />
          <ART.Shape d={happyFacePaths.innerCircle} fill='white' />

          <AnimatedGroup y={this.state.happyFaceAnim} >
            <ART.Shape d={happyFacePaths.leftEye} fill='#000' />

            <ART.Shape d={happyFacePaths.rightEye} fill='#000' />

            <ART.Shape d={happyFacePaths.mouth} fill='#000' />
          </AnimatedGroup>

        </ART.Surface>

      </View>
    );
  }
}




export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, }}>
        <View style={{ height: '50%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <SadFaceAnimation />
          <HappyFaceAnimation />
        </View>
        <View style={{ height: '50%' }}>
          <MapView
            style={{ flex: 1 }}
            provider='google'
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <MapView.Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              title='test'
              description='test desc'
            />
          </MapView>
        </View>
      </View>
    )
  }
}
