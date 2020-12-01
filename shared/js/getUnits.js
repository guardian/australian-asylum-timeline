import desktop from './desktop'
import mobile from './mobile'

export default function getUnits(dims) {
    
    var width = dims[0]

    var height = dims[1]

    console.log(width, height, document.body.clientWidth  )

    var isMobile = ( document.body.clientWidth < 740 ) ? true : false ; //window.innerWidth

    var units = (isMobile) ? mobile(width, height) : desktop(width, height) ;

    return units

}