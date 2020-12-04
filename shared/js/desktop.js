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
        "offset" : 55,
        "tooltip": "Explainer text"
    },{
        "label" : "Manus",
        "x" : width / 2 + ( unit * 2),
        "y" : 30,
        "offset" : 55,
        "tooltip": "Explainer text"
    },{
        "label" : "Dead",
        "x" : width / 2,
        "y" : panel + 50,
        "offset" : 50,
        "tooltip": "Explainer text"
    },{
        "label" : "Australia",
        "x" : width / 2 - panel,
        "y" : panel * 2 + 40,
        "offset" : 70,
        "tooltip": "Explainer text"
    },{
        "label" : "Resettled",
        "x" : width / 2,
        "y" : panel * 2 + 40,
        "offset" : 75,
        "tooltip": "Explainer text"
    },{
        "label" : "Returned",
        "x" : width / 2 + panel ,
        "y" : panel * 2 + 40,
        "offset" : 75,
        "tooltip": "Explainer text"
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