import desktop from './desktop'
import mobile from './mobile'

export default function getUnits(dims) {
    
    var width = dims[0]

    var height = dims[1]

    var isMobile = ( window.innerWidth < 740 ) ? true : false ;

    var units = (isMobile) ? mobile(width, height) : desktop(width, height) ;

    return units

}