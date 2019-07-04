//1.需要传入鼠标的位置信息 
// 获取中心点
// let objRect = e.currentTarget.getBoundingClientRect()
// let x = e.pageX - objRect.left;
// let y = e.pageY - objRect.top;
// 2.父元素需要实现relative定位，overflow：hidden

import React from 'react';

import './Ripple.less'

export default class Ripple extends React.Component{
    constructor(props){
        super(props);
        console.log('props',props);
        this.mounted = null;
        this.state = {
            isItemClickRipple: 0,
            animationInProgress: 1,
            rippleLeft: 0,
            rippleTop: 0,
        };

        this.onRippleClick = (e) => {
            console.log(e);
            //获取中心点
            let objRect = e.currentTarget.getBoundingClientRect()
            let x = e.pageX - objRect.left;
            let y = e.pageY - objRect.top;
            if(this.mounted)
                this.setState({
                    rippleLeft: x,
                    rippleTop: y,
                    isItemClickRipple: 1

                })
            setTimeout(() => {
                if(this.mounted)
                    this.setState({
                        isItemClickRipple: 0 
                    })
            },501)
        }
    }

    componentDidMount(){
        this.mounted = true
    }
    componentWillUnmount(){
        this.mounted = false;
    }
    
    render(){
        const { rippleTop, rippleLeft } = this.state;
        const { isItemClickRipple } = this.props;
        return(
            <div className='ripple_container' onClick={(e)=>this.onRippleClick(e)}>
                <span ref={(r)=>{this.spanBlock = r}} className={`ripple ${ this.state.isItemClickRipple ? 'ripple_animation':''}`} 
                    style={{'top':rippleTop,'left':rippleLeft}} />
            </div>
        )
    }
            
}