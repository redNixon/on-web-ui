// Copyright 2015, EMC, Inc.

'use strict';

import { EventEmitter } from 'events';

import React, { Component, PropTypes } from 'react';
import radium from 'radium';

import OperationsCenterGraph from './OperationsCenterGraph';

@radium
export default class OperationsCenter extends Component {

  static defaultProps = {
    css: {},
    params: null,
    style: {}
  };

  static contextTypes = {
    parentSplit: PropTypes.any
  };

  static childContextTypes = {
    networkTopology: PropTypes.any
  };

  getChildContext() {
    return {
      networkTopology: this
    };
  }

  state = {};

  css = {
    root: {
      position: 'relative',
      overflow: 'hidden',
      transition: 'width 1s'
    }
  };

  render() {
    let { props, state } = this;

    let parentSplitView = this.context.parentSplit,
        height = parentSplitView.height * parentSplitView.splitB,
        width = parentSplitView.width;

    let css = {
      root: [
        this.css.root,
        props.css.root,
        { width: width, height: height },
        this.props.style
      ]
    };

    let overlay = [];

    return (
      <div ref="root" style={css.root}>
        <OperationsCenterGraph ref="graph" width={width} height={height} />
      </div>
    );
  }

}