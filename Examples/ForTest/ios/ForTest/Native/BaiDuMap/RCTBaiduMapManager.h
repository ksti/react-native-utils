//
//  RCTBaiduMapManager.h
//  JulyFirstDemo
//
//  Created by GJ on 16/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTViewManager.h"

#import <BaiduMapAPI_Map/BMKMapComponent.h>
#import "RCTBridgeModule.h"
#import "RCTBaiduMap.h"

@interface RCTBaiduMapManager : RCTViewManager<BMKMapViewDelegate,RCTBaiduMapAddressDelegate>
{
  RCTBaiduMap *baidumap;
}

@end
