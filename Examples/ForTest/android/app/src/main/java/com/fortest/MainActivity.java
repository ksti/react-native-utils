package com.fortest;

import android.os.Bundle; 
import android.content.Intent;
import android.content.res.Configuration;
import com.baidu.mapapi.SDKInitializer;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactActivity;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.rnfs.RNFSPackage;
import com.fortest.baidulocationkit.BaiduLocationReactPackage;
import com.fortest.baidumapkit.BaiduMapReactPackage; 
import com.facebook.react.shell.MainReactPackage;
import com.github.yamill.orientation.OrientationPackage;
import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity  implements DefaultHardwareBackBtnHandler {
    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //初始化百度地图
        SDKInitializer.initialize(getApplicationContext());

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new ImagePickerPackage()) 
                .addPackage(new PickerPackage(this))
                .addPackage(new RCTCameraPackage())
                .addPackage(new OrientationPackage(this))
                .addPackage(new BaiduMapReactPackage(this)) // <-- Register package here
                .addPackage(new BaiduLocationReactPackage())
                .addPackage(new SQLitePluginPackage())
                .addPackage(new RNFSPackage())
                .setUseDeveloperSupport(true)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "ForTest", null);
        setContentView(mReactRootView);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ForTest";
    }  
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
