import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { roundToTwoDecimalPlaces } from '../api/currencyHelpers';

class ListItem extends PureComponent {
  renderLeftContent = () => {
    let leftContent;

    switch (this.props.type) {
      case 'currencies':
        leftContent = this.props.data;
        break;
      case 'rates':
        leftContent = this.props.data.key;
        break;
      default:
        break;
    }
    return <Text>{leftContent}</Text>;
  };

  renderRightContent = () => {
    let rightContent;

    switch (this.props.type) {
      case 'currencies':
        rightContent = this.props.data.caption;
        break;
      case 'rates':
        rightContent = roundToTwoDecimalPlaces(this.props.data.rate);
        break;
      default:
        break;
    }
    return <Text>{rightContent}</Text>;
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.props.onPress(this.props.data)}
      >
        {this.renderLeftContent()}
        {this.renderRightContent()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 20
  }
});

ListItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export { ListItem };
