#!/usr/bin/env nodejs

const puppeteer = require('puppeteer');
const JSDOM = require('jsdom').JSDOM;
const jQuery = require('jquery');

async function getDOM(page) {
	var html = await page.evaluate(()=>{
		return new window.XMLSerializer().serializeToString(document);
	});

	var dom = new JSDOM(html);
	dom.$ = jQuery(dom.window);

	return dom;
}

async function openPuppet(url){
	let browser = await puppeteer.launch({headless: true});
	let page = await browser.newPage();

	await page.goto(url, {waitUntil: 'networkidle'});
	
	return {
		browser: browser,
		page: page,
		dom: await getDOM(page),
		updateDom: async function(page){
			page = page || this.page;
			this.dom = await getDOM(page);
			return this;
		}
	};
}

module.exports = openPuppet;
