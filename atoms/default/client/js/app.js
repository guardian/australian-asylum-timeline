// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import settings from 'shared/js/settings.json'
import * as d3 from 'd3'
import ScrollyTeller from "shared/js/scrollyteller"
import { numberWithCommas, $$, getDimensions } from 'shared/js/util.js'
import pointsWithFeature from 'shared/js/data.json'
import getUnits from 'shared/js/getUnits'
import Canvasizer from "shared/js/canvasizer"

const scrollText = d3.select(".scroll-text")

const dimensions = getDimensions(document.querySelector("#canvas-container"))

const units = getUnits(dimensions)

const viz = new Canvasizer(units, settings)

pointsWithFeature
.concat([{}, {}, {}])
.forEach((d, i) => {
    if (i <= pointsWithFeature.length -1) {
    const div = scrollText
    .append('div')
    .attr('class', d.keyDay === "TRUE" ? 'scroll-text__inner' : 'scroll-text__inner scroll-text__inner--half')

    if (d.keyDay === "TRUE") {
      div.html(
        `<div class="scroll-text__div div-key">
          <div class='date-bullet ${i === 0 ? 'date-bullet--full' : ''}'>&nbsp;</div>
          <h2 class='h3-key-date'><span>${d.date}</span></h2>
          <p>${d.event_text}</p>
        </div>`
      )
    } else {
      div.html(
        `<div class="scroll-text__div">
          <div class='date-bullet date-bullet--small'>&nbsp;</div>
        </div>`
      )
    }
  } else {
      scrollText
        .append('div')
        .attr('class', 'scroll-text__inner inner-spacer')
  }
})

const scrolly = new ScrollyTeller({
  parent: document.querySelector("#scrolly-1"),
  triggerTop: 0.4, // percentage from the top of the screen that the trigger should fire
  triggerTopMobile: 0.8,
  triggerTopTablet: 0.8,
  transparentUntilActive: false,
  bigBoxHeight: 35,
  smallBoxHeight: 10
});

const bullets = $$('.date-bullet')

pointsWithFeature
.concat([{}, {}, {}])
.forEach((d, i) => scrolly.addTrigger({ num: i, do: () => {

  if (i < pointsWithFeature.length) {

    bullets.forEach((b, j) => j <= i ? b.classList.add('date-bullet--full') : b.classList.remove('date-bullet--full'))

    viz.update(d)

  }
  
}}))

scrolly.watchScroll()

window.addEventListener("resize", function() {

    clearTimeout(document.body.data)

    document.body.data = setTimeout( function() { 

      // Add resizer stuff

      const dimensions = getDimensions(document.querySelector("#canvas-container"))

      const units = getUnits(dimensions)

      viz.resize(units, settings)


    }, 200);

});

