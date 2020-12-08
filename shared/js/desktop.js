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
                    unit + panel,  
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
        "tooltip": "People in the Nauru regional processing facility, and living in the Nauruan community"
    },{
        "label" : "Manus & PNG",
        "x" : width / 2 + ( unit * 2),
        "y" : 30,
        "tooltip": "People in the Manus regional processing facility, and living in the PNG community"
    },{
        "label" : "Dead",
        "x" : width / 2,
        "y" : panel + 50,
        "tooltip": "People who have died while in detention or living in the Nauruan or PNG community or in community detention in Australia"
    },{
        "label" : "Australia, temporarily",
        "x" : width / 2 - panel,
        "y" : panel * 2 + 40,
        "tooltip": "People in Australia in community detention and on bridging visas"
    },{
        "label" : "Resettled",
        "x" : width / 2,
        "y" : panel * 2 + 40,
        "tooltip": "People permanently settled in another country other than their home country, Australia, Nauru or PNG"
    },{
        "label" : "Returned",
        "x" : width / 2 + panel ,
        "y" : panel * 2 + 40,
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
        isMobile : false,
        unit : unit
    }

    return units

}