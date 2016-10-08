
import Form from 'react-native-form';
// utils
import httpRequest from './src/utils/httpRequest';
import {storageUtil} from './src/utils/storage'
import FileUtil from './src/utils/FileUtil';
// views
import PageContainer from './src/components/FormView/PageContainer';
import ScrollContainer from './src/components/FormView/ScrollContainer';
import FormView from './src/components/FormView/FormView';
import PopupPage from './src/components/customPopupPage/PopupPage';
import PopupSelecter from './src/components/PopupView/PopupSelecter';
import SeePhotoBrowser from './src/components/PhotoBrowser/SeePhotoBrowser';
import Loading from "./src/components/LoadingView/LoadingDialog";
import FlowLayoutImageView from './src/components/customViews/FlowLayoutImageView';
import HorizonImageScrollView from './src/components/customViews/HorizonImageScrollView';
import RelativeContainer from './src/components/customPopupPage/RelativeContainer';

export {
  httpRequest,
  storageUtil,
  FileUtil,
  Form,
  FormView,
  PageContainer,
  ScrollContainer,
  PopupPage,
  PopupSelecter,
  SeePhotoBrowser,
  Loading,
  FlowLayoutImageView,
  HorizonImageScrollView,
  RelativeContainer
};