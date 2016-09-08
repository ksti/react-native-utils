package com.fortest.baidumapkit;

import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.model.LatLng;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.fortest.MainApplication;

/**
 * Created by Administrator on 2016/7/26.
 */
public class BaiduMapReactModule  extends ReactContextBaseJavaModule {
    private final String moduleName = "RCTBaiduMap";

    public BaiduMapReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return moduleName;
    }

    @ReactMethod
    public void moveToMyLocation( double latitude,double longitude) {
        MapView mapView = MainApplication.mapview;
        LatLng latlng = new LatLng(latitude, longitude);
        MapStatus mMapStatus = new MapStatus.Builder()
                .target(latlng)
                .zoom(18)
                .build();
        //定义MapStatusUpdate对象，以便描述地图状态将要发生的变化
        MapStatusUpdate mMapStatusUpdate = MapStatusUpdateFactory.newMapStatus(mMapStatus);
        //改变地图状态

        if(mapView!=null) {
            mapView.getMap().animateMapStatus(mMapStatusUpdate);
        }
    }
}
