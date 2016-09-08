//
//  RCTBaiduMap.h
//  JulyFirstDemo
//
//  Created by GJ on 16/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <BaiduMapAPI_Map/BMKMapComponent.h>
#import <BaiduMapAPI_Location/BMKLocationService.h>

#import "RCTComponent.h"

@class RCTBaiduMap;
@protocol RCTBaiduMapAddressDelegate <NSObject>

-(void)mapView:(RCTBaiduMap *)mapView locationDidReverseAddress:(NSString *)address location:(CLLocationCoordinate2D)locationCoordinate;

@end
@interface RCTBaiduMap : UIView<BMKMapViewDelegate,BMKLocationServiceDelegate>

@property (nonatomic,weak) id <RCTBaiduMapAddressDelegate> delegateRCT;

@property (nonatomic,strong) BMKMapView *mapView;
@property (nonatomic,assign) BOOL invalidTimer; //是否关闭计时器
@property (nonatomic,copy) RCTBubblingEventBlock onChange;

@end
