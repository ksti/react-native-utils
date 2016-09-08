/**
 * Created by Administrator on 2016-08-17.
 */
'use strict';

import React, {PropTypes, Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    PixelRatio,
    Platform
} from "react-native";
/**用法：
      来源：    https://github.com/beefe/react-native-popup

      <MyDialog  isOverlayClickClose={true} ref={(MyDialog) => { this.MyDialog = MyDialog } }/>
      //isOverlayClickClose是点击弹出框意外的区域是否消失  默认是true
     //属性
     { title: string,
     content: string|number|array<string|number> ,
      ok: {title: string default 'OK', callback: function},
     cancel: {title: string default 'Cancel', callback: function}, }



     //1  提示作用  点击后没有操作
     this.MyDialog.confirm({
             content: 'Are you ready?',
         });

        this.MyDialog.alert(1);
       this.MyDialog.alert(1, 'two', '10 messages at most');//显示三行数据


     //2   一个按钮的用法
      this.MyDialog.confirm({
             content: 'Are you ready?',
            ok: {
                callback: () => {
                     this.MyDialog.alert('Very good!');
                },
              },
        });

    //3    两个按钮的用法
      this.MyDialog.confirm({
           title: 'title',
             content: ['come on!', 'go!'],
            ok: {
                text: 'Y',
                 callback: () => {
                     this.MyDialog.alert('Good!');
                 },
            },
             cancel: {
                 text: 'N',
                callback: () => {
                    this.MyDialog.alert('Hurry up！');
               },
           },
       });

 
 */
class PopContent extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array,]),
        btns: PropTypes.array,
    };

    render() {
        let {title, content, btns} = this.props;
        let btnNumber = btns.length;
        return (
            <View style={styles.tipBox}>
                { title && <View style={styles.tipTitleBox}><Text style={styles.tipTitle}>{title}</Text></View>}
                <View style={styles.tipContentBox}>
                    {(() => {
                        let tipContent = [];
                        if (content instanceof Array) {
                            content.forEach((item, index, arr) => {
                                if (index > 9) {
                                    return;
                                }
                                item && ( tipContent[index] = (
                                    <Text style={styles.tipContent} key={'tipContent' + index}>{item}</Text>) );
                            });
                        } else {
                            content && ( tipContent[0] = (
                                <Text style={styles.tipContent} key={'tipContent'}>{content}</Text>) );
                        }
                        return tipContent;
                    })()}
                </View>
                <View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
                    {(() => {
                        let btnContent = [];
                        btns.forEach((btn, index,) => {
                            btnContent.push(
                                <TouchableOpacity style={styles.btnTextBox} onPress={btn.callback}
                                                  key={'btnTextBox' + index}>
                                    <Text style={styles.btnText}>{btn.text}</Text>
                                </TouchableOpacity>
                            );

                        });
                        return btnContent;
                    })()}
                </View>
            </View>
        );
    }

}
;

class DisplayPopup extends Component {

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
        btns: [{
            text: 'ok',
            callback: () => {
            },
        }],
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            isVisible: true,
        };

    }

    close() {
        this.setState({
            isVisible: false,
        });
    }

    _renderOverlay() {
        if (this.props.isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={() => {
					if(this.props.isOverlayClickClose) {
						this.close();
					}
				}}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            );
        }
    }

    render() {
        let {isVisible, isOverlay,} = this.state;
        let {title, content, btns,} = this.props;
        btns = btns.map((item) => {
            return {
                text: item.text,
                callback: () => {
                    typeof item.callback === 'function' && item.callback();
                    this.close();
                },
            };
        });
        if (isVisible) {
            return (
                <View style={styles.popupContainer}>
                    {this._renderOverlay()}
                    <View style={styles.tipBoxView}>
                        <PopContent title={title} content={content} btns={btns}/>
                    </View>
                </View>
            );
        }
        return <View style={styles.hidden}/>;
    }

}
;

export default class Popup extends Component {

    static DisplayPopup = DisplayPopup;

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            isVisible: false,
            isOverlay: this.props.isOverlay,
            isOverlayClickClose: this.props.isOverlayClickClose,
            content: null,
        };

    }

    _pop(args) {
        this.setState({
            content: ( <PopContent {...args}/> ),
            isVisible: true,
        });
    }

    alert(...text) {
        text = text.map((text) => text);
        this._pop({
            content: text || '',
            btns: [{
                text: 'OK',
                callback: () => {
                    this.close();
                },
            }],
        });
    }

    tip(args) {
        let {title, content, btn,} = args;
        this._pop({
            title: title || 'Tip',
            content: content,
            btns: [{
                text: btn && btn.text || 'OK',
                callback: () => {
                    this.close();
                    btn && typeof btn.callback === 'function' && btn.callback();
                },
            }],
        });
    }

    confirm(args) {
        let {title, content, ok, cancel,} = args;
        this._pop({
            title: args.title,
            content: args.content,
            btns: [
                {
                    text: cancel && cancel.text || 'Cancel',
                    callback: () => {
                        this.close();
                        cancel && typeof cancel.callback === 'function' && cancel.callback();
                    },
                },
                {
                    text: ok && ok.text || 'OK',
                    callback: () => {
                        this.close();
                        ok && typeof ok.callback === 'function' && ok.callback();
                    },
                },
            ],
        });
    }

    pop(args) {
        this._pop(args);
    }

    close() {
        this.setState({
            isVisible: false,
        });
    }

    _renderOverlay() {
        if (this.state.isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={() => {
					if(this.state.isOverlayClickClose) {
						this.close();
					}
				}}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            );
        }
    }

    _renderContent() {
        return (
            <View style={styles.tipBoxView}>
                {this.state.content}
            </View>
        );
    }

    render() {
        let {isVisible, isOverlay,} = this.state;
        if (isVisible) {
            return (
                <View style={styles.popupContainer}>
                    {this._renderOverlay()}
                    {this._renderContent()}
                </View>
            );
        }
        return <View style={styles.hidden}/>;
    }

};

let styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        position: 'absolute',
        top: 0-150,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+150,
        overflow: 'hidden',
        backgroundColor: 'rgba(00, 00, 00, 0)',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+150,
        backgroundColor: '#000',
        opacity: .5,
    },
    tipBoxView: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 100,
        borderRadius: 5,
        overflow: 'hidden',
    },
    tipBox: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipTitleBox: {
        height: 30,
        width: Dimensions.get('window').width - 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipTitle: {
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center',
    },
    tipContentBox: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipContent: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    line: {
        height: 1 / PixelRatio.get(),
        width: Dimensions.get('window').width - 100,
        backgroundColor: '#ddd',
    },
    btnBox: {
        width: Dimensions.get('window').width - 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    btnTextBox: {
        height: Dimensions.get('window').width/9,
        width:Dimensions.get('window').width/4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ff5001',
        marginLeft:Dimensions.get('window').width/20,
        marginRight:Dimensions.get('window').width/20,
        marginBottom:5,
        marginTop:5,
        borderRadius: 5,

    },
    btnLine: {
        height: 50,
        width: 1 / PixelRatio.get(),
        backgroundColor: '#ddd',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
    },
    hidden: {
        position: 'absolute',
        height: 0,
        width: 0,
        top: 0,
        left: 0,
    },
});

if (Platform.OS === 'ios') {
    styles = {
        ...styles,
        tipTitle: {
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'center',
        },
        tipContent: {
            fontSize: 16,
            marginTop: 3,
            marginBottom: 7,
            textAlign: 'center',
        },
    }
}