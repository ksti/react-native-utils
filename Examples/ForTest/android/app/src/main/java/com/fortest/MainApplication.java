package com.fortest;

import android.app.Application;
import android.app.Service;
import android.os.Vibrator;
import com.baidu.mapapi.SDKInitializer;
import com.baidu.mapapi.map.MapView;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.shell.MainReactPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.rnfs.RNFSPackage;
import com.fortest.baidulocationkit.LocationService;
import org.pgsqlite.SQLitePluginPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.imagepicker.ImagePickerPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  public static LocationService locationService;
  public Vibrator mVibrator;
  public static MapView mapview;

  @Override
  public void onCreate() {
    super.onCreate();

    /***
     * 初始化定位sdk，建议在Application中创建
     */
    locationService = new LocationService(getApplicationContext());
    mVibrator =(Vibrator)getApplicationContext().getSystemService(Service.VIBRATOR_SERVICE);
    SDKInitializer.initialize(getApplicationContext());
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new SQLitePluginPackage(),
              new RCTCameraPackage(),
              new MainReactPackage(),
              new RNFSPackage(),
              new ImagePickerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
