import colors from '../foundations/colours';

export const buoySensorTags: deviceSensorTagsType = {
    "do": {
        "color": colors.tag.dissolvedO2,
        "label": "Oxygen"
    },
    "ph": {
        "color": colors.tag.pH,
        "label": "pH"
    },
    "cond": {
        "color": colors.tag.electricalConductivity,
        "label": "Conductivity"
    },
    "tbd": {
        "color": colors.tag.turbidity,
        "label": "Turbidity"
    },
    "tds": {
        "color": colors.tag.disolvedSolids,
        "label": "Dissolved Solids"
    },
    "tmp": {
        "color": colors.tag.temp,
        "label": "Temperature"
    },
    "lvl": {
        "color": colors.tag.waterLvl,
        "label": "Water Lvl"
    },
    "flw": {
        "color": colors.tag.waterFlow,
        "label": "Water Flow"
    },
    "water pressure": {
        "color": colors.tag.waterPressure,
        "label": "Water Pressure"
    },
    "ch4" : {
        "color": colors.tag.ch4,
        "label": "ch4"
    },
    "co2" : {
        "color": colors.tag.co2,
        "label": "co2"
    }
};