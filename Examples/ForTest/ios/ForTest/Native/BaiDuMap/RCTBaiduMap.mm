//
//  RCTBaiduMap.m
//  JulyFirstDemo
//
//  Created by GJ on 16/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTBaiduMap.h"

#import <BaiduMapAPI_Search/BMKGeocodeSearch.h>
#import <BaiduMapAPI_Map/BMKAnnotation.h>

@interface RCTBaiduMap()<BMKGeoCodeSearchDelegate>

@end

@implementation RCTBaiduMap
{
  BMKLocationService *_locationService;
  NSTimer *timer;
  BMKPointAnnotation *_annotation;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    self.backgroundColor = [UIColor blueColor];
    _mapView =[[BMKMapView alloc] init];
    _mapView.delegate = self;
    [_mapView setBackgroundColor:[UIColor yellowColor]];
    [self addSubview:_mapView];
    
    [self setMapCenterCoordinate];
  }
  return self;
}
-(void)layoutSubviews{
  [super layoutSubviews];
  if (!CGRectEqualToRect(self.frame, _mapView.frame)) {
    _mapView.frame = self.frame;
  }
}

-(void)setMapCenterCoordinate{
  _locationService = [[BMKLocationService alloc] init];
  _locationService.delegate = self;
  [_locationService startUserLocationService];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(mapViewWillDisappear:) name:@"mapViewWillDisappear" object:nil];
}
//开启定位
-(void)startLocation{
  NSLog(@"重新定位");
  [_locationService startUserLocationService];
}
//关闭定时器
-(void)mapViewWillDisappear:(NSNotification *)notification{
  NSLog(@"notification.useInfo:%@",notification.userInfo);
  
  if ([notification.userInfo[@"shouldInvalid"] boolValue]) {
    [timer invalidate];
    _locationService.delegate = nil;
    _mapView.delegate = nil;
  }else{
    [timer fire];
    _locationService.delegate = self;
    _mapView.delegate = self;
  }
}
#pragma mark - locationService 
-(void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation{
  
  [_mapView setCenterCoordinate:userLocation.location.coordinate];
  [_mapView setZoomLevel:15];
  
  CLLocationCoordinate2D pt = userLocation.location.coordinate;
  
  BMKGeoCodeSearch *codeSearch = [[BMKGeoCodeSearch alloc] init];
  codeSearch.delegate = self;
  BMKReverseGeoCodeOption *reverseGEO = [[BMKReverseGeoCodeOption alloc] init];
  reverseGEO.reverseGeoPoint = pt;
  BOOL flag = [codeSearch reverseGeoCode:reverseGEO];
  if (flag) {
    NSLog(@"反geo检索发送成功");
    [_locationService stopUserLocationService];
  }else{
    NSLog(@"反geo检索发送失败");
  }
}

#pragma mark - ReverseGEOSearch delegate
-(void)onGetReverseGeoCodeResult:(BMKGeoCodeSearch *)searcher result:(BMKReverseGeoCodeResult *)result errorCode:(BMKSearchErrorCode)error{
  if (error==0) {
    NSLog(@"reverse GEO result：%@",result.address);
    
    [_mapView removeAnnotations:_mapView.annotations];
    if (!_annotation) {
      BMKPointAnnotation *annotation = [[BMKPointAnnotation alloc] init];
      _annotation = annotation;
    }
    _annotation.title = result.address;
    _annotation.coordinate = result.location;
    [_mapView addAnnotation:_annotation];
    
    [_locationService stopUserLocationService];
    if (!timer) {
      timer= [NSTimer scheduledTimerWithTimeInterval:5 target:self selector:@selector(startLocation) userInfo:nil repeats:YES];
    }
    
    if ([_delegateRCT respondsToSelector:@selector(mapView:locationDidReverseAddress:location:)]) {
      [_delegateRCT mapView:self locationDidReverseAddress:result.address location:result.location];
    }
    
  }else{
    NSLog(@"reverse GEO error code:%zd",error);
  }
}

-(void)didFailToLocateUserWithError:(NSError *)error{
  NSLog(@"%@",error.localizedDescription);
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
