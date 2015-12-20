var React = require('react-native');
var MK = require('react-native-material-kit');
var appStyles = require('./styles');
var DrawerLayout = require('react-native-drawer-layout');
var Image = require('react-native-image-progress');
var ProgressBar = require('react-native-progress/Bar');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ListView,
  Image,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  AppRegistry
} = React;

var {
  MKButton,
  MKColor,
  MKIconToggle,
  MKCardStyles
} = MK;

var styles = Object.assign(appStyles, StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  blockText: {
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: '#000000',
    height: 40,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
}));

var benactive = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch('http://manage.only5c.xyz/output.json')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          word4u: responseData,
        });
      })
      .done();
  },

  render: function() {

    if (!this.state.word4u) {
      return this.renderLoadingView();
    }

    return this.renderWord(this.state.word4u);
  },

  renderWord: function(word) {
    var navigationView = (
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        <Text>Hello there!</Text>
        <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
          <Text>Close drawer</Text>
        </TouchableHighlight>
      </View>
    );

    return (
      <DrawerLayout
        onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerWidth={250}
        ref={(drawer) => { return this.drawer = drawer  }}
        keyboardDismissMode="on-drag"
        renderNavigationView={() => navigationView}>
      <ScrollView
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
      <Image source={{ uri: 'http://source.unsplash.com/category/nature/1080x900' }} indicator={ProgressBar}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: windowSize.width,
              height: 2000,
            }}/>
        <View style={styles.container}>
          <View style={[MKCardStyles.card, {padding : 18, marginBottom: 10}]}>
            <Text>{word.date}</Text>
          </View>
            <View style={[MKCardStyles.card, {padding : 20}]}>
              <View style={styles.container}>
                <Text style={MKCardStyles.row}>{word.verse}</Text>
                <Text style={MKCardStyles.col}>{word.title}{'\n'}</Text>
                <Text style={MKCardStyles.content}>{word.content}</Text>
              </View>
            </View>
          </View>
    </ScrollView>
    </DrawerLayout>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={[styles.container, {shadowRadius: 10, shadowColor : 'red'}]}>
        <Text>
          Loading Word 4 U 2day...
        </Text>
      </View>
    );
  },

});

AppRegistry.registerComponent('benactive', () => benactive);
