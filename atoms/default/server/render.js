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
					'dead',
					'manus_detention_kids',
					'manus_community_kids',
					'nauru_detention_kids',
					'nauru_community_kids',
					'australia_kids',
					'resettled_us']

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

		row.returned_combined = row.returned_voluntary + row.returned_forced

		row.s1 = `${row.nauru_detention_kids} kids, ${row.nauru_detention - row.nauru_detention_kids} adults`
		row.s2 = `${row.nauru_community_kids} kids, ${row.nauru_community - row.nauru_community_kids} adults`
		row.s3 = `${row.manus_detention_kids} kids, ${row.manus_detention - row.manus_detention_kids} adults`
		row.s4 = `${row.manus_community_kids} kids, ${row.manus_community - row.manus_community_kids} adults`
		row.s5 = `${row.australia_kids} kids, ${row.australia - row.australia_kids} adults`
		row.s6 = `${row.resettled_us} in the US, ${row.resettled_third_country - row.resettled_us} elsewhere`
		row.s7 = `${row.returned_voluntary} voluntary, ${row.returned_forced} by force`

		row.keyDay = (row.event_text!="") ? "TRUE" : "" ;
	})

    writeFileSync('shared/js/data.json', JSON.stringify(dataset))

    return mainHTML;

}
