import Vue from 'vue';

// 商品详情 - 描述信息
import { Cell, CellGroup, Tag } from 'vant';
Vue.use(Cell)
   .use(CellGroup)
   .use(Tag);

import { Tab, Tabs } from 'vant';
Vue.use(Tab)
   .use(Tabs);

import { Col, Row } from 'vant';
Vue.use(Col)
   .use(Row);

import { Button } from 'vant';
Vue.use(Button);

import { Stepper } from 'vant';
Vue.use(Stepper);

import { Card } from 'vant';
Vue.use(Card);

import { Divider } from 'vant';
Vue.use(Divider);

import { Empty } from 'vant';
Vue.use(Empty);

import { Rate } from 'vant';
Vue.use(Rate);

import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox)
   .use(CheckboxGroup);
   
import { NavBar } from 'vant';
Vue.use(NavBar);

import { Grid, GridItem } from 'vant';
Vue.use(Grid)
   .use(GridItem);
   
import { Switch } from 'vant';
Vue.use(Switch);

import { Field } from 'vant';
Vue.use(Field);

import { Form } from 'vant';
Vue.use(Form);

// 商品详情 - 底部按钮
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
Vue.use(GoodsAction)
   .use(GoodsActionButton)
   .use(GoodsActionIcon);
   
// 商品详情 - 商品规格
import { Sku } from 'vant';
Vue.use(Sku);