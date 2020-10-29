import mainHTML from "./atoms/default/server/templates/main.html!text"
import rp from 'request-promise'
import { writeFileSync } from 'fs'


export async function render() {

    const data = await rp('https://interactive.guim.co.uk/docsdata-test/19H3X81cmWbuGqboi4E6T3XJ3Yi1wTRwjeLtRBqPWO1I.json')
    const json = await JSON.parse(data)

    var dataset = json.sheets.data

    for (const datapoint of dataset) {

    	datapoint.keyDay = (datapoint.event_text!="") ? "TRUE" : "" ;

    }

    writeFileSync('shared/js/test.json', JSON.stringify(dataset))

    return mainHTML;

}
