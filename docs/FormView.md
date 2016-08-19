
## 简介

- 组件FormView
	- 功能：FormView提供常用的表单组件

	- 使用参数说明：
    
    	- noSeparator 是否加分割线(默认有分割线) 示例：noSeparator={true} 或 noSeparator='true'
    
    	- separatorColor 分割线颜色 示例：separatorColor='red'
    
    	- separatorTop 分割线距离上个组件间隙 示例：separatorTop={40}
    
    	- separatorHeight 分割线高度 separatorHeight={40}

    	- type（必须） 表单类型，目前支持：'text'、'input'、'date'、'select'、'submit'、'custom'
    	
       		- text 左右文本样式
        	- input 输入框样式
        	- date 日期选择框样式
        	- select 选项框样式
        	- commit 提交按钮样式
        	- custom 自定义样式
    	- name（必须） => Your key to retrieve the value (required) 通过name获得组件的引用或监听的值
    	- leftText 左边文本内容
    	- redText 标红文字（标注提示用：例如'*'、'必填'）
    	- attributeStrs 自定义标注文本（可以自定义样式）
    	
    	```
          示例：attributeStrs={
                  <Text style={{color:'red'}}>
                      *
                  </Text>
              }
        ```
        - rightAttributeStrs （支持类型：'text'） 右边自定义文本，须嵌套在Text中
        
        ```
          示例：rightAttributeStrs = (
                  <Text >
                      <Text style={{color:'red'}}>
                          ****
                      </Text>
                      <Text style={{color:'green'}}>
                          ----
                      </Text>
                      <Text style={{color:'blue'}}>
                          ====
                      </Text>
                  </Text>
              )
        ```
    	- leftTextStyle 左边文本样式
    	- rightText（支持类型：'text'、'input'） 右边文本内容
    	- rightTextStyle 右边文本样式
    	- inputProps（支持类型：'input'） 输入框初始化属性设置
    	- inputStyle 输入框样式
    	- defaultInputVale  默认输入值
    	- onPressButton（支持类型：'date'、'select'） 按钮类型的触发事件
    	- buttonStyle（支持类型：'submit'） 提交按钮（背景）样式
    	- title（支持类型：'submit'）提交按钮上的文字
    	- titleStyle（支持类型：'submit'）提交按钮上文字的样式
    	- backgroundImage（支持类型：'submit'）提交按钮的背景图片
    	- formRefs（支持类型：'submit'）该参数是函数类型，用于获取包装在Form里的组件的引用，
        由于没有找到好的办法从子组件获取父组件的refs，所以需要传入该函数：formRefs={()=>this.refs.formContainer.getRefs()}，getRefs()是Form组件的成员方法，会获取到包装在其中的子组件的引用，需设置<Form ref='formContainer'>
        这样便可以通过this.refs.formContainer取到该Form容器。
    	- onSubmit（支持类型：'submit'）提交事件，接收一个参数values用于提交的内容（各个表单组件的输入值），
        通过values.name取得对应表单组件的inputValue，name是组件声明时的name属性值，作为唯一标识引用
        注意，只有在formRefs设置之后才会给onSubmit方法传递values，否则为空
        限制：values取的是this.state.inputValue，所以要使用values需各个表单组件里有state并且state里有inputValue
        
        >示例：
        
        ```
        <FormView
            type='custom'
            name="formViewCustom"
        >
            <自定义组件>
                <自定义组件 name='自定义组件名称'> // 自定义组件中如果有state.inputValue，则在提交时会自动添加到values中
                </自定义组件>
            </自定义组件>
        </FormView>
        ```

    	- 补充说明
        	- FormView支持flex布局，也可以固定宽度布局
        	- 固定宽度布局需左右都兼顾才能达到效果
            
            	例如：
            
	            ```
	            leftTextStyle={{width:85}}
	            inputStyle={{width:Dimensions.get("window").width-85-18}}
	            ```

	- 界面示例：
	
		```
		<ScrollContainer style={{flex:1,backgroundColor:'white'}}>
		    <Form ref='formContainer' style={{marginTop:10}}>
		        <FormView
		            type='text'
		            name="companyBelong"
		            leftText='公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司:'
		            leftTextStyle={{width:85}}
		            rightText={this.props.departmentName}
		            rightTextStyle={{width:Dimensions.get("window").width-85-18}}
		        />
		        <FormView
		            type='input'
		            name="meetName"
		            inputProps={{
		                text:"请输入会议名称",
		                multiline:false,
		                keyboardType:'default',
		                accessibilityLabel:"I am the accessibility label for text input",
		                autoCapitalize:"none"
		            }}
		            leftText='会&nbsp;议&nbsp;&nbsp;名&nbsp;称:'
		            redText='必填'
		            attributeStrs={
		                <Text style={{color:'red'}}>
		                    *
		                </Text>
		            }
		            leftTextStyle={{width:85}}
		            inputStyle={{width:Dimensions.get("window").width-85-18}}
		        />
		        <FormView
		            type='date'
		            name="searchEndTimeStr"
		            leftText='结&nbsp;束&nbsp;&nbsp;时&nbsp;间:'
		            leftTextStyle={{width:85}}
		            inputStyle={{width:Dimensions.get("window").width-85-18}}
		            defaultInputVale={strTimeEnd}
		            onPressButton={()=>this.dateComSelected('timeEnd')}
		        />
		        <FormView
		            type='select'
		            name="PCompanyName"
		            leftText='选&nbsp;择&nbsp;&nbsp;公&nbsp;司:'
		            leftTextStyle={{width:85}}
		            inputStyle={{width:Dimensions.get("window").width-85-18}}
		            defaultInputVale='选择公司'
		            onPressButton={()=>this.modalListShow('company')}
		            separatorColor='red'
		            separatorTop={40}
		        />
		        <FormView
		            type='submit'
		            name="formViewSubmit"
		            buttonStyle={{backgroundColor:'#ff5001', borderRadius: 5}}
		            title='测试提交'
		            titleStyle={{color:'white'}}
		            formRefs={()=>this.refs.formContainer.getRefs()}
		            onSubmit={this._onSubmit}
		        >
		        </FormView>
		    </Form>
		</ScrollContainer>
		```

-----------------------------------------------------------

- 
	- 自定义表单样式示例 // `默认会加分割线`

	```
	    <FormView
	        type='custom'
	        name="formViewCustom"
	    >
	        <View
	            style={{flex: 1, backgroundColor: 'green', flexDirection: 'column', alignItems: 'center', marginTop: 4}}
	        >
	            <Text name='testCustomText' style={{textAlign:'center'}}>
	                Custom
	                {'\n'}
	                {'\n'}
	                {'\n'}
	                {'\n'}
	                Custom
	            </Text>
	        </View>
	    </FormView>
	```
	
-----------------------------------------------------------

