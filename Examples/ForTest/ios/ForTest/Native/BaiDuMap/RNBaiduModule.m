//
//  RCTBaiduModule.m
//  ForTest
//
//  Created by GJ on 16/7/27.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RNBaiduModule.h"

#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation RNBaiduModule

@synthesize bridge=_bridge;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(RNBaiduModuleInvalid:(BOOL)shouldInvalid){
  
  NSLog(@"收到界面即将隐藏的命令");
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"mapViewWillDisappear" object:nil userInfo:@{@"shouldInvalid":@(shouldInvalid)}];
  });
  
}

@end
