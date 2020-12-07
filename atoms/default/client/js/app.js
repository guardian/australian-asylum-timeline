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

var current = 0

pointsWithFeature
.concat([{}, {}, {}])
.forEach((d, i) => {
    if (i <= pointsWithFeature.length) {
    const div = scrollText
    .append('div')
    .attr('class', () => {

      if (d.keyDay === "TRUE") {

        return (d.profile != "") ? 'scroll-text__inner scroll-text__profile' : 'scroll-text__inner' ;

      } else {

        return 'scroll-text__inner scroll-text__inner--half'

      }

    })

    var profile = (d.profile!="") ?  `<br/><a href="${d.read_more}" class="asylum-timeline__component-button">
            <span>Read ${d.profile} story</span>
            <svg class="asylum-timeline__icon" width="24" height="22" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.0046H19.6395L11.9377 21.0205L12.939 22L23.6444 11.5023V10.4977L12.939 0L11.9377 0.979452L19.6395 9.99543H0V12.0046Z"></path>
            </svg>
        </a>` : "" ;

    if (d.keyDay === "TRUE") {

      let html = (d.profile!="") ? `<div data-index="${i}" class="scroll-text__div div-key" style="background-image: url(<%= path %>/${d.profile_pic})">"` : `<div data-index="${i}" class="scroll-text__div div-key">`
          
      html += `<div class='date-bullet ${i === 0 ? 'date-bullet--full' : ''}'>&nbsp;</div>
          <h2 class='h3-key-date'><span>${d.date}</span></h2>
          <p>${d.event_text}${profile}</p>`

      html += (d.profile!="") ? `<div class="profile-overlay"></div></div>` : `</div>`

      div.html(html)
        
    } else {

      div.html(
        `<div data-index="${i}" class="scroll-text__div">
          <div class='date-bullet date-bullet--small'>&nbsp;</div>
          <div class='date-label-small'>${(d.date!=undefined)?d.date:""}</div>
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

  if (i <= pointsWithFeature.length) {

    bullets.forEach((b, j) => j <= i ? b.classList.add('date-bullet--full') : b.classList.remove('date-bullet--full'))

    if (i!=99) {

      viz.update(d,i)

      current = i

    } else {

      if (current < 150) {

        viz.update(d,i)

        current = i

      }

    }

  }
  
}}))

scrolly.watchScroll()

viz.update(pointsWithFeature[0])


window.addEventListener("resize", function() {

    clearTimeout(document.body.data)

    document.body.data = setTimeout( function() { 

      // Add resizer stuff

      const dimensions = getDimensions(document.querySelector("#canvas-container"))

      const units = getUnits(dimensions)

      viz.resize(units, settings)


    }, 200);

});

