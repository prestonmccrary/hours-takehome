import '../styles/globals.scss'
import { ToastProvider } from 'react-toast-notifications';


function MyApp({ Component, pageProps }) {
  return <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-center"  > 
      <Component {...pageProps} />
  </ToastProvider> 
}

export default MyApp
