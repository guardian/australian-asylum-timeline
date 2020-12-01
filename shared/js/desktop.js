export default function desktop(width, height) {

    var panel = (width > height) ? height / 3 : width / 3 ;

    var horizantal = width / 3

    var unit = panel / 2

    var third = unit / 3

    var horizantal_unit = horizantal / 2

    var horizantal = width / 4

    var xCenter = [horizantal / 2, 
                    horizantal / 2 + horizantal,
                    horizantal / 2 + ( horizantal * 2), 
                    horizantal / 2 + ( horizantal * 3), 
                    width / 2, 
                    width / 2 - panel, 
                    width / 2, 
                    width / 2 + panel]

    var yCenter = [ unit, 
                    unit, 
                    unit, 
                    unit, 
                    height / 2,  
                    unit + ( panel * 2 ), 
                    unit + ( panel * 2 ), 
                    unit + ( panel * 2 ) ]

    var xLabel =  [ 0, 
                    width / 2 / 2,
                    width / 2, 
                    horizantal / 2 + ( horizantal * 3), 
                    width / 2, 
                    width / 2 - panel, 
                    width / 2, 
                    width / 2 + panel ]

    var yLabel = [  panel - 20, 
                    panel - 20, 
                    panel - 20, 
                    panel - 20, 
                    panel * 2,  
                    panel * 3 - 20, 
                    panel * 3 - 20, 
                    panel * 3 - 20 ]

    var labels = [{
        "label" : "Nauru",
        "x" : ( width / 2 ) / 2,
        "y" : 30,
        "orientation" : "start"
    },{
        "label" : "Manus",
        "x" : width / 2 + ( unit * 2),
        "y" : 30,
        "orientation" : "start"
    },{
        "label" : "Dead",
        "x" : width / 2,
        "y" : panel + 50,
        "orientation" : "start"
    },{
        "label" : "Australia",
        "x" : width / 2 - panel,
        "y" : panel * 2 + 40,
        "orientation" : "start"
    },{
        "label" : "Resettled",
        "x" : width / 2,
        "y" : panel * 2 + 40,
        "orientation" : "start"
    },{
        "label" : "Returned",
        "x" : width / 2 + panel ,
        "y" : panel * 2 + 40,
        "orientation" : "start"
    }]

    var units = {
        width : width,
        height : height,
        xCenter : xCenter,
        yCenter : yCenter,
        xLabel : xLabel,
        yLabel : yLabel,
        labels : labels,
        isMobile : false,
        unit : unit
    }

    return units

}