export default function mobile(width, height) {

    var panel =  height / 3 ; //(width > height) ? height / 3 : width / 3 ;

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
        "tooltip": "People in the Nauru regional processing facility, and living in the Nauruan community"
    },{
        "label" : "Manus",
        "x" : width - unit,
        "y" : 20,
        "tooltip": "People in the Manus regional processing facility, and living in the PNG community"
    },{
        "label" : "Dead",
        "x" : unit,
        "y" : panel + 25,
        "tooltip": "People who have died while in detention or living in the Nauruan or PNG community or in community detention in Australia"
    },{
        "label" : "Australia",
        "x" : width - unit,
        "y" : panel + 25,
        "tooltip": "People in Australia in community detention and on bridging visas"
    },{
        "label" : "Resettled",
        "x" : unit,
        "y" : panel * 2 + 25,
        "tooltip": "People permanently settled in another country other than their home country, Australia, Nauru or PNG"
    },{
        "label" : "Returned",
        "x" : width - unit,
        "y" : panel * 2 + 25,
        "tooltip": "People who have returned to their home country, either voluntarily or by force"
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