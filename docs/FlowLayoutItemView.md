
## 简介

- FlowLayoutItemView
	- 功能：FlowLayoutItemView 封装的模块视图，用于展示模块，附带角标

	- 使用参数说明：
    
    	- width 被平分的宽度    
    	- rowItemNumber 每行的item数量    
    	- dataSource 数据源    
    	- itemTextHeight 文本高度
    	- minImageWidth 图片最小宽度
    	- textStyle 文本样式
        - cornerMarkContainerStyle 角标容器包装样式
        - cornerMarkStyle 角标(位置)样式
        - cornerMarkViewStyle 角标视图样式
        - cornerMarkTextStyle 角标文本样式

	- 界面示例：
	
		```

		<FlowLayoutItemView
            style={{ marginTop: 10 }}
            // width={200}
            textStyle={{
                color: GlobalSize.colorBlackText, //标题黑色
                fontSize: GlobalSize.fontSizeTitle,
            }}
            cornerMarkContainerStyle={{ // 角标容器包装样式
                paddingTop: 5,
            }}
            cornerMarkStyle={{ // 角标(位置)样式
                right: 20,
            }}
            cornerMarkViewStyle={{ // 角标视图样式
                // backgroundColor: 'green',
            }}
            cornerMarkTextStyle={{ // 角标文本样式
                // color: 'yellow',
            }}
            rowItemNumber={4}
            dataSource={listdata}
            onPress={(rowData, sectionID, rowID) => { this.click(rowID) } }
        />

		```


