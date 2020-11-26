export default function desktop(width, height) {

    var panel = height / 3

    var horizantal = width / 3

    var unit = panel / 2

    var third = unit / 3

    var horizantal_unit = horizantal / 2

    var xCenter = [ horizantal_unit, 
                    horizantal_unit + ( third * 3 ),
                    horizantal_unit + ( horizantal * 2 ) - ( third * 4 ), 
                    horizantal_unit + ( horizantal * 2 ) - ( third ), 
                    horizantal_unit, 
                    horizantal_unit, 
                    horizantal_unit + horizantal, 
                    horizantal_unit + ( horizantal * 2 ) ]

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
                    horizantal_unit * 5, 
                    0, 
                    0, 
                    horizantal_unit * 2, 
                    horizantal_unit * 4 ]

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
        "x" : 0,
        "y" : 20,
        "orientation" : "start"
    },{
        "label" : "Manus",
        "x" : width / 2,
        "y" : 20,
        "orientation" : "start"
    },{
        "label" : "Dead",
        "x" : 0,
        "y" : panel + 30,
        "orientation" : "start"
    },{
        "label" : "Australia",
        "x" : 0,
        "y" : panel * 2 + 40,
        "orientation" : "start"
    },{
        "label" : "Resettled",
        "x" : horizantal_unit * 2,
        "y" : panel * 2 + 40,
        "orientation" : "start"
    },{
        "label" : "Returned",
        "x" : horizantal_unit * 4,
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
        isMobile : false
    }

    return units

}