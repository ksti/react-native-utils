package com.fortest.baidulocationkit;

import android.widget.Toast;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.Poi;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.model.LatLng;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.fortest.MainApplication;
import com.fortest.R;

import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Administrator on 2016/7/25.
 */
public class BaiduLocationReactModule extends ReactContextBaseJavaModule {
    private LocationService locationService;

    private int type = 0;

    private String locationInfo = "";
    private Double latitude;
    private Double longitude;

    private boolean isFirstLoc = true; // 是否首次定位

    private WritableMap params = Arguments.createMap();


    /*****
     * @see copy funtion to you project
     * 定位结果回调，重写onReceiveLocation方法
     *
     */
    private BDLocationListener mListener = new BDLocationListener() {

        @Override
        public void onReceiveLocation(BDLocation location) {
            // TODO Auto-generated method stub
            if (null != location && location.getLocType() != BDLocation.TypeServerError) {
                params.putDouble("latitude", location.getLatitude());
                params.putDouble("longitude", location.getLongitude());
                params.putString("address", location.getAddrStr());

                latitude = location.getLatitude();
                longitude = location.getLongitude();
                locationInfo = location.getAddrStr();

                MapView mapView = MainApplication.mapview;
                if (mapView != null) {
                    MyLocationConfiguration.LocationMode mCurrentMode = MyLocationConfiguration.LocationMode.FOLLOWING;
                    BitmapDescriptor mCurrentMarker =  BitmapDescriptorFactory
                            .fromResource(R.drawable.icon_gcoding);;
                    mapView.getMap()
                            .setMyLocationConfigeration(new MyLocationConfiguration(
                                    mCurrentMode, true, mCurrentMarker));;
                    MyLocationData locData = new MyLocationData.Builder()
                            .accuracy(location.getRadius())
                            .latitude(location.getLatitude())
                            .longitude(location.getLongitude()).build();
                    mapView.getMap().setMyLocationData(locData);
                    LatLng ll = new LatLng(location.getLatitude(),
                            location.getLongitude());
                    MapStatus.Builder builder = new MapStatus.Builder();
                    builder.target(ll).zoom(18.0f);
                    mapView.getMap().animateMapStatus(MapStatusUpdateFactory.newMapStatus(builder.build()));
                }
            }
        }
    };

    @ReactMethod
    public void updateLocationInfo(Callback successCallback, Callback errorCallback) {
        /*getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("updateLocation",params);*/
        try {
            successCallback.invoke(locationInfo, latitude, longitude);
        } catch (Exception ex) {
            errorCallback.invoke(ex.getMessage());
        }
    }

    public BaiduLocationReactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();

        // -----------location config ------------
        locationService = MainApplication.locationService;
        //获取locationservice实例，建议应用中只初始化1个location实例，然后使用，可以参考其他示例的activity，都是通过此种方式获取locationservice实例的
        locationService.registerListener(mListener);
        //注册监听
        type = getType();
        if (type == 0) {
            locationService.setLocationOption(locationService.getDefaultLocationClientOption());
        } else if (type == 1) {
            locationService.setLocationOption(locationService.getOption());
        }

        locationService.start();// 定位SDK,start之后会默认发起一次定位请求，开发者无须判断isstart并主动调用request
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @ReactMethod
    public void showLocationInfo() {
        Toast.makeText(getReactApplicationContext(),locationInfo,Toast.LENGTH_SHORT).show();
    }

    @Override
    public String getName() {
        return "BaiduLocation";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    /**
     * 停止获取位置
     */
    @ReactMethod
    public void startLocationService(){
        locationService.start();
    }

    /**
     * 停止获取位置
     */
    @ReactMethod
    public void stopLocationService(){
        locationService.stop();
    }
}
