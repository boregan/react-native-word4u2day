/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var HTMLView = require('react-native-htmlview')
var DrawerLayout = require('react-native-drawer-layout');
var TouchableHighlight = require('react-native-material-button');
var Button = require('react-native-material-button');
var Cards = require('./cards');
var Icon = require('react-native-vector-icons/Entypo')

var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  Text,
  Navigator,
  ScrollView
} = React;

var Home = React.createClass({

  getInitialState() {
    return {};
  },

  render: function() {
  var navigationView = (
    <View style={[styles.container, {backgroundColor: '#000000'}]}>
    <TouchableHighlight onPress={() => {
       this.props.navigator.push({
         title: 'Home',
         component: Home,
       });
     }}>
      <Text style={styles.block}>Home</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => this.drawer.closeDrawer()}>
        <Text style={styles.block}>Close drawer</Text>
      </TouchableHighlight>
    </View>
  );

  return (
      <ScrollView style={styles.list}
                  contentContainerStyle={styles.container}>
      <View style={styles.container}>
      <Icon.Button name='book' backgroundColor='#ffffff'>
       <Text onPress={() => {
          this.props.navigator.push({
            title: 'Cards',
            component: Cards,
          });
        }}>Word4U2Day</Text>
      </Icon.Button>
      </View>
       </ScrollView>
  );
 },
});

var benactive = React.createClass({
  _renderScene: function (route, navigator) {
    switch (route.name) {
      case 'benactive':
        return <Home navigator={navigator}/>;
      default:
        return (
          <route.component/>
        );
      // default:
      //   return (
      //     <View style={{flex: 1}}>
      //       <ToolbarAndroid actions={[]}
      //         title='Cards'
      //         navIcon={require('image!ic_back')}
      //         onIconClicked={navigator.pop}
      //         style={styles.toolbar}
      //       />
      //       <route.component/>
      //     </View>
      //   );
    }
  },

  render: function () {
    return (
      <Navigator
        initialRoute={{name: 'benactive'}}
        renderScene={this._renderScene}
        />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000000'
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: 'white'
  },
  blockText: {
    marginBottom: 5,
  },
  welcome: {
    alignItems: 'center',
  },
  inputField: {
    backgroundColor: '#F2F2F2',
    height: 40,
  },
});

AppRegistry.registerComponent('benactive', () => benactive);
