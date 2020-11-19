import mainHTML from "./atoms/default/server/templates/main.html!text"
import rp from 'request-promise'
import { writeFileSync } from 'fs'

var categories = [	'manus_detention',
					'manus_community',
					'nauru_detention',
					'nauru_community',
					'returned_voluntary',
					'returned_forced',
					'australia',
					'resettled_third_country',
					'dead' ]

export async function render() {

    const data = await rp('https://interactive.guim.co.uk/docsdata-test/19H3X81cmWbuGqboi4E6T3XJ3Yi1wTRwjeLtRBqPWO1I.json')
    const json = await JSON.parse(data)

    var dataset = json.sheets.data

    //var keyNames = Object.keys(dataset[0]);

	dataset.forEach(function(row, index) {

		for (const category of categories) {

			if (row[category]!="") {

				row[category]= +row[category]

			} else {

				if (index===0) {

					row[category] = 0

				} else {

					row[category] = dataset[index -1][category]

				}

			}
		}

		row.keyDay = (row.event_text!="") ? "TRUE" : "" ;
	})

    writeFileSync('shared/js/data.json', JSON.stringify(dataset))

    return mainHTML;

}
