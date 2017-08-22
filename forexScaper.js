#!/usr/bin/env nodejs

const openPuppet = require('./puppetHelper');

async function getImpact(puppet){
	await puppet.page.waitForSelector('table.calendar__table');
	let $ = (await puppet.updateDom()).dom.$;

	let $elements = $('table.calendar__table .calendar__impact--high');

	let out = [];
	for(let element of $elements){
		out.push({
			cur: $(element).closest('tr').find('td.currency').text(),
			time: $(element).closest('tr').find('td.time').text(),
			date: $(element).closest('table').find('.newday span.date').text()
		});
	}

	return out;
}

(async() => {

	const puppet = await openPuppet('https://www.forexfactory.com/');

	console.log(await getImpact(puppet));

	puppet.browser.close();

})();
