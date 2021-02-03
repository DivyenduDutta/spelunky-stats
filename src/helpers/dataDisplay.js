//Contains various helper methods used by D3 code

export const formatStateForD3 = (causesOfDeaths) => {
    let formattedState = [];
    let causes = [];
    let deathCounts = [];
    let colors = [];
    for(let deathKey in causesOfDeaths){
        formattedState.push({
            "cause" : causesOfDeaths[deathKey].cause, 
            "deathCount" : causesOfDeaths[deathKey].deathCount,
            "color" : causesOfDeaths[deathKey].color
        });
        causes.push(causesOfDeaths[deathKey].cause);
        deathCounts.push(causesOfDeaths[deathKey].deathCount);
        colors.push(causesOfDeaths[deathKey].color);
    }

    return {
        formattedState,
        causes,
        deathCounts,
        colors
    };
}