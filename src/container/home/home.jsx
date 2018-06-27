import React, { Component } from 'react';

import {
	Link
} from 'react-router';

import {
	createStore
} from 'redux';

import {
	connect
} from 'react-redux';

//引入下拉菜单组件
import {Dropmenu} from '../../components/dropdown'

export class HomeUI extends Component {

	render() {

		let dropdownChange = (value, text) => {
			console.log("dropdown onChange : ", value, text)
		}

		return (
			<div className="main-box">
				<div className="layout-row">
	                <section className="section">
	                    <h2 className="section-head">布局</h2>
	                    <h3>栅格化布局12格分</h3>
	                    <div className="row margin align-center">
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                        <div className="col-span1 bg-gray">col-span1</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-span2 bg-gray">col-span2</div>
	                        <div className="col-span10 bg-gray">col-span10</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-span3 bg-gray">col-span3</div>
	                        <div className="col-span9 bg-gray">col-span9</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-span4 bg-gray">col-span4</div>
	                        <div className="col-span8 bg-gray">col-span8</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-span5 bg-gray">col-span5</div>
	                        <div className="col-span7 bg-gray">col-span7</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-span4 bg-gray">col-span4</div>
	                        <div className="col-span6 offset-span2 bg-gray">col-span6 offset-span2</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-span8 offset-span4 bg-gray">col-span8 offset-span4</div>
	                    </div>
	                    <div className="row align-center">
	                        <div className="col-span4 bg-gray">col-span4</div>
	                        <div className="col-span4 bg-gray">col-span4</div>
	                        <div className="col-span4 bg-gray">col-span4</div>
	                    </div>
	                    <h3>栅格化布局24格分</h3>
	                    <div className="row margin align-center">
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                        <div title="col-grid" className="col-grid1 bg-gray">1</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-grid1 bg-gray">1</div>
	                        <div className="col-grid2 bg-gray">col-grid2</div>
	                        <div className="col-grid3 bg-gray">col-grid3</div>
	                        <div className="col-grid18 bg-gray">col-grid18</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-grid4 bg-gray">col-grid4</div>
	                        <div className="col-grid5 bg-gray">col-grid5</div>
	                        <div className="col-grid6 bg-gray">col-grid6</div>
	                        <div className="col-grid5 bg-gray">col-grid5</div>
	                        <div className="col-grid4 bg-gray">col-grid4</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-grid7 bg-gray">col-grid7</div>
	                        <div className="col-grid8 bg-gray">col-grid8</div>
	                        <div className="col-grid9 bg-gray">col-grid9</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-grid8 bg-gray">col-grid10</div>
	                        <div className="col-grid8 offset-grid8 bg-gray">col-grid8 offset-grid8</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-grid16 offset-grid8 bg-gray">col-grid16 offset-grid8</div>
	                    </div>
	                    <div className="row margin align-center">
	                        <div className="col-grid10 bg-gray">col-grid10</div>
	                        <div className="col-grid14 bg-gray">col-grid14</div>
	                    </div>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">标题</h2>
	                    <h1>标题 H1.h1 2.5714em 36px</h1>
	                    <h2>标题 H2.h2 2.1428em 30px</h2>
	                    <h3>标题 H3.h3 1.7142em 24px</h3>
	                    <h4>标题 H4.h4 1.2857em 18px</h4>
	                    <h5>标题 H5.h5 1.0000em 14px</h5>
	                    <h6>标题 H6.h6 0.8571em 12px</h6>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">文本内容</h2>
	                    <p>不要为明天忧虑，天上的飞鸟，不耕种也不收获，上天尚且要养活它；田野里的百合花，从不忧虑它能不能开花，是不是可以开得和其它一样美，但是它就自然的开花了，开得比所罗门皇冠上的珍珠还美。你呢，忧虑什么呢？人比飞鸟和百合花贵重多了，上帝会弃你不顾吗？</p>
	                    <ul className="mui">
	                        <li>每当你想评论他人时，要记住，这世上并不是所有人都有你拥有的那些优势</li>
	                        <li>珍惜现在的一切，缅怀过去的所有
	                            <ul className="mui">
	                                <li>生当如夏花，只为绚烂一瞬</li>
	                                <li>存在或不存在，这是问题所在。</li>
	                                <li>人生得意须尽欢，莫使金樽空对月。</li>
	                            </ul>
	                            <ol className="mui">
	                                <li>你将余生写一首长诗，却不能提及一个与她有关的字</li>
	                                <li>我们已经很难遇到喜欢的人，何必为难自己不去买喜欢的东西</li>
	                            </ol>
	                            <dl className="mui">
	                                <dt>将进酒-李白</dt>
	                                <dd>君不见，黄河之水天上来，奔流到海不复回。</dd>
	                                <dd>君不见，高堂明镜悲白发，朝如青丝暮成雪。</dd>
	                            </dl>
	                        </li>
	                    </ul>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">内联文本元素</h2>
	                    <p>使用<code>&lt;b&gt;</code><b>定义粗体文本。</b></p>
	                    <p>使用<code>&lt;i&gt;</code><i>定义斜体文本。</i></p>
	                    <p>使用<code>&lt;u&gt;</code><u>定义带有下划线的文本。</u></p>
	                    <p>使用<code>&lt;del&gt;</code><del>定义带有删除线的文本。</del></p>
	                    <p>使用<code>&lt;abbr&gt;</code><abbr>定义缩写文本。</abbr></p>
	                    <p>使用<code>&lt;q&gt;</code>定义<q>引用</q>的文本。</p>
	                    <p>使用<code>&lt;code&gt;</code>定义代码文本。<code name="code" className="js">alert('hello world!');</code></p>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">按钮</h2>
	                    <h3>Basic</h3>
	                    <div className="row spaced">
	                        <button className="button basic lightgray">lightgray</button>
	                        <button className="button basic gray">gray</button>
	                        <button className="button basic dark">dark</button>
	                        <button className="button basic red">red</button>
	                        <button className="button basic orange">orange</button>
	                        <button className="button basic yellow">yellow</button>
	                        <button className="button basic olive">olive</button>
	                        <button className="button basic green">green</button>
	                        <button className="button basic teal">teal</button>
	                        <button className="button basic blue">blue</button>
	                        <input type="button" className="button basic violet" value="violet" />
	                        <span className="button basic purple">purple</span>
	                        <a className="button basic pink">pink</a>
	                        <button className="button basic brown">brown</button>
	                    </div>
	                    <h3>Colored</h3>
	                    <div className="row spaced">
	                        <button className="button lightgray">lightgray</button>
	                        <button className="button gray">gray</button>
	                        <button className="button dark">dark</button>
	                        <button className="button red">red</button>
	                        <button className="button orange">orange</button>
	                        <button className="button yellow">yellow</button>
	                        <button className="button olive">olive</button>
	                        <button className="button green">green</button>
	                        <button className="button teal">teal</button>
	                        <button className="button blue">blue</button>
	                        <input type="button" className="button violet" defaultValue="violet" />
	                        <span className="button purple">purple</span>
	                        <a className="button pink">pink</a>
	                        <button className="button brown">brown</button>
	                    </div>
	                    <h3>Size</h3>
	                    <div className="row spaced">
	                        <button className="button red mini">Mini</button>
	                        <button className="button orange tiny">Tiny</button>
	                        <button className="button yellow small">Small</button>
	                        <button className="button olive">Medium</button>
	                        <button className="button green large">Large</button>
	                        <button className="button blue big">Big</button>
	                        <button className="button teal huge">Huge</button>
	                        <button className="button pink massive">Massive</button>
	                    </div>
	                    <div className="row spaced">
	                        <button className="button label red mini"><i className="icon-check"></i>Mini</button>
	                        <button className="button label orange tiny"><i className="icon-check"></i>Tiny</button>
	                        <button className="button label yellow small"><i className="icon-check"></i>Small</button>
	                        <button className="button label olive"><i className="icon-check"></i>Medium</button>
	                        <button className="button label green large"><i className="icon-check"></i>Large</button>
	                        <button className="button label blue big"><i className="icon-check"></i>Big</button>
	                        <button className="button label teal huge"><i className="icon-check"></i>Huge</button>
	                        <button className="button label pink massive"><i className="icon-check"></i>Massive</button>
	                    </div>
	                    <h3>Disabled & Loading</h3>
	                    <div className="row spaced">
	                        <button className="button green disabled">Button disabled</button>
	                        <button className="button teal loading">Loading...</button>
	                    </div>
	                    <h3>circular</h3>
	                    <div className="row spaced">
	                        <button className="button circular teal"><i className="icon-doc"></i></button>
	                        <button className="button circular green"><i className="icon-check"></i></button>
	                        <button className="button circular red"><i className="icon-trash"></i></button>
	                    </div>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">表单元素</h2>
	                    <h3>radio</h3>
	                    <div className="row margin">
	                        <div className="col-span8">
	                            <div className="col-span2"><input name="radios" defaultValue="1" type="radio" /> one</div>
	                            <label className="col-span2"><input name="radios" defaultValue="2" type="radio" /> two</label>
	                            <label className="col-span2"><input name="radios" defaultValue="3" type="radio" /> three</label>
	                            <label className="col-span2"><input disabled="disabled" defaultValue="4" name="radios" type="radio" /> four</label>
	                            <label className="col-span2"><input disabled="disabled" checked="checked" defaultValue="5" type="radio" /> five</label>
	                        </div>
	                    </div>
	                    <h3>checkbox</h3>
	                    <div className="row margin">
	                        <div className="col-span8">
	                            <label className="col-span2"><input name="checkboxs" type="checkbox" /> one</label>
	                            <label className="col-span2"><input name="checkboxs" type="checkbox" /> two</label>
	                            <label className="col-span2"><input name="checkboxs" type="checkbox" /> three</label>
	                            <label className="col-span2"><input disabled="disabled" name="checkboxs" type="checkbox" /> three</label>
	                            <label className="col-span2"><input disabled="disabled" checked="checked" name="checkboxs" type="checkbox" /> three</label>
	                        </div>
	                    </div>
	                    <h3>switch</h3>
	                    <div className="row margin">
	                        <div className="col-span8">
	                            <div className="col-span2"><input name="switch" className="switchbox" defaultValue="1" type="checkbox" /></div>
	                        </div>
	                    </div>
	                    <h3>Input Text</h3>
	                    <div className="row margin">
	                        <input className="inline-span2" type="text" defaultValue="default" /><input className="inline-span2 green" type="text" defaultValue="green" /><input className="inline-span2 yellow" type="text" defaultValue="yellow" /><input className="inline-span2 red" type="text" defaultValue="red" />
	                    </div>
	                    <div className="row margin">
	                        <label className="input-prepend inline-span4">
	                            <input type="text" placeholder="" />
	                            <span className="add-on"><i className="icon-magnifier"></i></span>
	                        </label><label className="input-append inline-span4">
								<input type="text" placeholder="" />
	                            <span className="add-on"><i className="icon-plus"></i></span>
	                        </label>
	                    </div>
	                    <div className="row margin">
	                        <label className="input-prepend labled inline-span6">
	                            <span className="add-on"><i className="icon-magnifier"></i></span>
	                            <input type="text" className="teal" placeholder="Search..." />
	                        </label>
							<span className="button teal">Search</span>
	                    </div>
						<div className="row margin">
	                        <textarea className="textarea inline-span8" name="textarea" defaultValue='文本'></textarea>
	                    </div>
	                </section>
					<section className="section">
	                    <h2 className="section-head">菜单</h2>
	                    <div className="row">
							<div className="col-span3">
								<ul className="menu">
									<li><a href=""><i className="icon-user"></i>My Profile</a></li>
									<li><a href=""><i className="icon-calendar"></i>My Calendar</a></li>
									<li><a href=""><i className="icon-envelope-open"></i>My Inbox<span className="badge bg-red">3</span></a></li>
									<li><a href=""><i className="icon-rocket"></i>My Tasks<span className="badge bg-teal">7</span></a></li>
									<li className="divider"> </li>
									<li><a href=""><i className="icon-lock"></i>Lock Screen</a></li>
									<li><a href=""><i className="icon-key"></i>Log Out</a></li>
								</ul>
							</div>
							<div className="col-span3">
								<ul className="menu white">
									<li><a href=""><i className="icon-user"></i>My Profile</a></li>
									<li><a href=""><i className="icon-calendar"></i>My Calendar</a></li>
									<li><a href=""><i className="icon-envelope-open"></i>My Inbox<span className="badge bg-red">3</span></a></li>
									<li><a href=""><i className="icon-rocket"></i>My Tasks<span className="badge bg-teal">7</span></a></li>
									<li className="divider"> </li>
									<li><a href=""><i className="icon-lock"></i>Lock Screen</a></li>
									<li><a href=""><i className="icon-key"></i>Log Out</a></li>
								</ul>
							</div>
							<div className="col-span3">
								<br />
								<ul className="menu drop">
									<li><a href=""><i className="icon-user"></i>My Profile</a></li>
									<li><a href=""><i className="icon-calendar"></i>My Calendar</a></li>
								</ul>
								<br />
								<ul className="menu white drop">
									<li><a href=""><i className="icon-user"></i>My Profile</a></li>
									<li><a href=""><i className="icon-calendar"></i>My Calendar</a></li>
								</ul>
							</div>
						</div>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">下拉选项</h2>
	                    <h3>Dropdown1</h3>
						<div className="row">
							<Dropmenu name="phone" value="iphone" text="iphone" onChange={dropdownChange}>
								<ul className="menu white">
									<li data-value="iphone"><a>iphone</a></li>
									<li data-value="ipad"><a>ipad</a></li>
									<li data-value="Macbook Pro"><a>Macbook Pro</a></li>
									<li data-value="windows phone"><a>windows phone</a></li>
								</ul>
							</Dropmenu>
						</div>
	                </section>
	                <section className="section">
	                    <h2 className="section-head">Message</h2>
	                    <h3>radio</h3>
	                </section>
	            </div>
			</div>
		)
	}

}

export const Home = connect(
	(state) => {
		return state.common
	},
	(dispatch, ownProps) => {
		return {
			submit: (o) => {
				//dispatch(loginFetch({email, password},'/common'))
			}
		};
	}
)(HomeUI)
