import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import zhTW from 'antd/lib/locale-provider/zh_TW';
import koKR from 'antd/lib/locale-provider/ko_KR';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/Fruit/Fruit"))
app.model(require("./models/Fruit/FruitForm"))
// 4. Router
app.router(require('./router'));

// 5. Start
const App = app.start();

let locale = null;
if(i18n.language === 'ko') {
	locale = koKR
} else if(i18n.language === 'en') {
	locale = enUS
} else {
	locale = null
}

ReactDOM.render(
	<LocaleProvider locale={ locale }>
		<I18nextProvider i18n={ i18n }>
			<App />
		</I18nextProvider>
	</LocaleProvider>
	, document.getElementById('root'));