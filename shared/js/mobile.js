export default function mobile(width, height) {

    var panel = height / 3

    var unit = panel / 2

    var third = unit / 3

    var horizantal = width / 4

    var horizantal_unit = horizantal / 2

    var xCenter = [ horizantal / 2, 
                    horizantal / 2 + horizantal,
                    horizantal / 2 + ( horizantal * 2), 
                    horizantal / 2 + ( horizantal * 3), 
                    unit, 
                    width - unit, 
                    unit, 
                    width - unit ]

    var yCenter = [ unit, 
                    unit, 
                    unit, 
                    unit, 
                    unit + panel,  
                    unit + panel, 
                    unit + ( panel * 2 ), 
                    unit + ( panel * 2 ) ]

    var xLabel =  [ (horizantal / 2), 
                    (horizantal / 2) + horizantal,
                    (horizantal / 2) + ( horizantal * 2 ), 
                    (horizantal / 2) + ( horizantal * 3 ), 
                    unit, 
                    width - unit, 
                    unit, 
                    width - unit ]

    var yLabel = [  panel - 5, 
                    panel - 5, 
                    panel - 5, 
                    panel - 5, 
                    panel * 2,  
                    panel * 2, 
                    panel * 3 - 5, 
                    panel * 3 - 5 ]

    var labels = [{
        "label" : "Nauru",
        "x" : unit,
        "y" : 20,
        "orientation" : "middle"
    },{
        "label" : "Manus",
        "x" : width - unit,
        "y" : 20,
        "orientation" : "middle"
    },{
        "label" : "Dead",
        "x" : unit,
        "y" : panel + 25,
        "orientation" : "middle"
    },{
        "label" : "Australia",
        "x" : width - unit,
        "y" : panel + 25,
        "orientation" : "middle"
    },{
        "label" : "Resettled",
        "x" : unit,
        "y" : panel * 2 + 25,
        "orientation" : "middle"
    },{
        "label" : "Returned",
        "x" : width - unit,
        "y" : panel * 2 + 25,
        "orientation" : "middle"
    }]

    var units = {
        width : width,
        height : height,
        xCenter : xCenter,
        yCenter : yCenter,
        xLabel : xLabel,
        yLabel : yLabel,
        labels : labels,
        isMobile : true,
        unit : unit
    }

    return units

}