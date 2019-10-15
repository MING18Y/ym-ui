/* eslint-disable require-jsdoc */
import React from 'react';

import './DraggableButton.less';

export default class DraggableButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolderText: '请按住滑块，拖动到最右边',
    };

    /**
     * 获取触摸点：e.touches[0]。
     * clientX：触摸目标在视口中的x坐标。
     * clientY：触摸目标在视口中的y坐标。
     * identifier：标识触摸的唯一ID。
     * pageX：触摸目标在页面中的x坐标。
     * pageY：触摸目标在页面中的y坐标。
     * screenX：触摸目标在屏幕中的x坐标。
     * screenY：触摸目标在屏幕中的y坐标。
     * target：触目的DOM节点目标。
    */

    this.isFrozenBlock = false;

    this.handleTouchStart = (e) => {
      const element = e.target;
      const targetBoundingClientRect = element.getBoundingClientRect();
      const guideBoundingClientRect =
        document
            .getElementsByClassName('draggable_button_guide')[0]
            .getBoundingClientRect();

      this.buttonInitX = targetBoundingClientRect.x; // 滑块的初始位置,水平
      this.buttonInitY = targetBoundingClientRect.y;

      this.fingerInitX = e.touches[0].clientX; // 触摸点的初始位置,水平
      this.fingerInitY = e.touches[0].clientY;

      this.guideElementInitLeft = guideBoundingClientRect.left; // 滑轨的的初始位置
      this.guideElementInitRight = guideBoundingClientRect.right;

      this.lastTouchClientX = e.touches[0].clientX; // 初始化最后一次位置信息
    };

    this.handleTouchMove = (e) => {
      if (this.isFrozenBlock) {
        return;
      }
      const element = e.target;
      const buttonBlockBoundingClientRect = element.getBoundingClientRect();

      this.handleButtonBlockMove(e, element, buttonBlockBoundingClientRect);
      this.handleTailIncrease(e, element, buttonBlockBoundingClientRect);
    };

    this.handleButtonBlockPosition = (e, element) => {
      element.style.left = this.buttonInitX +
                            (e.touches[0].clientX - this.fingerInitX) -
                            (this.fingerInitX - this.buttonInitX) +
                            'px';
    };

    this.handleTouchEnd = (e) => {
      const element = e.target;
      const targetBoundingClientRect = element.getBoundingClientRect();
      const guideBoundingClientRect =
          document
              .getElementsByClassName('draggable_button_guide')[0]
              .getBoundingClientRect();

      // const elementLeft = targetBoundingClientRect.left;
      const elementRight = targetBoundingClientRect.right;

      // 重置滑块位置
      if (elementRight !== guideBoundingClientRect.right) {
        this.resetBlockPostion(element);
        this.resetTailWidth();
      }

      if (elementRight === guideBoundingClientRect.right) {
        this.handleRightSideReached();
      }
    };

    // 移动滑块
    this.handleButtonBlockMove = (
        e,
        element,
        buttonBlockBoundingClientRect
    ) => {
      // let element = e.target
      // let buttonBlockBoundingClientRect = element.getBoundingClientRect()
      const elementLeft = buttonBlockBoundingClientRect.left;
      const elementRight = buttonBlockBoundingClientRect.right;

      if (
        elementLeft > this.guideElementInitLeft &&
        elementRight < this.guideElementInitRight
      ) {
        this.handleButtonBlockPosition(e, element);
      } else if (elementLeft === this.guideElementInitLeft) {
        if (e.touches[0].clientX < this.lastTouchClientX) {
          return;
        } else {
          this.handleButtonBlockPosition(e, element);
        }
      } else if (elementRight === this.guideElementInitRight) {
        if (e.touches[0].clientX > this.lastTouchClientX) {
          return;
        } else {
          this.handleButtonBlockPosition(e, element);
        }
      } else {
        this.avoidOutBouding(element);
      }

      this.lastTouchClientX = e.touches[0].clientX;
    };

    // 滑块复位
    this.resetBlockPostion = (element) => {
      element.classList.add('draggable_button_transiton');
      element.style.left = 0 + 'px';

      setTimeout(()=>{
        element.classList.remove('draggable_button_transiton');
      }, 100);
    };

    // 防止出轨
    this.avoidOutBouding = (element) => {
      const targetBoundingClientRect = element.getBoundingClientRect();

      const elementLeft = targetBoundingClientRect.left;
      const elementRight = targetBoundingClientRect.right;

      if (elementLeft < this.guideElementInitLeft) {
        element.style.left = 0 + 'px';
        element.style.right = 'auto';
        return;
      }

      if (elementRight > this.guideElementInitRight) {
        element.style.left = 'auto';
        element.style.right = 0 + 'px';
        return;
      }
    };

    // 滑块尾迹跟随滑块增长
    this.handleTailIncrease = (e, element, buttonBlockBoundingClientRect) => {
      this.draggableButtonTail.style.width = buttonBlockBoundingClientRect.x -
                                              this.buttonInitX + 5 + 'px';
    };

    // 滑块尾迹复位
    this.resetTailWidth = () => {
      this.draggableButtonTail.classList.add('draggable_button_tail_transiton');
      this.draggableButtonTail.style.width = 5 + 'px';

      setTimeout(()=>{
        this
            .draggableButtonTail
            .classList
            .remove('draggable_button_tail_transiton');
      }, 100);
    };

    // 滑块触底
    this.handleRightSideReached = () => {
      this.isFrozenBlock = true;
      this.setState({
        placeHolderText: '成功',
      });

      this.props.onRightSideReached();
    };

    // 处理自定义样式
    this.handleCustomizeButtonStyle = () => {
      if (typeof this.props.buttonStyle === 'undefined') {
        return {};
      }

      if (typeof this.props.buttonStyle !== 'Object') {
        console.error('按钮自定义样式需是对象。');
        return {};
      }

      return this.props.buttonStyle;
    };

    // 处理自定义样式
    this.handleCustomizeGuideStyle = () => {
      if (typeof this.props.guideStyle === 'undefined') {
        return {};
      }

      if (typeof this.props.guideStyle !== 'Object') {
        console.error('导轨自定义样式需是对象。');
        return {};
      }

      return this.props.guideStyle;
    };
  }

  render() {
    return (
      <div className='draggable_button_container'>
        <div
          className='draggable_button_guide'
          style={this.handleCustomizeGuideStyle()}>
          <div
            className='draggable_button_tail'
            ref={(r) => this.draggableButtonTail = r} />
          <div
            className='draggable_button'
            style={this.handleCustomizeButtonStyle()}
            onTouchStart={(e) => {
              this.handleTouchStart(e);
            }}
            onTouchMove={(e) => {
              this.handleTouchMove(e);
            }}
            onTouchEnd={(e) => {
              this.handleTouchEnd(e);
            }}
          />
          <div className='draggable_button_place_holder' >
            {
              this.props.draggableButtonPlaceHolder ?
              this.props.draggableButtonPlaceHolder :
              this.state.placeHolderText
            }
          </div>
        </div>
      </div>
    );
  }
}
