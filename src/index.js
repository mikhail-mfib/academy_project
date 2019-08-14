'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
import 'element-remove';
import 'whatwg-fetch';
elementClosest(window);
require('formdata-polyfill');

import slider from './modules/slider';
import toggleMiniMenu from './modules/toggleMiniMenu';
import popupSupport from './modules/popupSupport';
import popupOffer from './modules/popupOffer';
import calc from './modules/calc';
import carousel from './modules/carousel';
import reviewSlider from './modules/reviewSlider';
import spoiler from './modules/spoiler';
import readNews from './modules/readNews';
import sendForm from './modules/sendForm';

//слайдер экранов
slider();
//отображение/скрытие мини меню
toggleMiniMenu();
//popup support
popupSupport();
//popup offer
popupOffer();
//калькулятор
calc();
//слайдер-карусель
carousel();
//слайдер отзывов
reviewSlider();
//аккордеон
spoiler();
//скрытие лишнего текста
readNews();
//проверка полей и отправка форм
sendForm();