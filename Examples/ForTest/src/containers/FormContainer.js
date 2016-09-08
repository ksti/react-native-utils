/*
    表单容器：
    成员方法:
        1.getRefs 获得容器内组件的引用
        2.getValues 获取所支持的组件的内容值改变后的value
*/

import React,{Component} from 'react'
import {
    View,
} from 'react-native'

import serialize from '../common/serialize'

export default class FormContainer extends Form {

    constructor(props){
        super(props);
        this.formFields = {};
    }

    componentWillMount(){
        console.log('this.props.children:' + this.props.children);
    }

    /**
    * @private
    * @param {String} id
    * @param {String} name
    * @param {String} ref
    */
    _persistFieldRef = (id, name, value) => {
        this.formFields[id] = {name, value}
    }

    /**
    * @returns {Object}
    */
    getRefs = () => {
        let fieldsArray = []

        Object.keys(this.formFields).map((id, index) => {
            var tempRef = Object.assign({}, this.formFields[id])
            var _refs = this.refs
            // value 其实就是 ref 参数的名字
            tempRef.name = tempRef.value // 这里其实只用value
            tempRef.value = _refs[tempRef.value] // 这里获得对应的ref
            fieldsArray[index] = tempRef
        })

        return serialize(fieldsArray)
    }

    

    /**
    * @return [ReactComponent]
    */
    _createFormFieldsRef = (elements) => {

        return React.Children.map(elements, (element, fieldIndex) => {
            if (typeof element !== 'object') {
                return element
            }

            const fieldType = element.props.type
            const fieldName = element.props.name
            const isValidField = !!(fieldName)
            const fieldId = fieldName + element.key

            if (!isValidField) {
                return React.cloneElement(element, {
                  children: this._createFormFieldsRef(element.props.children)
                })
            }

            let props = {}

            if (!this.formFields[fieldId]) {
                this._persistFieldRef(
                  fieldId,
                  fieldName,
                  (element.ref || element.props.name) || fieldName
                )
            }

            props.ref = this.formFields[fieldId].value;

            return React.cloneElement(element, {
                ...props,
                children: this._createFormFieldsRef(element.props.children)
            })
        })
    }

    render(){
        return(
            <View {...this.props}>
                {this._createFormFields(this._createFormFieldsRef(this.props.children))}
            </View>
        );

    }
}
