const React = require('react-native');
const MK = require('react-native-material-kit');
const appStyles = require('./styles');
const DrawerLayout = require('react-native-drawer-layout');

const {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ListView,
  Image,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} = React;

const {
  MKButton,
  MKColor,
  MKIconToggle,
  MKCardStyles
} = MK;

const styles = Object.assign(appStyles, StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
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

var Cards = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['Read', 'Night Mode', 'Change Font', 'Settings', 'This', 'Is', 'A', 'Test']),
      word4u: null,
    };
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

    return (
        <DrawerLayoutAndroid
          renderNavigationView={() => navigationView }>
        </DrawerLayoutAndroid>
    );
  },

  renderWord: function(word) {

    var navigationView = (
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{uri: 'https://source.unsplash.com/category/nature/1600x900'}}
        />
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.listView}
      />
      </View>
    );

    return (
      <ScrollView
          renderNavigationView={() => navigationView }
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
        <View style={styles.container}>
          <View style={MKCardStyles.card}>
            <Text style={MKCardStyles.title}>{word.title}</Text>
            <View  // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
             style={{
               padding : 30,
             }}
             >
             <View style={styles.container}>
             <Text style={MKCardStyles.row}>{word.verse}</Text>
            <Text style={[MKCardStyles.content, {padding:5}]}>{word.content}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Word 4 U 2day...
        </Text>
      </View>
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri:'https://source.unsplash.com/category/nature/50x50' }} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

});

module.exports = Cards;
