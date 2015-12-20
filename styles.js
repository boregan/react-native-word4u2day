var {StyleSheet} = require('react-native');
var {MKColor} = require('react-native-material-kit');

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 25,
  },
  row: {
    flexDirection: 'row',
    fontStyle: 'italic',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
