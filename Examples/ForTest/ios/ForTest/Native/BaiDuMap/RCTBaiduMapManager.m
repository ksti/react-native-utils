//
//  RCTBaiduMapManager.m
//  JulyFirstDemo
//
//  Created by GJ on 16/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTBaiduMapManager.h"


@implementation RCTBaiduMapManager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

- (instancetype)init
{
  self = [super init];
  if (self) {
    
  }
  return self;
}
-(UIView *)view{
  baidumap =[[RCTBaiduMap alloc] init];
  baidumap.delegateRCT = self;
  return baidumap;
}

-(void)mapView:(RCTBaiduMap *)mapView locationDidReverseAddress:(NSString *)address location:(CLLocationCoordinate2D)locationCoordinate{
  if (!mapView.onChange) {
    return;
  }
  mapView.onChange(@{
                     @"address":address,
                     @"location":@{@"latitude":@(locationCoordinate.latitude),
                                   @"longitude":@(locationCoordinate.longitude),
                                   }
                     
                     });
  
}

@end
