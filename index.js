
import Form from 'react-native-form';
// utils
import httpRequest from './src/utils/httpRequest';
import {storageUtil} from './src/utils/storage'
import GlobalStorageUtil from './src/utils/GlobalStorageUtil'
import FileUtil from './src/utils/FileUtil';
// views
import PageContainer from './src/components/FormView/PageContainer';
import ScrollContainer from './src/components/FormView/ScrollContainer';
import FormView from './src/components/FormView/FormView';
import PopupPage from './src/components/customPopupPage/PopupPage';
import PopupSelecter from './src/components/PopupView/PopupSelecter';
import SeePhotoBrowser from './src/components/PhotoBrowser/SeePhotoBrowser';
import Loading from "./src/components/LoadingView/LoadingDialog";
import GJSProgressHUD from "./src/components/LoadingView/GJSProgressHUD";
import FlowLayoutImageView from './src/components/customViews/FlowLayoutImageView';
import FlowLayoutItemView from './src/components/customViews/FlowLayoutItemView';
import HorizonImageScrollView from './src/components/customViews/HorizonImageScrollView';
import RelativeContainer from './src/components/customPopupPage/RelativeContainer';
import ScrollableText from './src/components/customViews/ScrollableText';

export {
  // --- utils
  httpRequest,
  storageUtil,
  FileUtil,
  GlobalStorageUtil,
  // --- components
  Form,
  FormView,
  PageContainer,
  ScrollContainer,
  PopupPage,
  PopupSelecter,
  SeePhotoBrowser,
  Loading,
  FlowLayoutItemView,
  FlowLayoutImageView,
  HorizonImageScrollView,
  RelativeContainer,
  ScrollableText,
};
