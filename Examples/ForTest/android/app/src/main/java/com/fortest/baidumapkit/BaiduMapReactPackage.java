package com.fortest.baidumapkit;

import android.app.Activity;

import com.baidu.mapapi.map.MapView;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class BaiduMapReactPackage implements ReactPackage {
    private Activity mActivity;
    private BaiduMapViewManager mBaiduMapViewManager;
    private BaiduMapReactModule mBaiduMapModule;

    public BaiduMapReactPackage(Activity activity) {
        mActivity = activity;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        mBaiduMapModule = new BaiduMapReactModule(reactContext);
        modules.add(mBaiduMapModule);

        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> managers = new ArrayList<>();
        mBaiduMapViewManager = new BaiduMapViewManager(mActivity);
        managers.add(mBaiduMapViewManager);
        return managers;
    }
}
